var shoppingRoute = require('./route/Shopping');

module.exports = function(app) {
    app.use('/api/Shopping',shoppingRoute());
};