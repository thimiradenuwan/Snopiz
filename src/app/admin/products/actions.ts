'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { productSchema } from '@/lib/validators/product';

export async function createProduct(data: z.infer<typeof productSchema>) {
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || 'Validation failed' };
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: result.data.slug },
    });
    
    if (existingProduct) {
      return { success: false, error: 'Product with this slug already exists.' };
    }

    const product = await prisma.product.create({
      data: result.data,
    });

    revalidatePath('/admin/products');
    return { success: true, product };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product. Please try again.' };
  }
}

export async function updateProduct(id: string, data: z.infer<typeof productSchema>) {
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || 'Validation failed' };
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: result.data.slug },
    });
    
    if (existingProduct && existingProduct.id !== id) {
      return { success: false, error: 'Another product with this slug already exists.' };
    }

    const product = await prisma.product.update({
      where: { id },
      data: result.data,
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}/edit`);
    return { success: true, product };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product. Please try again.' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product. Please try again.' };
  }
}

export async function updateProductOrder(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.product.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product order:', error);
    return { success: false, error: 'Failed to update order. Please try again.' };
  }
}
