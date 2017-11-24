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

use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

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
}
