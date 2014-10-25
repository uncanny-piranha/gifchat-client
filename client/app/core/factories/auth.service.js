'use strict';

angular.module('gifchatClientApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    var currentUser = '';
    if($cookieStore.get('token')) {
      currentUser = $cookieStore.get('username');
    }

    return {

      /**
       * Authenticate user and save token
       *
       */
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

      /**
       * Delete access token and user info
       *
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = '';
      },

      /**
       * Create a new user
       *
       */
      createUser: function(user) {
        return $http.post('http://gifserver.azurewebsites.net/users/signup', {
          username: user.username,
          password: user.password
        })
        .success(function(data){
          $cookieStore.put('token', data.token);
          $cookieStore.put('username', data.username);
          currentUser = data.username;
        });
      },


      /**
       * Gets all available info on authenticated user
       *
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       */
      isLoggedIn: function() {
        if ($cookieStore.get('token')) {
          return true;
        } else {
          return false;
        }
      },

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
      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      },

      isAuth: function() {
        return !!$cookieStore.get('token');
      }
    };
  });
