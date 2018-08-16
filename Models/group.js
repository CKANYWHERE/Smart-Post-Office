var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name :{type:String},
    ref : [{type:Schema.Types.ObjectId,ref:"Payment"}],
    syncTime :{type: Date, default: Date.now},

});

var Group = mongoose.model('Group',GroupSchema);
module.exports = Group