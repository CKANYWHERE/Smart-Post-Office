var shoppingRoute = require('./route/Shopping');

module.exports = function(app) {
    app.use('/api/shopping',shoppingRoute());
};