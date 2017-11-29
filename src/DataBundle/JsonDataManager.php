<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace DataBundle;

/**
 * Description of JsonDataManager
 * I work with doctrine (normaly)
 * just to speed this up
 *
 * @author david
 */
class JsonDataManager {
    /**
     *
     * @var string
     */
    protected $data;

    /**
     *
     * @var string
     */
    protected $file;

    /**
     * The constructor
     *
     * @param string $file the json file
     *
     * @throws \Exception
     */
    public function __construct(string $file) {
        $this->file = __DIR__ . '/Data/' . $file;
        //simple converter ... just raw data return ...
        //no memory checks or performance done (for the example)
        if (is_file($this->file)) {
            //normaly add proper json validations ...
            $this->data = json_decode(file_get_contents($this->file), true);
        } else {
            //for the example just throw a simple exception
            throw new \Exception(sprintf('The json file %s doesn\'t excist', $file));
        }
    }

    /**
     * Get the data from the json file
     *
     * @param string $orderBy order the data based on this key
     *
     * @return array
     */
    public function getData($orderBy = '') {
        return ($orderBy === '') ? $this->data : $this->orderData($this->data, $orderBy);
    }



    /**
     * Store the data
     *
     * @param array $data the data to store
     *
     * @return boolean
     */
    public function storeData(array $data)
    {
        //again data should be validated ... but for purpose of the example
        //this is skipped
        return file_put_contents($this->file, json_encode($data));
    }

    /**
     * Get the data based on the id
     *
     * @param int $id the id
     *
     * @return array|null
     */
    public function getById($id)
    {
        if (!isset($this->data[$id])) {
            throw new \Exception(sprintf('id %d not found', $id));
        }
        return $this->data[$id];
    }

    /**
     * Update the data
     *
     * @param int $id
     * @param array $data
     *
     * @throws Exception
     *
     * @return boolen
     */
    public function updateData(int $id, array $data)
    {
        if (!isset($this->data[$id])) {
            throw new \Exception(sprintf('id %d not found', $id));
        }
        $this->data[$id] = $data;
        return $this->storeData($this->data);
    }

     /**
     * insert the data
     *
     * @param array $data id col will be ignored
     *
     * @throws Exception
     *
     * @return boolean
     */
    public function insertData(array &$data)
    {
        $newId = sizeof($this->data) + 1;
        $data['id'] = $newId;
        $this->data[$newId] = $data;
        return $this->storeData($this->data);
    }

    /**
     * Delete the data
     *
     * @param int $id
     *
     * @throws Exception
     *
     * @return boolen
     */
    public function deleteData(int $id)
    {
        if (!isset($this->data[$id])) {
            throw new \Exception(sprintf('id %d not found', $id));
        }
        unset($this->data[$id]);
        return $this->storeData($this->data);
    }

    /**
     * Find the data
     *
     * @param array $search
     * @param string $orderBy
     *
     * @return array
     */
    public function findData($search, $orderBy = '')
    {
        $results = $this->data;
        foreach ($search as $key => $value) {
            $results = array_filter(
                $results,
                function($current) use ($key, $value) {
                    return (isset($current[$key]) && $current[$key] == $value);
                }
            );
        }
   
        if ($orderBy !== '') {
            $results = $this->orderData($results, $orderBy);
        }
        return $results;
    }

    /**
     * Order the data by the field
     *
     * @param array  $data    the data to order
     * @param string $orderby order based on this field
     *
     * @return array
     */
    protected function orderData($data, $orderby)
    {
        uasort($data, function($a, $b) use ($orderby) {
            if (isset($a[$orderby]) && isset($b[$orderby])) {
                return $a[$orderby] > $b[$orderby];
            } else {
                return false;
            }
        });
        return $data;
    }
}
