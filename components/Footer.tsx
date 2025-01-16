'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchData } from '@/lib/fetchData'
import { FooterData } from '@/types/footers'

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData<FooterData>('footer.json')
      .then(data => setFooterData(data))
      .catch(error => {
        console.error('Failed to fetch footer data:', error)
        setError(error instanceof Error ? error.message : String(error))
      })
  }, [])

  if (error) {
    return (
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-red-500">Error loading footer: {error}</div>
      </footer>
    )
  }

  if (!footerData) {
    return (
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">Loading footer...</div>
      </footer>
    )
  }

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About {footerData.companyInfo.name}</h3>
          <p className="text-primary-foreground/80">{footerData.companyInfo.description}</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <p className="text-primary-foreground/80 mb-2">Follow us on social media</p>
          <div className="flex space-x-4">
            {footerData.socialMedia.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
