var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name :{type:String},
    ref : [{type:Schema.Types.ObjectId,ref:"Payment"}],
});

var Group = mongoose.model('Group',GroupSchema);
module.exports = Group