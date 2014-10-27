(function(){
'use strict';

// Home Ctrl handles anything related to Signup / Log in forms
// Any actual autentication is delegated out to the Auth factory.
angular
  .module('gifchatClientApp')
  .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $http, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.activeLogin=false;
    $scope.activeSignup=false;
    $scope.loading=false; //determines whether or not loading gif is displayed

    $scope.register = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.loading=true;
        $scope.errors= {};
        Auth.createUser({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          $scope.loading=false;
          // Account created, redirect to home
          $location.path('/chatroom');
        })
        .catch( function(err) {
          $scope.loading=false;
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
        $scope.loading=true;
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          $scope.loading=false;
          // Logged in, redirect to home
          $location.path('/chatroom');
        })
        .catch( function(err) {
          $scope.loading=false;
          $scope.errors.other = err.data;
        });
      }
    };
    $scope.activateLogin = function(){
      $scope.activeLogin = !$scope.activeLogin;
    };
    $scope.activateSignup = function(){
      $scope.activeSignup = !$scope.activeSignup;
    };
  }

})();
