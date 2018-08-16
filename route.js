var shoppingRoute = require('./route/Shopping');

module.exports = function(app) {
    app.use('/',shoppingRoute());
};