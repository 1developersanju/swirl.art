import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchData } from '@/lib/fetchData'
import { Product } from '@/types/products'

async function ThreeDProductList() {
  try {
    const { products = [] } = await fetchData<{ products: Product[] }>('products.json')
    const threeDProducts = products.filter(product => product.category === '3D Designs')

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {threeDProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Failed to load 3D designs:', error);
    return <div>Failed to load 3D designs. Please try again later.</div>;
  }
}

export default function ThreeDDesignsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">3D Designs</h1>
      <Suspense fallback={<div>Loading 3D designs...</div>}>
        <ThreeDProductList />
      </Suspense>
    </div>
  )
}

