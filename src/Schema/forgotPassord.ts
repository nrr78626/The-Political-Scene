import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email:z.string({required_error:"Required"}).email({message:"Must be an email"}),
})