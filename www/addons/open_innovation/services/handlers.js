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
.factory('$mmaOpenInnovationHandlers', function($mmaOpenInnovation) {
	var self = {};

	 /**
     * Side menu nav handler.
     *
     * @module mm.addons.open_innovation
     * @ngdoc method
     * @name $mmaOpenInnovationHandlers#sideMenuNav
     */
	self.sideMenuNav = function() {
		var self = {};

		/**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
		self.isEnabled = function() {
			return $mmaOpenInnovation.isPluginEnabled();
		}

		 /**
         * Get the controller.
         *
         * @return {Object} Controller.
         */
		self.getController = function() {
			/**
             * Side menu nav handler controller.
             *
             * @module mm.addons.open_innovation
             * @ngdoc controller
             * @name $mmaOpenInnovationHandlers#sideMenuNav:controller
             */
			return function($scope) {
				$scope.icon = 'ion-android-locate';
				$scope.title = 'mma.open_innovation.openinnovation';
				$scope.state = 'site.open_innovation';
			}
		}

		return self;
	}

	return self;
});