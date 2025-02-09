import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth"{
    interface User {
        _id?:string,
        role?:string,
        name?:string,
        contact?:string,
        email?:string
    }

    interface Session {
        user:{
            _id?:string,
            role?:string,
            name?:string,
            contact?:string,
            email?:string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT {
        _id?:string,
        role?:string,
        name?:string,
        contact?:string,
        email?:string
    }
}