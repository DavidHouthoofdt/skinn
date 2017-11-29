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
 */

namespace ApiBundle\Components\Response\Group\File;

use ApiBundle\Components\Request;
use ApiBundle\Components\Response;
use DataBundle\JsonDataManager;


/**
 * This will create the response of the files in the group
 *
 * Example usage:
 *
 * @package  ApiBundle\Controller
 * @author   David Houthoofdt <david@houthoofdt.be>
 * @access   public
 */
class Get extends Response {

    protected $fileManager;

    /**
     * Create response
     *
     * @param Request     $request  the current http request
     * @param JsonDataManager $dm       the data manager
     */
    public function __construct(
        Request $request,
        JsonDataManager $dm,
        JsonDataManager $fileDm
    ) {
       parent::__construct($request, $dm);
       $this->fileManager = $fileDm;
    }

    /**
     * Get the respone
     *
     * @return mixed
     */
    public function buildResponse()
    {
        return $this->fileManager->findData(['group_id' => $this->request->get('id')], 'sequence');
    }
}
