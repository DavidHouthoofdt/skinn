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

/**
 * This is the restfull controller for the groups
 * This will create a group, get a group, update group and delete group
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class GroupController extends AbstractController 
{
    protected $fileManager = null;
    
    /**
     * Set the needed file manager
     * 
     * @param \DataBundle\JsonDataManager $fileManager
     */
    public function setFileManager($fileManager)
    {
        $this->fileManager = $fileManager;
        return $this;
    }
    
    /**
     * Get the group details
     *
     * @example /api/group/1
     *
     * @param string $id the group id
     *
     * @return json
     */
    public function getAction($id)
    {
        die('GET IN PROGRESS!!!');
    }

    /**
     * Return a list of groups
     * @return type
     */
    public function cgetAction()
    {
        $req = new \ApiBundle\Components\Request\Group\Cget($this->getRequest());
        $res = new \ApiBundle\Components\Response\Group\Cget($req, $this->dataManager);
        return $res->getResponse($this);
    }
    
    /**
     * Get the files of the group
     * 
     * @return type
     */
    public function getFilesAction($id)
    {
        $req = new \ApiBundle\Components\Request\Group\File\Get($this->getRequest());
        $res = new \ApiBundle\Components\Response\Group\File\Get($req, $this->dataManager, $this->fileManager);
        return $res->getResponse($this);
    }
    
    public function postAction()
    {
        $req = new \ApiBundle\Components\Request\Group\Post($this->getRequest());
        $res = new \ApiBundle\Components\Response\Group\Post($req, $this->dataManager);
        return $res->getResponse($this);
    }
    
    public function putAction($id)
    {
        $req = new \ApiBundle\Components\Request\Group\Put($this->getRequest());
        $res = new \ApiBundle\Components\Response\Group\Put($req, $this->dataManager);
        return $res->getResponse($this);
    }
}
