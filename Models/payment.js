var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    address : {type:String},
    reciver : {type:String},
    sender : {type:String},
    phone : {type:String},
    isGroup : {type:String},
    payment : {type:String},
    cardname : {type:String},
    cardnumber : {type:String},
    expiration : {type:String},
    cardpassword:{type:String}
});

var payment = mongoose.model('Payment',PaymentSchema);
module.exports = payment;