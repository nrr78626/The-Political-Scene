import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDb from "@/Database/db"
import UserModel from "@/Models/UserModel"
import bcrypt from "bcryptjs"


export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"text"}
            },
            async authorize(credentials:any):Promise<any>{
                await connectToDb()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user 
                    }else{
                        throw new Error("Incorrect password")
                    }
                } catch (error:any) {
                    throw new error
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString()
                token.contact=user.contact
                token.email=user.email
                token.name=user.name
                token.role=user.role
            }   
            return token
        },
        async session({session,token}){
            if(session){
                session.user._id = token._id
                session.user.contact=token.contact
                session.user.email=token.email
                session.user.name=token.name
                session.user.role=token.role
            }
            return session
        }
    },
    pages:{
        signIn:"/sign-in",
        signOut:""
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET
}