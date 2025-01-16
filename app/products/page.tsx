import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchData } from '@/lib/fetchData'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
}

async function ProductList() {
  try {
    const { products = [] }: { products: Product[] } = await fetchData('products.json')

    if (!Array.isArray(products)) {
      throw new Error('Invalid products data');
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Failed to load products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  )
}
