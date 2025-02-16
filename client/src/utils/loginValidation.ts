import {z} from "zod"

export const loginSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
})

export type LoginSchemaType = z.infer<typeof loginSchema>;