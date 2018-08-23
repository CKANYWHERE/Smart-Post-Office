var UserController = require('../Controller/UserController');
var express = require('express');
var app = express();

module.exports = function(){
    app.post('/signin',UserController.PostLogin);
    app.get('/createuser',UserController.SaveUser);
    return app;
}