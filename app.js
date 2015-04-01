// create angular app
var validationApp = angular.module('validationApp', []);

// create angular controller
validationApp.controller('mainController', function($scope, $http) {

	// function to submit the form after all validation has occurred
	$scope.submitForm = function(isValid) {
		// check to make sure the form is completely valid
		if (isValid) {
			alert('valid...amazing then!!!');
			alert(JSON.stringify($scope.mail));
			$scope.postData = {};
				// Check form validation
				alert("POSTMAIL");
				// wrap all your input values in $scope.postData
				$scope.postData = angular.copy($scope.mail);

				alert("postData");

				alert(JSON.stringify($scope.postData));

				$http.post('/process', $scope.postData)
				.success(function(data) {
					// Show success message
					alert('Success');
				})
				.error(function(data) {
					// Show error message
					alert('Error');
				});

		}
		else{
			alert('this is form is not valid then ****');
		}

	};

});
