angular.module('components', [])
	.directive('helloWorld', function() {
		return {
			restrict: 'E',
			scope:{
				time:'@'
			},
			templateUrl: 'views/partials/time.html'
		}
	})


angular.module('TimeApp', ['components'])