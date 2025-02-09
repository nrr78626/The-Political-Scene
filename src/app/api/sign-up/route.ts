import connectToDb from "@/Database/db";
import UserModel from "@/Models/UserModel";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    connectToDb()
    try {
        const { name, email, password, contact } = await request.json()

        if (!name || !email || !password) {
            return Response.json({ success: false, message: "All field are required" }, { status: 400 })
        }

        const finduser = await UserModel.findOne({email})

        if(finduser){
           return Response.json({success:false,message:"User has been already registered"},{status:400}) 
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new UserModel({
            name,
            email,
            contact,
            password: hashedPassword
        })
        await user.save()
        return Response.json({ success: true, message: "Sign up successfully"}, { status: 201 })
    } catch (error) {
        console.log("Unable to add user", error)
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
}