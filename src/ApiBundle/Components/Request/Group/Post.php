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
namespace ApiBundle\Components\Request\Group;

/**
 * The request handler for creating groups
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Post extends \ApiBundle\Components\Request
{
    /**
     * Get the input filter for loading the languages
     *
     * @return array
     */
    protected function getInputFilter()
    {
        return [
            'name' => [
                'required' => true,
            ]
        ];
    }
}
