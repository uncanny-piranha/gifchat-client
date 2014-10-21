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
  .controller('<%= name %>Ctrl', <%= name %>Ctrl);

  function <%= name %>Ctrl ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})();
