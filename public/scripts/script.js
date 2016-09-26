var myApp = angular.module('myApp', []);

// add new record
myApp.controller('whereMyPeeps', ['$scope', '$http', function($scope, $http) {
    $scope.addRecord = function() {
        event.preventDefault();
        var objectToSend = {
            name: $scope.nameIn,
            location: $scope.locationIn,
        };
        $http({
            method: 'POST',
            url: '/testPost',
            data: objectToSend
        });
        $scope.nameIn = '';
        $scope.locationIn = '';
    };

    // get all the records
    $scope.getRecords = function(response) {
        $http({
                method: 'GET',
                url: '/getRecords',
            })
            .success(function(response) {
                $scope.allTheRecords = response;
                console.log($scope.allTheRecords);
            })
            .error(function(response) {
                console.log(response.statusText);
    });
  };
}]);
