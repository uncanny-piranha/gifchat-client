'use strict';

/**
 * @ngdoc overview
 * @name gifchatClientApp
 * @description
 * # gifchatClientApp
 *
 * Main module of the application.
 */
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
        templateUrl: 'app/core/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/chatroom', {
        templateUrl: 'app/core/views/chatroom.html',
        controller: 'ChatroomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
