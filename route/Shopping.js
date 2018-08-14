var ShoppingController = require('../Controller/ShoppingController');
var express = require('express');
var app = express();

module.exports = function () {
    app.post('/postpayment', ShoppingController.PostPayment);
    return app;
};