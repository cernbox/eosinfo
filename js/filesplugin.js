(function() {
	OCA.EosInfo = _.extend({}, OCA.EosInfo);
	if (!OCA.EosInfo) {
		/**
		 * @namespace
		 */
		OCA.EosInfo = {};
	}

	/**
	 * @namespace
	 */
	OCA.EosInfo.FilesPlugin = {
		ignoreLists: [
			'trashbin',
			'files.public'
		],

		attach: function(fileList) {
			if (this.ignoreLists.indexOf(fileList.id) >= 0) {
				return;
			}

			fileList.registerTabView(new OCA.EosInfo.EosInfoTabView('eosView'));
		}
	};

})();

OC.Plugins.register('OCA.Files.FileList', OCA.EosInfo.FilesPlugin);

