"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Providers
export async function createVpnProvider(data: { name: string, slug: string, active: boolean, order: number }) {
  try {
    const res = await prisma.vpnProvider.create({ data })
    revalidatePath('/admin/vpn-providers')
    return { success: true, data: res }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function updateVpnProvider(id: string, data: { name: string, slug: string, active: boolean, order: number }) {
  try {
    const res = await prisma.vpnProvider.update({ where: { id }, data })
    revalidatePath('/admin/vpn-providers')
    return { success: true, data: res }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function deleteVpnProvider(id: string) {
  try {
    await prisma.vpnProvider.delete({ where: { id } })
    revalidatePath('/admin/vpn-providers')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}

// Packages
export async function createVpnPackage(data: { name: string, duration: string, priceModifier: number, active: boolean, order: number, providerId: string }) {
  try {
    const res = await prisma.vpnPackage.create({ data })
    revalidatePath('/admin/vpn-packages')
    return { success: true, data: res }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function updateVpnPackage(id: string, data: { name: string, duration: string, priceModifier: number, active: boolean, order: number, providerId: string }) {
  try {
    const res = await prisma.vpnPackage.update({ where: { id }, data })
    revalidatePath('/admin/vpn-packages')
    return { success: true, data: res }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function deleteVpnPackage(id: string) {
  try {
    await prisma.vpnPackage.delete({ where: { id } })
    revalidatePath('/admin/vpn-packages')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}
