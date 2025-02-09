import { z } from "zod";

export const signupSchema = z.object({
    name:z.string({required_error:"Required"}),
    email:z.string({required_error:"Required"}).email({message:"Must be an email"}),
    password:z.string({required_error:"Required"}).min(5,{message:"Must be at least 5 charecters"}),
    cpassword:z.string({required_error:"Required"}).min(5,{message:"Must be at least 5 charecters"}),
    contact:z.string({required_error:"Required"}).optional()
})
