angular.module('mm.addons.open_innovation')
	
	.controller('mmaOpenInnovationIndexController', function($scope, $http, $ionicLoading, 
																Challenges, mmaOpenInnovationAssets) {

		$scope.assets = mmaOpenInnovationAssets;
		$ionicLoading.show();
		
		Challenges.getList.then(function(response) {
			$scope.challenges = response.data;
			$ionicLoading.hide();
		});
	})

	.controller('mmaOpenInnovationChallengeController', function($scope, $stateParams, $state, $q, $sce, $ionicLoading,
																		Challenges, mmaOpenInnovationAssets) {
		$scope.assets = mmaOpenInnovationAssets;
		$ionicLoading.show();
		
		Challenges.getList.then(function(response) {
			$scope.challenge = Challenges.get($stateParams.challengeId);
			$scope.challenge.description_safe = $scope.challenge.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
			$scope.challenge.description_safe = $sce.trustAsHtml($scope.challenge.description_safe);
			$ionicLoading.hide()
		});
	})

	.controller('mmaOpenInnovationNewChallengeController', function($scope, $http, $location, $ionicLoading, ionicDatePicker, 
																		Challenges, mmaOpenInnovationUrlApi, mmaOpenInnovationAssets) {
		$scope.assets = mmaOpenInnovationAssets;
		$scope.formData = {};

		// Retrieve company list
		$ionicLoading.show();
		$http({
			method: 'GET',
			url: mmaOpenInnovationUrlApi + 'challenges/companies'
		}).success(function(response) {
			$scope.companies = response;
			$ionicLoading.hide();
		});

		// Load the datepicker
		$scope.datepicker = function() {
			ionicDatePicker.openDatePicker({
				callback: function(val) {
					var date = new Date(val);
					var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
					var month = date.getMonth() + 1;
					month = month < 10 ? '0' + month : month;
					$scope.formData.deadline = date.getFullYear() + '-' + month + '-' + day;
				}
			});
		}

		// Allow to create a new challenge
		$scope.createChallenge = function() {
			$ionicLoading.show();

			$http({
				method: 'POST',
				url: mmaOpenInnovationUrlApi + 'challenges',
				data: $scope.formData,
			}).success(function(challenge) {
				Challenges.add(challenge);
				$ionicLoading.hide();
				$location.path('site/challenge/' + challenge.id);
			})
		}
	})

	.controller('mmaOpenInnovationNewFeatureController', function($scope, $stateParams, $http, $location, $ionicLoading,
																	mmaOpenInnovationUrlApi ,Challenges) {
		var username = 'admin';
		$scope.formData = {};

		$scope.createFeature = function() {
			$ionicLoading.show();

			$http({
				method: 'POST',
				url: mmaOpenInnovationUrlApi + 'challenges/' + $stateParams.challengeId + '/feature?username=' + username,
				data: $scope.formData,
			}).success(function(feature) {
				$challenge = Challenges.get($stateParams.challengeId);
				$challenge.c_features++;
				$challenge.features.push(feature);
				$ionicLoading.hide();
				$location.path('site/challenge/' + $stateParams.challengeId);
			})
		}
	})