(function() {
	if (!OCA.EosInfo) {
		/**
		 * @namespace
		 */
		OCA.EosInfo = {};
	}
})();

$(document).ready(function () {
	OC.Notification.showHtml("<a href='https://cern.service-now.com/service-portal?id=outage&n=OTG0057336' target='_blank'><b>OTG0057336 - CERNBox Web UI will be unvailable Saturday 27th from 7:30 to 14:30</a>", {timeout: 10, type: "error"});	
});
