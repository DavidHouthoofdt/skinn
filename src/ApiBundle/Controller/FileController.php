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
 * This is the restfull controller for the files
 * This will create a files, get a files, update files and delete files
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class FileController extends AbstractController
{
    /**
     * Get the file details
     *
     * @example /api/file/1
     *
     * @param string $id the file id
     *
     * @return json
     */
    public function getAction($id)
    {
        die('GET IN PROGRESS!!!');
    }

    /**
     * Return a list of file
     *
     * @return type
     */
    public function cgetAction()
    {
        $req = new \ApiBundle\Components\Request\File\Cget($this->getRequest());
        $res = new \ApiBundle\Components\Response\File\Cget($req, $this->dataManager);
        return $res->getResponse($this);
    }
}
