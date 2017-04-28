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

namespace OCA\EosInfo\AppInfo;

use OCP\AppFramework\App;

require_once __DIR__ . '/autoload.php';

$app = new App('eosinfo');

$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function() {
		\OCP\Util::addScript('eosinfo', 'app');
		\OCP\Util::addScript('eosinfo', 'filesplugin');
		\OCP\Util::addScript('eosinfo', 'eosinfoview');
		\OCP\Util::addStyle('eosinfo', 'style');
	}
);
