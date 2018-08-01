/**
 * ownCloud - eosinfo
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Hugo Gonzalez Labrador (CERN) <hugo.gonzalez.labrador@cern.ch>
 * @copyright Hugo Gonzalez Labrador (CERN) 2017
 */

(function(OC, OCA) {
	var TEMPLATE =
		'<div class="loading hidden" style="height: 50px"></div>' +
		"{{#if eos-file}}" +
		"<div><p>EOS Location</p></div>" +
		"<div><input readonly type='text' value='{{eos-file}}'></input></div>" +
		"{{/if}}";


	/**
	 * @memberof OCA.EosInfo
	 */
	var EosInfoTabView = OCA.Files.DetailTabView.extend( /** @lends OCA.EosInfo.EosInfoTabView.prototype */ {
		id: 'eosInfoTabView',
		className: 'tab eosInfoTabView',
		
		model: null,
		fileInfo: null,

		initialize: function() {
			OCA.Files.DetailTabView.prototype.initialize.apply(this, arguments);
		}, 

		template: function(params) {
			if (!this._template) {
				this._template = Handlebars.compile(TEMPLATE);
			}
			return this._template(params)
		},
		
		getLabel: function() {
			return 'EOS Information';
		},
		
		setFileInfo: function(fileInfo) {
			if (fileInfo) {
				this.fileInfo = fileInfo;
				this.render();
				this._loadEosInfo();
			} else {
				this.fileInfo = null;
				this.render();
			}
		},

		render: function() {
			this.$el.html(this.template(this.model));
			return this;
		},
		_toggleLoading: function(state) {
			this._loading = state;
			this.$el.find('.loading').toggleClass('hidden', !state);
			this.$el.find('.content').toggleClass('hidden', state);
		},
		
		_loadEosInfo: function() {
			this._toggleLoading(true);
			var self = this;
			var url = OC.generateUrl('/apps/eosinfo/getinfo');
			var path = this.fileInfo.get('path') + '/' + this.fileInfo.get('name');
			var data = {'path': path};
			$.post(url, data)
			.success(function (response) {
				self.model = response;
				self.render();
			})
			.done(function() {
				self._toggleLoading(false);
			})
		}
	});

	OCA.EosInfo.EosInfoTabView = EosInfoTabView;
})(OC, OCA);

