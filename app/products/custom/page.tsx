import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchData } from '@/lib/fetchData'
import { Product } from '@/types/products'

async function CustomProductList() {
  try {
    const { products = [] } = await fetchData<{ products: Product[] }>('products.json')
    const customProducts = products.filter(product => product.category === 'Custom Products')

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {customProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Failed to load custom products:', error);
    return <div>Failed to load custom products. Please try again later.</div>;
  }
}

export default function CustomProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Custom Products</h1>
      <Suspense fallback={<div>Loading custom products...</div>}>
        <CustomProductList />
      </Suspense>
    </div>
  )
}

