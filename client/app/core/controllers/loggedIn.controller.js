;(function(){
  'use strict';

// Handles active & loggedIn state
// Used to show/hide sidebar or allow one to navigate to the /chatroom route

angular
  .module('gifchatClientApp')
  .controller('LoggedInCtrl', LoggedInCtrl);

  // Exists in this high up scope because the nav-bar uses this when it determines whether or not to show
  // the hamber (dropdown) icon

  function LoggedInCtrl ($scope, Auth) {
    $scope.active=false;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.activate = function(){
      $scope.active = !$scope.active;
    };
  }

})();
