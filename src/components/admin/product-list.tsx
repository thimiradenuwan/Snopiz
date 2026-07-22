'use client';

import { useState, useEffect } from 'react';
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
import { DeleteProductButton } from '@/components/admin/delete-product-button';
import { updateProductOrder } from '@/app/admin/products/actions';
import { toast } from 'sonner';

interface ProductListProps {
  initialProducts: any[];
  enableDrag?: boolean;
}

function SortableProductRow({ product, enableDrag }: { product: any; enableDrag?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? 'bg-muted/50' : ''}>
      <TableCell className="w-12">
        {enableDrag ? (
          <Button variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        ) : null}
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{product.title}</span>
          <span className="text-xs text-muted-foreground">{product.slug}</span>
        </div>
      </TableCell>
      <TableCell>{product.category?.name}</TableCell>
      <TableCell>LKR {product.price.toFixed(2)}</TableCell>
      <TableCell>
        {product.active ? (
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-muted/50 px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
            Draft
          </span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Link href={`/admin/products/${product.id}/edit`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Edit
          </Link>
          <DeleteProductButton id={product.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ProductList({ initialProducts, enableDrag }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id);
      const newIndex = products.findIndex((p) => p.id === over.id);

      const newProducts = arrayMove(products, oldIndex, newIndex);
      setProducts(newProducts);

      // Save new order to db
      const items = newProducts.map((p, index) => ({ id: p.id, order: index }));
      const res = await updateProductOrder(items);
      if (res.success) {
        toast.success('Product order updated');
      } else {
        toast.error(res.error || 'Failed to update order');
        // Revert on failure
        setProducts(products);
      }
    }
  }

  return (
    <DndContext
      id="product-list-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={products.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {products.map((product) => (
              <SortableProductRow key={product.id} product={product} enableDrag={enableDrag} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
