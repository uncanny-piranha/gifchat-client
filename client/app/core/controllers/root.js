;(function(){
  'use strict';

/**
 * @ngdoc function
 * @name gifchatClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gifchatClientApp
 */

angular
  .module('gifchatClientApp')
  .controller('RootCtrl', RootCtrl);

  function RootCtrl ($scope, Auth) {
    $scope.active=false;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.activate = function(){
      $scope.active = !$scope.active;
    };
  }

})();
