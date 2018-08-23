var shoppingRoute = require('./route/Shopping');
var userRoute = require('./route/User');

module.exports = function(app) {
    app.use('/',shoppingRoute());
    app.use('/api/postoffice',userRoute());
};