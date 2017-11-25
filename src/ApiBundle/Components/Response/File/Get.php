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

use ApiBundle\Components\Response;

/**
 * The response for the file detail
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Get extends \ApiBundle\Components\Response 
{

    /**
     * Get the respone
     *
     * @return mixed
     */
    public function buildResponse()
    {
       return $this->dm->getById($this->request->get('id'));        
    }
}
