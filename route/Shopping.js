var ShoppingController = require('../Controller/ShoppingController');
var express = require('express');
var app = express();

module.exports = function () {
    app.get('/', ShoppingController.getMainPage);
    return app;
};