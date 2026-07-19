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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

import { createProduct, updateProduct } from '@/app/admin/products/actions';
import { productSchema } from '@/lib/validators/product';

type Category = {
  id: string;
  name: string;
};

type ProductFormProps = {
  categories: Category[];
  product?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    categoryId: string;
    featured: boolean;
    active: boolean;
  };
};

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: product
      ? {
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
          featured: product.featured,
          active: product.active,
        }
      : {
          title: '',
          slug: '',
          description: '',
          price: '' as any,
          categoryId: '',
          featured: false,
          active: true,
        },
  });

  const titleValue = form.watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (!product && titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
    }
  }, [titleValue, product, form]);

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsLoading(true);

    try {
      if (product) {
        const result = await updateProduct(product.id, values);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success('Product updated successfully!');
      } else {
        const result = await createProduct(values);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success('Product created successfully!');
      }
      
      router.push('/admin/products');
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
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
                <Input placeholder="product-slug" {...field} />
              </FormControl>
              <FormDescription>
                Auto-generated from title, but can be customized.
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
                  placeholder="Tell us a little bit about this product" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="99.99" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    Feature this product on the home page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Make this product available for purchase.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : product ? 'Save Changes' : 'Create Product'}
        </Button>
      </form>
    </Form>
  );
}
