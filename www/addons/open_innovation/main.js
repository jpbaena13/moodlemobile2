angular.module('mm.addons.open_innovation', ['ionic-datepicker'])
	
	.constant('mmaOpenInnovationPriority', 400)
	.constant('mmaOpenInnovationAssets', 'http://campusdigital.arrobamedellin.edu.co/campus/rutan/innovacionabierta/public/')
	.constant('mmaOpenInnovationUrlApi', 'http://campusdigital.arrobamedellin.edu.co/campus/rutan/innovacionabierta/public/opin/api/')

	.config(function($stateProvider, $mmSideMenuDelegateProvider, $urlRouterProvider, $ionicConfigProvider, 
							mmaOpenInnovationPriority, ionicDatePickerProvider) {
		$ionicConfigProvider.tabs.position('bottom');

		$stateProvider
			.state('site.open_innovation', {
				url: '/open_innovation',
				views: {
					'site' : {
						templateUrl: 'addons/open_innovation/templates/init.html',
						controller: 'mmaOpenInnovationIndexController'
					}
				}
			})

			.state('site.new_challenge', {
				url: '/new_challenge',
				views: {
					'site' : {
						templateUrl: 'addons/open_innovation/templates/new-challenge.html',
						controller: 'mmaOpenInnovationNewChallengeController'
					}
				}
			})

			.state('site.challenge', {
				cache: false,
				url: '/challenge/:challengeId',
				views: {
					'site' : {
						templateUrl: 'addons/open_innovation/templates/challenge.html',				
						controller: 'mmaOpenInnovationChallengeController'
					}
				},
			})

			.state('site.new_feature', {
				url: '/challenge/:challengeId/feature',
				views: {
					'site' : {
						templateUrl: 'addons/open_innovation/templates/new-feature.html',
						controller: 'mmaOpenInnovationNewFeatureController'
					}
				}
			})

		// Register side menu addon.
		$mmSideMenuDelegateProvider.registerNavHandler('mmaOpenInnovation', 
				'$mmaOpenInnovationHandlers.sideMenuNav', mmaOpenInnovationPriority);

		ionicDatePickerProvider.configDatePicker({
			inputDate: new Date(),
			dateFormat: 'yyyy-MM-dd',
			closeOnSelect: true,
		});
	})

	.service('Challenges', function($http, $mmSite, mmaOpenInnovationUrlApi) {
		var username = 'admin';
		var challenges = undefined;

		return	{
			getList: $http({
						method: 'GET',
						url: mmaOpenInnovationUrlApi + 'challenges?username=' + username
					}).success(function(response){
						challenges = response;
					}),
			get: function(id) {
				var challenge = undefined;

				challenges.forEach(function(c){
					if (c.id == id) {
						challenge = c;
						return;
					}
				});

				return challenge;
			},
			add: function(challenge) {
				challenges.push(challenge);
			}			
		}
	})