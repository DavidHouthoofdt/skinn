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
 * This file handle the update of the file
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Put extends \ApiBundle\Components\Response
{
    /**
     * update the file
     *
     * @return array
     */
    public function buildResponse()
    {
        $file = $this->dm->getById($this->request->get('id'));
        if (empty($file)) {
            throw new \Exception('File not found');
        }
        $update = array_merge($file, $this->request->getRequestParams());

        if ($this->dm->updateData($this->request->get('id'), $update)) {
            return $update;
        } else {
            throw new \Exception('Unable to update the file (i should add the reason why)');
        }
    }
}
