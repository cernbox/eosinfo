<?php
/**
 * ownCloud - eosinfo
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Hugo Gonzalez Labrador (CERN) <hugo.gonzalez.labrador@cern.ch>
 * @copyright Hugo Gonzalez Labrador (CERN) 2017
 */

namespace OCA\EosInfo\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

class PageController extends Controller {


	private $userId;
	private $instanceManager;

	public function __construct($AppName, IRequest $request, $UserId){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
		$this->instanceManager = \OC::$server->getCernBoxEosInstanceManager();
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function getInfo($path) {
		$userFolder = \OC::$server->getUserFolder($this->userId);
		$node = $userFolder->get($path);
		$stat = $node->stat();
		//$entry = $this->instanceManager->get($this->userId, $path);

		// the Backbone view does not like dotted attributes, so we change them to dashed.
		$map = [];
		$map['eos-instance'] = $this->instanceManager->getCurrentInstance()->getMgmUrl();
		$map['eos-file'] = $stat['eos.file'];

		return new DataResponse($map);
	}
}
