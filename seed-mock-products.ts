import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryData = {
  "v2ray-vpn": {
    title: "V2Ray VPN",
    description: "Premium secure VPN plans with instant activation and zero logging.",
    products: [
      { id: "v2ray-1m", name: "V2Ray Premium 1 Month", price: 5.99, slug: "v2ray-premium-1-month" },
      { id: "v2ray-3m", name: "V2Ray Premium 3 Months", price: 14.99, slug: "v2ray-premium-3-months" },
      { id: "v2ray-1y", name: "V2Ray Premium 1 Year", price: 49.99, slug: "v2ray-premium-1-year" },
    ]
  },
  "software": {
    title: "Softwares & Apps",
    description: "Premium software licenses and useful applications for productivity and creativity.",
    products: [
      { id: "soft-1", name: "Adobe Creative Cloud 1Y", price: 89.99, slug: "adobe-creative-cloud-1y" },
      { id: "soft-2", name: "Microsoft Office 365 Pro", price: 29.99, slug: "microsoft-office-365-pro" },
      { id: "soft-3", name: "Windows 11 Pro Key", price: 15.99, slug: "windows-11-pro-key" },
    ]
  },
  "game-cheat": {
    title: "Game Cheats",
    description: "Premium undetected gaming tools and cheats for competitive edge.",
    products: [
      { id: "game-1", name: "Valorant Premium Aimbot", price: 35.00, slug: "valorant-premium-aimbot" },
      { id: "game-2", name: "CS2 Undetected VIP", price: 25.00, slug: "cs2-undetected-vip" },
      { id: "game-3", name: "Warzone Esp & Radar", price: 40.00, slug: "warzone-esp-radar" },
    ]
  },
  "other": {
    title: "Other Items",
    description: "More premium digital products, accounts, and exclusive services.",
    products: [
      { id: "other-1", name: "Netflix Premium 1 Month", price: 4.99, slug: "netflix-premium-1-month" },
      { id: "other-2", name: "Spotify Premium 1 Year", price: 20.00, slug: "spotify-premium-1-year" },
      { id: "other-3", name: "ChatGPT Plus 1 Month", price: 12.99, slug: "chatgpt-plus-1-month" },
    ]
  }
};

async function main() {
  for (const [slug, data] of Object.entries(categoryData)) {
    // Upsert Category
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: data.title,
        slug: slug,
        description: data.description,
      }
    });

    for (const prod of data.products) {
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {},
        create: {
          title: prod.name,
          slug: prod.slug,
          description: data.description,
          price: prod.price,
          categoryId: category.id,
          active: true,
        }
      });
    }
  }

  console.log("Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
