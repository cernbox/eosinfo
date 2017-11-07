(function() {
	if (!OCA.EosInfo) {
		/**
		 * @namespace
		 */
		OCA.EosInfo = {};
		var isReadOnlyNotificationAlreadyInPlace = function() {
			var isEnabled = false;
			// check if we have already a notification so disable
			var rows = $("#notification").find(".row");
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if(row.innerHTML.indexOf("read-only") !== -1) {
					isEnabled = true;
				}
			}
			return isEnabled;
		};
		
		var hideNotification = function() {
			var rows = $("#notification").find(".row");
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if(row.innerHTML.indexOf("read-only") !== -1) {
					OC.Notification.hide();
				}
			}
		};

		var check = function () {
			var url = OC.generateUrl('/apps/eosinfo/isreadonly');
			$.getJSON(url)
			.success(function (response) {
				if(response['isreadonly'] === true) {
					if(isReadOnlyNotificationAlreadyInPlace() === false) {
						OC.Notification.showHtml("<b>CERNBox Service</b> is in <b>read-only</b> mode until the intervention is finished.</br>Creating, renaming or deleting files or shares is not possible");
					}
				} else {
					hideNotification();
				}
			})
		};
		$(document).ready(function () {
			// first run after page reload
			check();
			// monitor every 30s
			setInterval(check, 30000);
		});
	}
})();
