'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { createCategory, updateCategory } from '@/app/admin/categories/actions';
import { categorySchema } from '@/lib/validators/category';

type CategoryFormProps = {
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
  };
};

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: category
      ? {
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          image: category.image || '',
        }
      : {
          name: '',
          slug: '',
          description: '',
          image: '',
        },
  });

  const nameValue = form.watch('name');

  // Auto-generate slug from name
  useEffect(() => {
    if (!category && nameValue) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
    }
  }, [nameValue, category, form]);

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setIsLoading(true);

    try {
      if (category) {
        const result = await updateCategory(category.id, values);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success('Category updated successfully!');
      } else {
        const result = await createCategory(values);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success('Category created successfully!');
      }
      
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="category-slug" {...field} />
              </FormControl>
              <FormDescription>
                Auto-generated from name, but can be customized. Must be unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a little bit about this category" 
                  className="resize-none" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : category ? 'Save Changes' : 'Create Category'}
        </Button>
      </form>
    </Form>
  );
}
