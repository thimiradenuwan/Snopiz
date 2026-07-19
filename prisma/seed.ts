import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    {
      name: "V2Ray VPN",
      description: "Premium secure VPN plans with instant activation.",
      slug: "v2ray-vpn",
    },
    {
      name: "Softwares & Apps",
      description: "Premium software licenses and useful applications.",
      slug: "software",
    },
    {
      name: "Game Cheats",
      description: "Premium undetected gaming tools and cheats.",
      slug: "game-cheat",
    },
    {
      name: "Other Items",
      description: "More premium digital products and services.",
      slug: "other",
    }
  ]

  console.log(`Start seeding ...`)
  for (const c of categories) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    })
    console.log(`Created category with id: ${category.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
