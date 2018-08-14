var ShoppingController = require('../Controller/ShoppingController');
var express = require('express');
var app = express();

module.exports = function () {
    //app.get('/api/Shopping', ShoppingController.getMainPage);
    return app;
};