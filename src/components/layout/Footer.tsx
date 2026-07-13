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
            <h4 className="text-foreground font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/digital" className="hover:text-foreground transition-colors">Digital Goods</Link></li>
              <li><Link href="/trending" className="hover:text-foreground transition-colors">Trending</Link></li>
              <li><Link href="/deals" className="hover:text-foreground transition-colors">Flash Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
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
