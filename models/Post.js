// models/Post.js

var mongoose = require('mongoose');
var Counter = require('./Counter');
var Category = require('./Category');

// schema
var postSchema = mongoose.Schema({ // 1
    title: { type: String, required: [true, 'Title은 필수 항목입니다!'] },
    body: { type: String, required: [true, 'Body는 필수 항목입니다!'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    category: { type: String, required: [true, 'Category는 필수 항목입니다!'] },
    views:{type:Number, default:0},
    numId:{type:Number},
    attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'},
    createdAt: { type: Date, default: Date.now }, // 2
    updatedAt: { type: Date },
});

postSchema.pre('save', async function (next) {
    var post = this;
    if(post.isNew){
        counter = await Counter.findOne({name:'posts'}).exec();
        if(!counter) counter = await Counter.create({name:'posts'});
        counter.count++;
        counter.save();
        post.numId = counter.count;
    }
    return next();
})


// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;