import mongoose from "mongoose";

export interface Blogs extends Document {
    title: string,
    desc: string,
    category:string,
    author: string,
    coverPhoto: string,
    content: string,
    keywords:string,
}

const blogSchema: mongoose.Schema<Blogs> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Required"]
    },
    desc: {
        type: String,
        required: [true, "Required"]
    },
    category:{
        type:String,
        required:[true,"Required"]
    },
    author: {
        type: String,
        required: [true, "Required"]
    },
    coverPhoto: {
        type: String,
        required: [true, "Required"]
    },
    keywords:{
        type:String,
        required:[true,"Required"]
    },
    content: {
        type: String,
        required: [true, "Required"]
    }
},{timestamps:true})

const BlogModel = (mongoose.models.Blog as mongoose.Model<Blogs>) || mongoose.model<Blogs>("Blog",blogSchema)

export default BlogModel