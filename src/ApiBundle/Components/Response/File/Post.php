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
namespace ApiBundle\Components\Response\File;

/**
 * This file handle the creation of the new files
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
        $newFile = $this->request->getRequestParams();
        if ($this->dm->insertData($newFile)) {
            return $newFile;
        } else {
            throw new \Exception('Unable to create the new file (i should add the reason why)');
        }
    }
}
