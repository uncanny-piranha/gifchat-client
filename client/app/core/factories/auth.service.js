'use strict';

angular.module('gifchatClientApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    var currentUser = '';
    if($cookieStore.get('token')) {
      currentUser = $cookieStore.get('username');
    }

    return {
      // stores username and token in cookieStore
      login: function(user) {
        return $http.post('http://gifserver.azurewebsites.net/users/login', {
          username: user.username,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          $cookieStore.put('username', data.username);
          currentUser = data.username;
        })
        .error(function(err){
          console.log(err);
        });
      },
      // Deletes info from cookieStore
      logout: function() {
        $cookieStore.remove('token');
        $cookieStore.remove('username');
        currentUser = '';
      },
      // creates a new user in DB, then does the same thing that login does.
      createUser: function(user) {
        return $http.post('http://gifserver.azurewebsites.net/users/signup', {
          username: user.username,
          password: user.password
        })
        .success(function(data){
          $cookieStore.put('token', data.token);
          $cookieStore.put('username', data.username);
          currentUser = data.username;
        })
        .error(function(err){
          console.log(err);
        });
      },

      // Gets available info on current user (at this time, just the username)
      getCurrentUser: function() {
        return currentUser;
      },
      // Checks if the user is logged in (if token exist);
      isLoggedIn: function() {
        if ($cookieStore.get('token')) {
          return true;
        } else {
          return false;
        }
      },
      // Sends message to our DB
      sendMessage: function(to, from, keyword) {
        return $http.post('http://gifserver.azurewebsites.net/gifs', {
          to: to,
          from: from,
          keyword: keyword
        })
        .error(function(err){
          console.log(err);
        });
      },
      // returns auth token from local storage
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
