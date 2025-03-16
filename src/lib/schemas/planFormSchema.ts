import * as z from 'zod';

// Define the validation schema using Zod
export const planFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Plan name should be at least 3 characters' })
        .max(40, { message: 'Plan name cannot exceed 40 characters' }),
    description: z
        .string()
        .optional()
        .transform((val) => val || '')
        .refine((val) => val.length <= 200, {
            message: 'Description cannot exceed 200 characters',
        }),
});
