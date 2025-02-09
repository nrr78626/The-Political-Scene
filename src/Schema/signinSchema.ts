import { z } from "zod";

export const signinSchema = z.object({
    identifier:z.string({required_error:"Required"}).email({message:"Must be an email"}),
    password:z.string({required_error:"Required"}).min(5,{message:"Must be at least 5 charecters"}),
})