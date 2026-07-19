export default function OrdersPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-2">View and manage customer orders and fulfillments.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Feature Under Development</h3>
        <p className="text-muted-foreground max-w-sm">
          The order management interface is currently being built. Check back soon for updates.
        </p>
      </div>
    </div>
  );
}
