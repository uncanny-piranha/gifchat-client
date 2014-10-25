'use strict';

/**
 * @ngdoc function
 * @name gifchatClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gifchatClientApp
 */
angular.module('gifchatClientApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location) {

    $scope.user = {};
    $scope.errors = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.activeLogin=false;
    $scope.activeSignup=false;

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.errors= {};
        Auth.createUser({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/chatroom');
        })
        .catch( function(err) {
          console.log('caught signup error ' + JSON.stringify(err));
          $scope.errors.other = err.data;

          err = err.data;
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.login = function(form) {
      $scope.submitted = true;
      $scope.errors = {};
      if(form.$valid) {
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/chatroom');
        })
        .catch( function(err) {
          $scope.errors.other = err.data;
        });
      }
    };
    $scope.activateLogin = function(){
      $scope.activeLogin = !$scope.activeLogin;
    }
    $scope.activateSignup = function(){
      $scope.activeSignup = !$scope.activeSignup;
    }
  });
