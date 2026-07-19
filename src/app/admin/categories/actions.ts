'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { categorySchema } from '@/lib/validators/category';

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || 'Validation failed' };
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: result.data.slug },
    });
    
    if (existingCategory) {
      return { success: false, error: 'Category with this slug already exists.' };
    }

    const category = await prisma.category.create({
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description || null,
        image: result.data.image || null,
      },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/products', 'layout');
    return { success: true, category };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Failed to create category. Please try again.' };
  }
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || 'Validation failed' };
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: result.data.slug },
    });
    
    if (existingCategory && existingCategory.id !== id) {
      return { success: false, error: 'Another category with this slug already exists.' };
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description || null,
        image: result.data.image || null,
      },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/products', 'layout');
    return { success: true, category };
  } catch (error: any) {
    console.error('Error updating category:', error);
    return { success: false, error: 'Failed to update category. Please try again.' };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Delete all products in this category first
    await prisma.product.deleteMany({
      where: { categoryId: id }
    });

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/products', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'Failed to delete category. Please try again.' };
  }
}

export async function updateCategoryOrder(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.category.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath('/admin', 'layout');
    revalidatePath('/products', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating category order:', error);
    return { success: false, error: 'Failed to update category order.' };
  }
}
