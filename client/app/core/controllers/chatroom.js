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
  .controller('ChatroomCtrl', ChatroomCtrl);

  function ChatroomCtrl ($scope, Auth, $firebase, $location) {
    $scope.username = Auth.getCurrentUser();
    $scope.userMessage;
    $scope.newUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.privateMessage = false;
    $scope.privateMessageHash;
    $scope.privateMessageURL;
    $scope.usernameFriend;
    $scope.friendsName;
    $scope.chosenPrivate=false;
    $scope.added=false;

    var linkRef = new Firebase("https://sizzling-fire-1984.firebaseio.com/usernames/"+$scope.username+ "/" +"messages");
    var sync = $firebase(linkRef);
    $scope.messages = sync.$asArray();

    $scope.addMessage = function(text) {
      Auth.sendMessage($scope.friendsName, $scope.username, text);
      $scope.userMessage = '';
    };

    $scope.setFriendUsername = function(user){
      $scope.friendsName = user;
      $scope.chosenPrivate=true;
      var userRef = new Firebase("https://sizzling-fire-1984.firebaseio.com/usernames/" + $scope.username + '/' +"messages"+ "/" + user);
      var otherUserRef = new Firebase("https://sizzling-fire-1984.firebaseio.com/usernames/" + user + '/' +"messages"+ "/" + $scope.username);
      var otherSync = $firebase(otherUserRef);
      var synchy = $firebase(userRef);
      $scope.friendsMessages = otherSync.$asArray();
      $scope.privateMessages = synchy.$asArray();
    };
    $scope.addFriend = function() {
      $scope.added = !$scope.added;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };
  }

})();
