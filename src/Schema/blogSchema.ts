import { z } from "zod"

export const blogSchema = z.object({
    title: z.string({required_error:"Required"}).min(10, { message: "Must has been 10 charecters" }),
    desc: z.string({required_error:"Required"}).min(20, { message: "Must has been 20 charecters" }),
    cat:z.string({required_error:"Required"}).min(5,{message:"Must be at least 5 charectesr"}),
    content: z.any({required_error:"Required"}),
    author: z.string({required_error:"Required"}).min(3, { message: "Must has been 3 charectes" }),
    coverPhoto: z.instanceof(File).refine(
        (file) => {
            if (file.size < 1000000) {
                return true
            }
            return false
        }
        , { message: "File required" }),
})