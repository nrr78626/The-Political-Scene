import connectToDb from "@/Database/db";
import { uploadToCloudinary } from "@/Helpers/CloudinaryUploader";

export async function POST(request: Request) {
    connectToDb()
    try {
        const data = await request.formData()

        const file: File = data.get("gblogImage") as unknown as File

        if (!file) {
            return Response.json({ success: false, message: "Image not found" }, { status: 404 })
        }

        const fileBuffer = await file.arrayBuffer();
        const mimetype = file.type
        const encoding = "base64"
        const base64Data = Buffer.from(fileBuffer).toString("base64")

        const fileUri = "data:" + mimetype + ";" + encoding + "," + base64Data
        const fileRes = await uploadToCloudinary(fileUri, file.name)

        if (!fileRes.success) {
            return Response.json({ success: false, message: "File not uploaded" }, { status: 400 })
        }

        if (!fileRes.result) {
            return Response.json({ success: false, message: "Error during returning file url" }, { status: 404 })
        }

        return Response.json({ success: true, message: "Url generated", payload: fileRes.result.secure_url }, { status: 200 })

    } catch (error) {
        console.log("Unable to generate blog image")
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}