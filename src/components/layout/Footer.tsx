import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-xl mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-semibold tracking-tighter text-foreground">
              Snopiz<span className="text-[#1ED1CD]">.com</span>
            </Link>
            <p className="text-secondary-foreground text-sm max-w-xs">
              Premium digital products and small fantastic items. Apple-quality design for a luxury shopping experience.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground font-medium mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/products/v2ray-vpn" className="hover:text-foreground transition-colors">V2Ray VPN</Link></li>
              <li><Link href="/products/software" className="hover:text-foreground transition-colors">Software & Apps</Link></li>
              <li><Link href="/products/game-cheat" className="hover:text-foreground transition-colors">Game Cheats</Link></li>
              <li><Link href="/products/other" className="hover:text-foreground transition-colors">Other Items</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="https://discord.gg/snopiz" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Discord</Link></li>
              <li><Link href="https://t.me/snopiz" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Telegram</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/why-choose" className="hover:text-foreground transition-colors">Why Choose Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-secondary-foreground">
          <p>© {new Date().getFullYear()} Snopiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
