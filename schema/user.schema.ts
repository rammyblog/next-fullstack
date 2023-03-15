import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'name is required').max(100),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must have more than 4 characters'),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
