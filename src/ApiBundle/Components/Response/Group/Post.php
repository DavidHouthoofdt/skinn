<?php
/*
/*
 * Author:       David Houthoofdt
 * Email:        david@houthoofdt.be
 * Organization: 28 Development
 * Date:         November 24, 2017
 * Description:
 *
 * Copyright:    2016  by David Houthoofdt, 28 Development
 * License:      2016  http://www.gnu.org/copyleft/lesser.html
 *
 */
namespace ApiBundle\Components\Response\Group;

/**
 * This file handle the creation of the new groups
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Post extends \ApiBundle\Components\Response
{
    /**
     * return the group 
     * 
     * @return array
     */
    public function buildResponse()
    {
        $newGroup = ['label' => $this->request->get('name')];
        if ($this->dm->insertData($newGroup)) {
            return $newGroup;
        } else {
            throw new \Exception('Unable to create the new group (i should add the reason why)');
        }
    }
}
