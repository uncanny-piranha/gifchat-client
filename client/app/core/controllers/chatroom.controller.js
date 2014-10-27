;(function(){
  'use strict';
// Controller for chatroom.

angular
  .module('gifchatClientApp')
  .controller('ChatroomCtrl', ChatroomCtrl);

  function ChatroomCtrl ($scope, Auth, $firebase, $location) {
    $scope.username = Auth.getCurrentUser();
    $scope.userMessage;
    $scope.newUser;
    $scope.privateMessage = false;
    $scope.usernameFriend;
    $scope.friendsName;
    $scope.chosenPrivate=false;
    $scope.added=false;

    var linkRef = new Firebase("https://scalding-fire-2109.firebaseio.com/usernames/"+$scope.username+ "/" +"messages");
    var sync = $firebase(linkRef);
    $scope.messages = sync.$asArray();

    $scope.addMessage = function(text) {
      Auth.sendMessage($scope.friendsName, $scope.username, text);
      $scope.userMessage = '';
    };

    $scope.clearUnreadMessages = function(name){
      if(name){
        var friendsRef = new Firebase("https://scalding-fire-2109.firebaseio.com/usernames/" + $scope.username + '/' +"messages"+ "/" + name);
        var unread = friendsRef.child('unread');
        unread.set('0');
      }
    };

    $scope.setFriendUsername = function(user){
      $scope.friendsName = user;
      $scope.chosenPrivate=true;
      var userRef = new Firebase("https://scalding-fire-2109.firebaseio.com/usernames/" + $scope.username + '/' +"messages"+ "/" + user);
      var otherUserRef = new Firebase("https://scalding-fire-2109.firebaseio.com/usernames/" + user + '/' +"messages"+ "/" + $scope.username);
      var userMsg = userRef.child('messages');
      var otherUserMsg = otherUserRef.child('messages');
      var otherUserSync = $firebase(otherUserMsg);
      var userSync = $firebase(userMsg);

      //Set unread for this friend to 0
      var unread = userRef.child('unread');
      unread.set('0');

      $scope.friendsMessages = otherUserSync.$asArray();
      $scope.privateMessages = userSync.$asArray();
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
