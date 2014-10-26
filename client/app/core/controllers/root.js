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

  function RootCtrl ($scope) {
    $scope.active=false;

    $scope.activate = function(){
      $scope.active = !$scope.active;
    };
  }

})();
