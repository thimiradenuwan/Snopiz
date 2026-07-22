"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShieldCheck, Download, Heart, Share2, Check, Server, Network, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cartStore"
import { useRouter } from "next/navigation"
import { addToCartAction } from "@/actions/cart"
import type { Product, ProductImage } from "@prisma/client"
import Image from "next/image"
import { toast } from "sonner"

export default function ProductClient({ 
  product,
  vpnProviders = []
}: { 
  product: Omit<Product, 'createdAt'|'updatedAt'> & { createdAt: string; updatedAt: string; images: ProductImage[]; isVpn?: boolean }
  vpnProviders?: any[]
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const cart = useCartStore()
  const router = useRouter()

  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [selectedProviderId, setSelectedProviderId] = useState<string>("")
  const [selectedPackageId, setSelectedPackageId] = useState<string>("")

  const primaryImage = product.images?.[0]?.image;

  const PLANS = ["Standard", "Premium", "VIP"]

  const selectedProvider = vpnProviders.find(p => p.id === selectedProviderId)
  const selectedPackage = selectedProvider?.packages?.find((p: any) => p.id === selectedPackageId)

  const finalPrice = product.price + (selectedPackage?.priceModifier || 0)

  const isConfigComplete = !product.isVpn || (selectedPlan && selectedProviderId && selectedPackageId)

  const handleAddToCart = async () => {
    if (product.isVpn && !isConfigComplete) {
      toast.error("Please complete the configuration first")
      return
    }

    const config = product.isVpn ? {
      plan: selectedPlan,
      provider: selectedProvider?.name,
      package: selectedPackage?.name,
      duration: selectedPackage?.duration
    } : undefined;

    cart.addItem({
      id: product.id,
      title: product.title,
      price: finalPrice,
      quantity: 1,
      image: primaryImage,
      ...config
    })
    
    toast.success(`${product.title} added to cart`);

    // Call server action (will gracefully fail if not logged in)
    try {
      await addToCartAction(product.id, 1, config)
    } catch (e) {
      console.error(e)
    }
  }

  const handleBuyNow = () => {
    if (product.isVpn && !isConfigComplete) {
      toast.error("Please complete the configuration first")
      return
    }
    handleAddToCart()
    router.push("/cart") 
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/3] w-full rounded-2xl glass-panel border-border overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            {primaryImage ? (
              <Image src={primaryImage} alt={product.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-lg font-medium">
                No Image
              </div>
            )}
          </motion.div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1, 4).map((img, i) => (
                <div key={i} className="aspect-square rounded-xl glass-panel border-border overflow-hidden relative hover:border-primary/50 transition-colors cursor-pointer">
                  <Image src={img.image} alt={product.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
              Digital Product
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-foreground hover:bg-secondary rounded-full" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-foreground hover:bg-secondary rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm text-secondary-foreground underline decoration-dashed underline-offset-4 cursor-pointer hover:text-foreground transition-colors">
              (5 Reviews)
            </span>
          </div>

          <div className="text-4xl font-bold text-foreground mb-8">
            LKR {finalPrice.toFixed(2)}
          </div>

          {product.isVpn && (
            <div className="space-y-6 mb-8 p-6 glass rounded-2xl border-white/5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" /> VPN Configuration
              </h3>
              
              {/* Step 1: Plan */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-secondary-foreground">Step 1: Select Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map(plan => (
                    <button
                      key={plan}
                      onClick={() => { setSelectedPlan(plan); setSelectedProviderId(""); setSelectedPackageId(""); }}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${selectedPlan === plan ? 'bg-primary/20 border-primary text-primary' : 'border-border/50 text-muted-foreground hover:border-white/20'}`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: ISP */}
              <div className={`space-y-3 transition-opacity duration-300 ${!selectedPlan ? 'opacity-40 pointer-events-none' : ''}`}>
                <label className="text-sm font-medium text-secondary-foreground flex items-center gap-2">
                  Step 2: Select ISP <Network className="w-4 h-4" />
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {vpnProviders.map(provider => (
                    <button
                      key={provider.id}
                      onClick={() => { setSelectedProviderId(provider.id); setSelectedPackageId(""); }}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${selectedProviderId === provider.id ? 'bg-primary/20 border-primary text-primary' : 'border-border/50 text-muted-foreground hover:border-white/20'}`}
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>
                {selectedPlan && vpnProviders.length === 0 && <p className="text-xs text-red-400">No ISPs available.</p>}
              </div>

              {/* Step 3: Package */}
              <div className={`space-y-3 transition-opacity duration-300 ${!selectedProviderId ? 'opacity-40 pointer-events-none' : ''}`}>
                <label className="text-sm font-medium text-secondary-foreground flex items-center gap-2">
                  Step 3: Select Package <Package className="w-4 h-4" />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProvider?.packages?.map((pkg: any) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${selectedPackageId === pkg.id ? 'bg-primary/20 border-primary text-primary' : 'border-border/50 text-muted-foreground hover:border-white/20'}`}
                    >
                      <div className="font-semibold text-sm">{pkg.name}</div>
                      <div className="text-xs opacity-70 mt-1">{pkg.duration}</div>
                      {pkg.priceModifier > 0 && <div className="text-xs text-primary mt-1">+ LKR {pkg.priceModifier}</div>}
                    </button>
                  ))}
                </div>
                {selectedProviderId && selectedProvider?.packages?.length === 0 && <p className="text-xs text-red-400">No packages available for this ISP.</p>}
              </div>
            </div>
          )}

          <p className="text-secondary-foreground text-lg mb-8 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            <h3 className="text-foreground font-medium">Included Features:</h3>
            <ul className="space-y-3">
              {['Instant Access', 'Lifetime Updates', 'Premium Support'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-border mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" onClick={handleBuyNow} disabled={product.isVpn && !isConfigComplete} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 text-lg hover-glow group disabled:opacity-50">
              Buy Now
            </Button>
            <Button size="lg" variant="outline" onClick={handleAddToCart} disabled={product.isVpn && !isConfigComplete} className="flex-1 rounded-xl h-14 text-lg border-border glass hover:bg-secondary transition-colors text-foreground disabled:opacity-50">
              Add to Cart
            </Button>
          </div>

          <div className="glass rounded-xl p-6 border-border flex flex-col gap-4">
            <div className="flex items-center gap-3 text-secondary-foreground">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className="text-sm">Secure Stripe Payment</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-foreground">
              <Download className="w-6 h-6 text-accent" />
              <span className="text-sm">Instant Digital Delivery</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
