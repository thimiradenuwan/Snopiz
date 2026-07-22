import { prisma } from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2">View and manage customer orders and configurations.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-foreground mb-1">No orders found</h3>
            <p className="text-muted-foreground">You haven't received any orders yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items / Configuration</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-border/50">
                  <TableCell className="font-medium text-xs">
                    {order.id.slice(-8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {order.user?.name || order.user?.email || "Guest"}
                  </TableCell>
                  <TableCell className="font-bold">LKR {order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 ring-1 ring-inset ring-blue-500/20">
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="text-sm p-2 rounded-md bg-white/5 border border-white/5">
                          <div className="font-semibold">{item.product?.title || "Unknown Product"}</div>
                          {(item.plan || item.provider || item.package) && (
                            <div className="mt-1 flex flex-wrap gap-1 text-xs text-secondary-foreground">
                              {item.plan && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">{item.plan}</span>}
                              {item.provider && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">{item.provider}</span>}
                              {item.package && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">{item.package}</span>}
                              {item.duration && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">{item.duration}</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
