import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image';

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            width='400'
            height={400}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-6">
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        <Link href={`/product/${id}`} passHref className="w-full mt-2">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

