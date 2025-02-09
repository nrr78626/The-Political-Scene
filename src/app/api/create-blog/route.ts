import connectToDb from "@/Database/db";
import { uploadToCloudinary } from "@/Helpers/CloudinaryUploader";
import BlogModel from "@/Models/BlogModel";

export async function POST(request: Request) {
    connectToDb()
    try {
        const data = await request.formData()
        const title = data.get("title")
        const author = data.get("author")
        const content = data.get("content")
        const desc = data.get("desc")
        const category = data.get("category")
        const keywords = data.get("keywords")
        const file: File = data.get("coverPhoto") as unknown as File

        if (!title || !keywords || !author || !content || !desc || title == "" || author == "" || content == "" || desc == "" || keywords=="") {
            return Response.json({ success: false, message: "All fields are required" }, { status: 400 })
        }

        if (!file) {
            return Response.json({ success: false, message: "Cover photo is required" }, { status: 404 })
        }

        const fileBuffer = await file.arrayBuffer()
        const mimetype = file.type
        const encoding = "base64"
        const base64Data = Buffer.from(fileBuffer).toString("base64")

        const fileUri = "data:" + mimetype + ";" + encoding + "," + base64Data

        const fileRes = await uploadToCloudinary(fileUri, file.name)

        if (!fileRes.success) {
            return Response.json({ success: false, message: "file not uploaded" }, { status: 404 })
        }

        if (!fileRes.result) {
            return Response.json({ success: false, message: "result not found" }, { status: 404 })
        }

        const blog = new BlogModel({
            title,
            content,
            author,
            desc,
            category,
            keywords,
            coverPhoto: fileRes.result.secure_url
        })
        await blog.save()
        return Response.json({ success: true, message: "Blog has been uploaded", payload: blog }, { status: 201 })
    } catch (error) {
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    connectToDb()
    try {
        const blog = await BlogModel.find()
        return Response.json({ success: true, message: "Fetched", payload: blog }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}