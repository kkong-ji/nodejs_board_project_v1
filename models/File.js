// models/File.js

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// schema
var fileSchema = mongoose.Schema({ // 1
  originalFileName:{type:String},
  serverFileName:{type:String},
  size:{type:Number},
  uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  postId:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
  isDeleted:{type:Boolean, default:false},
});

// instance methods // 3
fileSchema.methods.processDelete = function(){ // 4
  this.isDeleted = true;
  this.save();
};
fileSchema.methods.getFileStream = function(){
  var stream;
  var filePath = path.join(__dirname,'..','uploadedFiles',this.serverFileName); // 5-1
  var fileExists = fs.existsSync(filePath); // 5-2
  if(fileExists){ // 5-3
    stream = fs.createReadStream(filePath);
  }
  else { // 5-4
    this.processDelete();
  }
  return stream; // 5-5
};


// model & export
var File = mongoose.model('file', fileSchema);

// model methods
File.createNewInstance = async function(file, uploadedBy, postId){ // 2
  return await File.create({
      originalFileName:file.originalname,
      serverFileName:file.filename,
      size:file.size,
      uploadedBy:uploadedBy,
      postId:postId,
    });
};


module.exports = File;