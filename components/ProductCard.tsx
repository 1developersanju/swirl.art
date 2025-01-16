import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image';

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
}

export default function ProductCard({ id, name, price, imageUrl, category }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden relative group">
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            width='400'
            height={400}

          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Link href={`/product/${id}`} passHref>
              <Button variant="secondary" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{category}</p>
      </CardFooter>
    </Card>
  )
}

