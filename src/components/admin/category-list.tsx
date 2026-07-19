'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteCategoryButton } from '@/components/admin/delete-category-button';
import { updateCategoryOrder } from '@/app/admin/categories/actions';
import { toast } from 'sonner';

interface CategoryListProps {
  initialCategories: any[];
}

function SortableCategoryRow({ category }: { category: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? 'bg-muted/50' : ''}>
      <TableCell className="w-12">
        <Button variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{category.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{category.slug}</TableCell>
      <TableCell>
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {category._count?.products || 0} products
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Link href={`/admin/categories/${category.id}/edit`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Edit
          </Link>
          <DeleteCategoryButton id={category.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const [categories, setCategories] = useState(initialCategories);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id);
      const newIndex = categories.findIndex((c) => c.id === over.id);

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      // Save new order to db
      const items = newCategories.map((c, index) => ({ id: c.id, order: index }));
      const res = await updateCategoryOrder(items);
      if (res.success) {
        toast.success('Category order updated');
      } else {
        toast.error(res.error || 'Failed to update order');
        // Revert on failure
        setCategories(categories);
      }
    }
  }

  return (
    <DndContext
      id="category-list-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Products Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={categories.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {categories.map((category) => (
              <SortableCategoryRow key={category.id} category={category} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
