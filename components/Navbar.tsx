"use client";

import { useState } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  NavigationMenu,
  // NavigationMenuItem,
  // NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User,  } from "lucide-react";

// const NavLink = ({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <NavigationMenuItem>
//       <NavigationMenuLink
//         href={href}
//         className={`block py-2 px-4 text-sm transition-colors hover:text-primary ${
//           isActive ? "text-primary font-semibold" : "text-gray-600"
//         }`}
//       >
//         {children}
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, 
    // setIsMenuOpen
    ] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <SidebarTrigger />
          <Link href="/" className="text-2xl font-bold text-primary ml-4">
            Swrilsart
          </Link>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            {/* <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/products"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            All Products
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover our full range of unique items
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <NavLink href="/products/3d-designs">3D Designs</NavLink>
                    <NavLink href="/products/custom">Custom Products</NavLink>
                    <NavLink href="/products/ready-made">Ready-Made Products</NavLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </NavigationMenuList> */}
          </NavigationMenu>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button onClick={logout} variant="ghost">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
        {/* <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div> */}
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <NavigationMenu className="w-full">
            {/* <NavigationMenuList className="flex flex-col w-full">
              <NavLink href="/products">All Products</NavLink>
              <NavLink href="/products/3d-designs">3D Designs</NavLink>
              <NavLink href="/products/custom">Custom Products</NavLink>
              <NavLink href="/products/ready-made">Ready-Made Products</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/cart">Cart</NavLink>
              {isAuthenticated ? (
                <NavigationMenuItem>
                  <Button onClick={logout} variant="ghost" className="w-full justify-start">Logout</Button>
                </NavigationMenuItem>
              ) : (
                <NavLink href="/login">Login</NavLink>
              )}
            </NavigationMenuList> */}
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}
