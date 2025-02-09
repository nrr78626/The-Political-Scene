import mongoose from "mongoose";


export interface User extends Document{
    name:string,
    email:string,
    password:string,
    contact:string,
    role:string,
    forgetPasswordToken?:string,
    forgetPasswordTokenExpiry?:Date,
}

const userSchema:mongoose.Schema<User> = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
    },
    role:{
        type:String,
        enum:["User","Admin","Superuser"],
        default:"User"
    },
    forgetPasswordToken:{
        type:String,
        default:undefined
    },
    forgetPasswordTokenExpiry:{
        type:Date,
        default:undefined
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    try {
        if(this.email === process.env.SUPERUSER?.toLowerCase()){
            this.role = "Superuser"
        }
        next()
    } catch (error:any) {
        next(error)
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)

export default UserModel