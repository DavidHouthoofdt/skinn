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

namespace ApiBundle\Components\Request\File;

/**
 * The request for the getting the file
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Get extends \ApiBundle\Components\Request {

    /**
     * Get the input filter for loading the file
     *
     * @return array
     */
    protected function getInputFilter()
    {
        return [
            'id' => [
                'required' => true,
            ],
            'language' => [
                'required' => false,
                'default' => 'NL'
            ]
        ];
    }

}
