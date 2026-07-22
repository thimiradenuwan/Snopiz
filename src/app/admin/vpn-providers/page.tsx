import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { VpnProviderList } from '@/components/admin/vpn-provider-list';

export const dynamic = 'force-dynamic';

export default async function VpnProvidersPage() {
  const providers = await prisma.vpnProvider.findMany({
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">VPN Providers</h1>
          <p className="text-muted-foreground mt-2">Manage ISPs and VPN Providers.</p>
        </div>
        <Link href="/admin/vpn-providers/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" /> Add Provider
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {providers.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-foreground mb-1">No providers found</h3>
            <p className="text-muted-foreground max-w-sm">
              You haven't added any VPN providers yet.
            </p>
            <Link href="/admin/vpn-providers/new" className={buttonVariants({ variant: "outline", className: "mt-4" })}>
              Create your first provider
            </Link>
          </div>
        ) : (
          <VpnProviderList initialProviders={providers} />
        )}
      </div>
    </div>
  );
}
