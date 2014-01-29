angular.module('components', [])
	.directive('helloWorld', function() {
		return {
			restrict: 'E',
			scope:{
				name:'bind'
			},
			templateUrl: 'partials/hello.html'
		}
	})

angular.module('HelloApp', ['components'])
