"use server"
import z from 'zod';
import { loginSchema } from '../../../../schemas';

export const login = async (data: z.infer<typeof loginSchema>) => {
    console.log(data)
    const validatedFields = loginSchema.safeParse(data)
    if (!validatedFields.success) {
        return {error : "Invalid Fields"}
    }
    return {success : "Email sent"}
}; 