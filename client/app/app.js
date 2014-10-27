(function(){
'use strict';


angular
  .module('gifchatClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/core/views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/chatroom', {
        templateUrl: 'app/core/views/chatroom.html',
        controller: 'ChatroomCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, Auth) {
    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isLoggedIn()) {
        $location.path('/');
      }
    });
  });
})();
