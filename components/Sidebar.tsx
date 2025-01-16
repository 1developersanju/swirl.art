'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ShoppingCart, User, Home, Box, Paintbrush, Package, Info, Phone } from 'lucide-react'
import { fetchData } from '@/lib/fetchData'
import { SbMenuItem } from '@/types/sidebar'

const icons: { [key: string]: React.ElementType } = {
  Home,
  Box,
  Paintbrush,
  Package,
  Info,
  Phone,
  ShoppingCart,
  User
}

const NavLink = ({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const Icon = icons[icon] || Box

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>
          <Icon className="mr-2 h-4 w-4" />
          <span>{children}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const { isAuthenticated, logout } = useAuthStore()
  const [menuItems, setMenuItems] = useState<SbMenuItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData<{ menuItems: SbMenuItem[] }>('sidebar-menu.json')
      .then(data => setMenuItems(data.menuItems || []))
      .catch(error => {
        console.error('Failed to fetch sidebar menu:', error)
        setError(error instanceof Error ? error.message : String(error))
      })
  }, [])

  if (error) {
    return (
      <Sidebar>
        <SidebarContent>
          <div className="p-4 text-red-500">Error loading sidebar menu: {error}</div>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2">
          <span className="text-2xl font-bold">Swrilsart</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(item => (
            <NavLink key={item.id} href={item.link} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated ? (
          <Button onClick={logout} variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Logout
          </Button>
        ) : (
          <NavLink href="/login" icon="User">Login</NavLink>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

