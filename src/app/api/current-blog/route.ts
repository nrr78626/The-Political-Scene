import connectToDb from "@/Database/db";
import BlogModel from "@/Models/BlogModel";

export async function GET(request: Request) {
    connectToDb()
    try {
        const blog_id = await request.headers.get("blog_id")

        if (!blog_id) {
            return Response.json({ success: false, message: "Blog id not found" }, { status: 404 })
        }

        const blog = await BlogModel.findById({ _id: blog_id })

        if (!blog) {
            return Response.json({ success: false, message: "Blog not found" }, { status: 404 })
        }

        return Response.json({ success: true, message: "fetched", payload:blog }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    connectToDb()
    try {
        const blog_id = await request.headers.get("blog_id")

        if (!blog_id) {
            return Response.json({ success: false, message: "Blog id not found" }, { status: 404 })
        }

        const blog = await BlogModel.findById({ _id: blog_id })

        if (!blog) {
            return Response.json({ success: false, message: "Blog not found" }, { status: 404 })
        }

        const deleteBlog = await BlogModel.findByIdAndDelete({ _id: blog._id })
        if (!deleteBlog) {
            return Response.json({ success: false, message: "Unable to delete blog" }, { status: 400 })
        }

        return Response.json({ success: true, message: "Blog has been deleted" }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}