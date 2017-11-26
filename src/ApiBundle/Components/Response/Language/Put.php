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
namespace ApiBundle\Components\Response\Language;

/**
 * This file handle the update of the  language
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
     * return the languages
     * 
     * @return array
     */
    public function buildResponse()
    {
        $language = $this->dm->getById($this->request->get('id'));
        if (empty($language)) {
            throw new \Exception('Language not found');
        }
        $update = array_merge($this->request->getRequestParams(), $language);
        
        if ($this->dm->updateData($this->request->get('id'), $update)) {
            return $update;
        } else {
            throw new \Exception('Unable to update the language (i should add the reason why)');
        }
    }
}
