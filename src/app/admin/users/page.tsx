export default function UsersPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-2">Manage customer accounts and administrative roles.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Feature Under Development</h3>
        <p className="text-muted-foreground max-w-sm">
          The user management interface is currently being built. Check back soon for updates.
        </p>
      </div>
    </div>
  );
}
