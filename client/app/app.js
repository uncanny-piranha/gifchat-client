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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/core/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'app/core/views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
