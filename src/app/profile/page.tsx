import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileClient from "./ProfileClient"

export default async function ProfilePageServer() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true,
      image: true,
    }
  })

  if (!user) {
    redirect("/login")
  }

  return <ProfileClient user={user} />
}
