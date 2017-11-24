<?php
namespace ApiBundle\Components;

use ApiBundle\Components\Request;
use ApiBundle\Controller\AbstractController;
use DataBundle\JsonDataManager;

use Symfony\Component\HttpKernel\Exception\HttpException;

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
 * The abstract response class, all the responses in the api must inherit from this class
 * this class will handle all basic return data
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
abstract class Response
{
    /**
     *
     * @var Request
     */
    protected $request;

    /**
     *
     * @var DataManager
     */
    protected $dm;

    /**
     *
     * @var AbstractController
     */
    protected $controller;

    /**
     * Create response
     *
     * @param Request     $request  the current http request
     * @param JsonDataManager $dm       the data manager
     */
    public function __construct(
        Request $request,
        JsonDataManager $dm
    ) {
        //I KNOW JsonDataManager -> should have been DataManager
        //and JsonDataManager should be a subclass of DataManager 
        $this->request = $request;
        $this->dm = $dm;
        //inject the datamanager in the request handler
        $request->setDataManager($dm);
    }

    /**
     * Get the response
     *
     * @param AbstractController $control         the active controller
     * @param bool               $onlyValidCheck  if it's a valid only check
     *                                            whel set to true it will not execute the
     *                                            response builder, it will only do the isvalid check
     *                                            return the errors or flag valid
     *
     * @return type
     * @throws HttpException
     */
    public function getResponse(AbstractController $control, $onlyValidCheck = false)
    {
        $return = [];
        $this->setController($control);
        //invalid => throw bad request!
        if (!$this->request->isValid()) {
            if ($onlyValidCheck) {
                $return = ['errors' => $this->request->getErrors()];
            } else {
                throw new HttpException(400, join(', ', $this->request->getErrors()));
            }
        } else {
             $return = ($onlyValidCheck) ?  ['valid' => true] : $this->buildResponse();
        }
        return $return;
    }

    /**
     * Get the controller
     *
     * @return AbstractController
     */
    public function getController()
    {
        return $this->controller;
    }

    /**
     * Set the controller
     *
     * @param AbstractController $control
     *
     * @return $this
     */
    public function setController($control)
    {
        $this->controller = $control;
        return $this;
    }

    /**
     * Remove the empty values from the array
     *
     * @param array $user
     */
    protected function removeEmptyValues(array &$array)
    {
        foreach ($array as $k => $v) {
            if (empty($array[$k])) unset($array[$k]);
        }
        return ;
    }

    /**
     * All repsonse class must have the build response!
     */
    public abstract function buildResponse();
    
}