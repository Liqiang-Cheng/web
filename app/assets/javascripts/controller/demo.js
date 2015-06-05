
app.controller('demoCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('/hello').success(function(data) {
            $scope.value = data;
            console.log($scope);
        });

        $scope.pushHello = function() {
            $http.post('/helloback', $scope.value).success(function(response) {
                $scope.helloBack = response;
            });
        };
    }
]);