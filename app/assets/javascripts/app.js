
var dependencies = [
    'ngRoute',
    'ui.bootstrap'
];

var app = angular.module('myApp', dependencies);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when ("/",{
            templateUrl: '/assets/partials/view.html'
        })
        .otherwise({redirectTo: '/'});
}]);