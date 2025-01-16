import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchData } from '@/lib/fetchData'
import { Product } from '@/types/products'

async function ReadyMadeProductList() {
  try {
    const { products = [] } = await fetchData<{ products: Product[] }>('products.json')
    const readyMadeProducts = products.filter(product => product.category === 'Ready-Made Products')

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {readyMadeProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Failed to load ready-made products:', error);
    return <div>Failed to load ready-made products. Please try again later.</div>;
  }
}

export default function ReadyMadeProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Ready-Made Products</h1>
      <Suspense fallback={<div>Loading ready-made products...</div>}>
        <ReadyMadeProductList />
      </Suspense>
    </div>
  )
}

