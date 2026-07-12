import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="glass-panel p-10 rounded-3xl border-white/10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-secondary-foreground">Sign in to your Snopiz account</p>
        </div>

        <form 
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
          className="space-y-4 mb-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <Input 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              className="glass border-white/10 h-12 rounded-xl bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-white">Password</label>
              <Link href="/reset-password" className="text-xs text-primary hover:text-accent transition-colors">Forgot password?</Link>
            </div>
            <Input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="glass border-white/10 h-12 rounded-xl bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 text-md hover-glow">
            Sign In
          </Button>
        </form>

        <div className="relative my-6">
          <Separator className="bg-white/10" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-[#0D1320] px-2 text-xs text-muted-foreground uppercase tracking-widest">Or</span>
        </div>

        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <Button type="submit" variant="outline" className="w-full glass border-white/10 hover:bg-white/5 text-white rounded-xl h-12 text-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true"><path d="M12.0003 11.9998V15.5298H17.8223C17.5703 17.0788 16.3263 19.3408 12.0003 19.3408C7.94031 19.3408 4.63631 16.0368 4.63631 11.9998C4.63631 7.96283 7.94031 4.65883 12.0003 4.65883C14.2883 4.65883 15.8263 5.63383 16.6913 6.45283L19.2973 3.84683C17.3913 2.06883 14.9353 0.999832 12.0003 0.999832C5.92531 0.999832 1.00031 5.92483 1.00031 11.9998C1.00031 18.0748 5.92531 22.9998 12.0003 22.9998C18.3463 22.9998 22.6103 18.5298 22.6103 12.1868C22.6103 11.4588 22.5403 10.8258 22.4283 10.2228H12.0003V11.9998Z" fill="currentColor"></path></svg>
            Continue with Google
          </Button>
        </form>

        <p className="text-center text-sm text-secondary-foreground mt-8">
          Don&apos;t have an account? <Link href="/register" className="text-primary hover:text-accent font-medium transition-colors">Register</Link>
        </p>
      </div>
    </div>
  )
}
