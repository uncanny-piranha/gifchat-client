(function(){

  'use strict';
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  var express = require('express');
  var reloader = require('connect-livereload')
  var app = express();



  app.use(reloader());
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./dist'));
  } else {
    app.use(express.static('./client'));
  }


  app.listen(9000, function(){
    console.log('App Listening on localhost:9000');
  });

})();
