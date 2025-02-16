import {z} from 'zod';

export const filterSchema = z.object({
    // ageMin: z.string().optional().regex(/^\d*$/, 'Age must be a number'),
    // ageMax: z.string().optional().regex(/^\d*$/, 'Age must be a number'),
});

export type filterSchemaType = z.infer<typeof filterSchema>;