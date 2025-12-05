import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user : {type : String , ref : 'User', required : true},
    content : {type : String},
    media_urls : {type : String},
    media_type : {type : String , enum : ['text' , 'image' , 'video'] , required : true},
    views_count : [{type : String , ref : 'User'}],
    background_color : {type : String},
},{timestamps : true , minimize : false});

const Post = mongoose.model("Post", postSchema);

export default Post;