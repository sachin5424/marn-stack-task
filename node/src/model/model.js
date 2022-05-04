const mongoose = require('mongoose');

const user = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timesnap:true});


const Blog = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    title:{
        type:String
    },
   
    description:{
        type:String
    }
},{timesnap:true});




exports.userModel = mongoose.model("user",user);
exports.blogModel = mongoose.model("blog",Blog);





