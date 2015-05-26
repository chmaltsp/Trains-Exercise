    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

        // home page
            .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // trains page will use train controller
        .when('/train', {
            templateUrl: 'views/train.html',
            controller: 'TrainController'
        });

        $locationProvider.html5Mode(true);

}]);