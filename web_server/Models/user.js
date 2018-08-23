var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    phone : {type:String},
    id : {type:String},
    password : {type:String},
    name:{type:String},
    point:{type:Number},
    address:{type:String}
});

var user = mongoose.model('user',UserSchema);
module.exports = user;