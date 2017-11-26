<?php
namespace ApiBundle\Components;

#use Symfony\Component\HttpFoundation\Request;

/*
 * Author:       David Houthoofdt
 * Email:        david@houthoofdt.be
 * Organization: 28 Development
 * Date:         December 28, 2016
 * Description:
 *
 * Copyright:    2016  by David Houthoofdt, 28 Development
 * License:      2016  http://www.gnu.org/copyleft/lesser.html
 *
 */

/**
 * The abstract request class, all request in the api must inherit from this class!
 * This will handle the basic request
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
abstract class Request
{
    /**
     * @var Symfony\Component\HttpFoundation\Request
     */
    protected $request;

    /**
     * @var DataBundle\DataManager
     */
    protected $dm;

    /**
     * @var array
     */
    protected $errors;

    public function __construct(\Symfony\Component\HttpFoundation\Request $request)
    {
        $this->request = $request;
    }

    /**
     * Set the datamanager
     *
     * @param DataBundle\DataManager $dm
     */
    public function setDataManager($dm)
    {
        $this->dm = $dm;
    }

    /**
     * Set an attribute value in the request stack
     *
     * @param string $key   the attribute key
     * @param mixed  $value the value to set
     *
     * @return void
     */
    public function setAttribute($key, $value)
    {
        $this->request->attributes->set($key, $value);
    }

    /**
     * get parameter from the request
     *
     * @param string $key
     */
    public function get($key)
    {
        return $this->request->get($key);
    }

    /**
     * Get value from the server input stack
     *
     * @param string $key
     *
     * @return mixed
     */
    public function server($key)
    {
        return $this->request->server->get($key);
    }

    /**
     * check if the request is valid
     */
    public function isValid(): bool
    {
        //check the data in all request data!
        //route, post and query
        $data = $this->getAllRequestParams();
        $this->validateData($data, $this->getInputFilter(), '');
        return empty($this->errors);
    }
    
    /**
     * Get all request params from the stack
     * 
     * @return array
     */
    public function getAllRequestParams()
    {
        return array_merge(
            $this->request->request->all(),
            $this->request->query->all(),
            $this->request->attributes->all()
        );
    }
    
    /**
     * Get the request params
     * 
     * @return array
     */
    public function getRequestParams()
    {
        return $this->request->request->all();
    }

    /**
     * Loop the input filters
     *
     * @param array  $data    the data to validate
     * @param array  $filters the input filters
     * @param string $parent  the parent parameter tag
     *
     * @return void
     */
    protected function validateData($data, $filters, $parent)
    {
        //loop all filters
        foreach ($filters as $param => $filter) {
            $key = $param;
            //if there is parent add [] in the display key
            //if missing it will read well
            if (!empty($parent)) $key = '[' . $key . ']';
            //check the required flag
            $required = $filter['required'] ?? false;
            //type validation
            $type = $filter['type'] ?? '';
            if (isset($data[$param]) && !empty($data[$param]) && !empty($type) && function_exists('is_' . $type)) {
                $func = 'is_' . $type;
                if (!$func($data[$param])) {
                    $message = ' must be type of ' . $type . ', ' . gettype($data[$param]) . ' given';
                    $this->errors[] = $parent . $key  . ' ' . $message;
                    continue;
                }
            }
            //required and it's empty or not set -> error
            if (($required === true || $this->checkConditionalRequire($required, $data))
                && (!isset($data[$param]) || (empty($data[$param]) && $data[$param] != '0'))
            ) {
                $message = (isset($required['condition']['message'])) ? $required['condition']['message'] : 'is required';
                $this->errors[] = $parent . $key  . ' ' . $message;
            } else if (isset($filter['data']) && isset($data[$param]) && !empty($data[$param])) {
                //data filter is set so it means that it has subdata
                //check if it needs multi or single
                $this->handleMultiOrSingleSubdata($data[$param], $filter, $key);
            } else if (isset($data[$param]) && !empty($errors = $this->getValidationErrors($data[$param], $filter, $data))) {
                //check if the validation is ok
                $this->errors[] = $parent . $key . ' is not valid: ' . join(', ', $errors);
            } else if (isset($filter['default']) && (!isset($data[$param]) || $data[$param] == ''))  {
                $this->request->request->set($parent . $key, $filter['default']);
            }
        }
    }

    /**
     * Check if there is a conditional requirement
     * e.g. value is only required if an other value isset
     *
     * @param array $require
     * @param array $groupData the current grouped data
     */
    public function checkConditionalRequire($require, $groupData)
    {
        if (is_array($require) && isset($require['condition'])) {
            $conidition = $require['condition']['rule'];
            if (class_exists($conidition)) {
                $rule = new $conidition($groupData, $this->request, $this->dm);
                return $rule->conditionIsMet();
            }
        }
        return false;
    }

    /**
     * get the validation errors on the incomming value
     *
     * @param string $value  the current value
     * @param array  $filter the current filter
     * @param array  $stack  the grouped stack values
     *
     * @return array
     */
    private function getValidationErrors($value, $filter, $stack): array
    {
        //no validation = no errors
        if (!isset($filter['validation']))  return [];
        $errors = [];
        //loop the validation rules
        foreach ($filter['validation'] as $validation) {
            $isValid = true;
            if (isset($validation['rule'])) {
                $rule = $validation['rule'];
                //if it's a closure call the function to validat it
                if ($rule instanceof  \Closure) {
                    $isValid = \call_user_func($rule, $value, $this->request);
                } else if (class_exists($rule)) {
                    $rule = new $rule($value, $this->request, $stack);
                    $rule->setSettings($validation);
                    if (isset($validation['calls'])) {
                        foreach ($validation['calls'] as $method => $arguments) {
                            call_user_func_array(array($rule, $method), $arguments);
                        }
                    }
                    $isValid = $rule->isValid();
                }
            } else if (isset($validation['filter'])) {
                $isValid = filter_var($value, $validation['filter']);
            }
            if (!$isValid) $errors[] = sprintf($validation['message'], $value);

        }
        //return the errors (if any)
        return $errors;
    }

    /**
     * Handle the subdata, this will check if the subdata is singlular or multple
     * e.g. products[0][sku] vs user['username']
     *
     * @param array $data   the data to filter
     * @param array $filter the applied filter to the subdata
     * @param string $param the current key parameter of the request
     *
     * @return void
     */
    private function handleMultiOrSingleSubdata($data, $filter, $param)
    {
        //filter is multiple -> loop multiple data
        if (isset($filter['multiple'] ) && $filter['multiple'] == true) {
            foreach ($data as $k => $v) {
                $this->validateData($v, $filter['data'], $param . '[' . $k . ']');
            }
        } else {
            $this->validateData($data, $filter['data'], $param);
        }
    }

    /**
     * Get the errors
     *
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * All request must implement the input filter!
     */
    protected abstract function getInputFilter();
}
