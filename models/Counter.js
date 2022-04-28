var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
    name:{type:String, required:true},
    count:{type:Number, default:0},
});

var Counter = mongoose.model('counter', counterSchema);
module.exports = Counter;