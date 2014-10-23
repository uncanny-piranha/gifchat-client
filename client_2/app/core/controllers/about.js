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
  .controller('AboutCtrl', AboutCtrl);

  function AboutCtrl ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})();
