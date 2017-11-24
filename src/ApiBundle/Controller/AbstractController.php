<?php

/*
 * Author:       David Houthoofdt
 * Email:        david@houthoofdt.be
 * Organization: 28 Development
 * Date:         November 24, 2017
 * Description:
 *
 * Copyright:    2017  by David Houthoofdt, 28 Development
 * License:      2017  http://www.gnu.org/copyleft/lesser.html
 *
 */

namespace ApiBundle\Controller;

use Exception;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;


/**
 * This is the main controller for all the api calls
 * This file will handle all common data between the controllers
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
abstract class AbstractController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @var RequestStack
     */
    protected $request;
    
    /**
     *
     * @var DataManager 
     */
    protected $dataManager;

    /**
     * @param RequestStack $request the incomming request info
     * @param DataManager  $dm      the data manager
     * 
     * @throws type
     */
    public function __construct(RequestStack $request, $dm = null) {
        $this->request = $request->getCurrentRequest();
        $this->dataManager = $dm;
    }

    /**
     * Get the current request
     *
     * @return Request|null
     */
    public function getRequest()
    {
        return $this->request;
    }

    public function postAction()
    {
       throw new Exception("New not implemented");
    }

    public function cgetAction()
    {
       throw new Exception("List not implemented");
    }

    public function putAction($id)
    {
       throw new  Exception("put not implemented");
    }

    public function deleteAction($id)
    {
       throw new Exception("delete not implemented");
    }
    
    /**
     * When needed inject the service container
     *
     * @param type $container
     *
     * @return type
     */
    public function setServiceContainer($container)
    {
        $this->container = $container;
        return;
    }

    /**
     * get the service container
     *
     * @return type
     */
    public function getContainer()
    {
        return $this->container;
    }
}
