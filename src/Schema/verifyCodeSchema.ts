import { z } from "zod";

export const verifyCodeSchema = z.object({
    code:z.string().min(6,{message:"Must be 6 digits"})
})