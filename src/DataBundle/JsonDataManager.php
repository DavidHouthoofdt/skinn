<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace DataBundle;

/**
 * Description of JsonDataManager
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
     * @return array
     */
    public function getData() {
        return $this->data;
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
}