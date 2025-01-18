'use client'

import React from 'react'; // Import React to avoid the error
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Use next/navigation
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
import { Category } from '@/types/categories';

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
  const Icon = icons[icon] || Box // Fallback to Box if no match

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
  const [categories, setCategories] = useState<Category[]>([]) // State to store categories
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch sidebar menu items
    fetchData<{ menuItems: SbMenuItem[] }>('sidebar-menu.json')
      .then(data => setMenuItems(data.menuItems || []))
      .catch(error => {
        console.error('Failed to fetch sidebar menu:', error)
        setError(error instanceof Error ? error.message : String(error))
      })

    // Fetch categories for sub-menu under "All Products"
    fetchData<{ categories: Category[] }>('categories.json')
      .then(data => setCategories(data.categories || []))
      .catch(error => {
        console.error('Failed to fetch categories:', error)
        setError(error instanceof Error ? error.message : String(error))
      })
  }, [])

  if (error) {
    return (
      <Sidebar>
        <SidebarContent>
          <div className="p-4 text-red-500">Error loading sidebar: {error}</div>
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
          {/* Render main menu items */}
          {menuItems.map(item => (
            item.id === "all-products" ? (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={item.link}>
                    {React.createElement(icons[item.icon] || Box, { className: "mr-2 h-4 w-4" })}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
                {/* Render categories as sub-items under "All Products" */}
                <SidebarMenu>
                  {categories.map(category => (
                    <NavLink key={category.id} href={category.link} icon="Box">
                      {category.name}
                    </NavLink>
                  ))}
                </SidebarMenu>
              </SidebarMenuItem>
            ) : (
              <NavLink key={item.id} href={item.link} icon={item.icon}>
                {item.label}
              </NavLink>
            )
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