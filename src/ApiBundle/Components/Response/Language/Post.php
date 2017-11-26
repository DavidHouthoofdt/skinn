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
 * This file handle the creation of the new language
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
     * return the languages
     * 
     * @return array
     */
    public function buildResponse()
    {
        $newLanguage = ['label' => $this->request->get('name')];
        if ($this->dm->insertData($newLanguage)) {
            return $newLanguage;
        } else {
            throw new \Exception('Unable to create the new language (i should add the reason why)');
        }
    }
}
