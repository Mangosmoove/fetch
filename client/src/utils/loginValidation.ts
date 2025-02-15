import {z} from "zod"

export const loginSchema = z.object({
    name: z.string({message: "Required field"}),
    email: z.string().email({message: "Invalid email address"}),
})

export type LoginSchemaType = z.infer<typeof loginSchema>;