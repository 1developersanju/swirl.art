import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Swrilsart</h1>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg mb-6">
            Swrilsart is a premier destination for unique, custom-made, and 3D-designed products. Our passion lies in bringing innovative designs to life and offering personalized creations that reflect your individual style.
          </p>
          <p className="text-lg mb-6">
            Founded in 2023, we&apos;ve quickly become a leader in combining traditional craftsmanship with cutting-edge technology. Our team of skilled artisans and designers work tirelessly to create products that are not just functional, but also works of art.
          </p>
          <p className="text-lg mb-6">
            At Swrilsart, we believe that every product tells a story. Whether it&apos;s a 3D-printed sculpture, a custom-engraved pendant, or a handcrafted wooden clock, each item is imbued with creativity, quality, and care.
          </p>
          <Button asChild>
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/placeholder.svg" 
            alt="Swrilsart workshop" 
            className="absolute inset-0 w-full h-full object-cover"
            width='600'
            height={400}

          />
        </div>
      </div>
    </div>
  )
}

