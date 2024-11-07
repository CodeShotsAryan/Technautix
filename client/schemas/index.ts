import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password : z.string().min(8,"Password must be atleast 8 characters long ")

})

export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password : z.string().min(8,"Password must be atleast 8 characets long "),
    confirmPassword : z.string().min(8,"Password must be atleast 8 characters long")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path :["confirmPassword"],
})

