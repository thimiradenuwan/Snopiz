import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  categoryId: z.string().min(1, 'Category is required'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});
