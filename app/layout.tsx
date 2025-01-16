import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../components/providers'
import Navbar from '@/components/Navbar'
import { AppSidebar } from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Swrilsart | Unique Custom Products',
  description: 'Discover a world of unique custom and ready-made products at Swrilsart',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </main>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}

