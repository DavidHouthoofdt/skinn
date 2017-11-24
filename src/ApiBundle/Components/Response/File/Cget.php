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
 * The request for the listing of the products
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Cget extends \ApiBundle\Components\Response
{
    /**
     * return the groups
     * 
     * @return array
     */
    public function buildResponse()
    {
        return $this->dm->getData();
    }
}
