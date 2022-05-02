// models/Category.js

var mongoose = require('mongoose');

// schema
var categorySchema = mongoose.Schema({
  name:{type:String, required:true},
  category:{type:String},
});

// model & export
var Category = mongoose.model('category', categorySchema);
module.exports = Category;