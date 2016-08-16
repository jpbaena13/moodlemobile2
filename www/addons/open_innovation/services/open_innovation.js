angular.module('mm.addons.open_innovation')
	
	/**
	 * Open Innovation handlers factory.
	 *
	 * This factory holds the different handlers used for delegates.
	 *
	 * @module mm.addons.open_innovation
	 * @ngdoc service
	 * @name $mmaOpenInnovationHandlers
	 */
	.factory('$mmaOpenInnovation', function($mmSite) {
		var self = {};

		/**
	     * Return whether or not the plugin is enabled. Plugin is enabled if:
	     *
	     * @module mm.addons.open_innovation
	     * @ngdoc method
	     * @name $mmaOpenInnovation#isPluginEnabled
	     * @return {Boolean}
	     */
		self.isPluginEnabled = function() {
			return $mmSite.isLoggedIn();
		};

		return self;
	});