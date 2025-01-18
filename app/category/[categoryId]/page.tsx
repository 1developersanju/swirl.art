'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchData } from '@/lib/fetchData'
import { Product } from '@/types/products'
import { Category } from '@/types/categories'

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="bg-gray-300 animate-pulse rounded-lg p-4">
            <div className="bg-gray-400 h-48 mb-4"></div>
            <div className="bg-gray-400 h-6 w-3/4 mb-2"></div>
            <div className="bg-gray-400 h-4 w-1/2"></div>
          </div>
        ))}
    </div>
  )
}

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  const { categoryId } = params

  // Fetch products and categories
  useEffect(() => {
    const fetchDataForCategoryPage = async () => {
      try {
        const { products = [] } = await fetchData<{ products: Product[] }>('products.json')
        const { categories = [] } = await fetchData<{ categories: Category[] }>('categories.json')

        // Filter products that belong to the selected category
        const filteredProducts = products.filter(product => 
          product.category.includes(categoryId)  // Check if categoryId exists in the product's category array
        )
        setProducts(filteredProducts)

        // Set categories for display or use in other logic
        setCategories(categories)
      } catch (err) {
        setError('Failed to load products or categories')
        console.error(err)
      }
    }

    fetchDataForCategoryPage()
  }, [categoryId])  // Make sure to use categoryId here

  if (error) {
    return <div>{error}</div>
  }

  // Convert categoryId to a string to compare with category.id as a string
  const category = categories.find(c => c.id.toString() === categoryId)  // Ensure comparison with string

  // Show shimmer if category is not found
  if (!category) {
    return <Shimmer />  // Instead of showing "Category not found", show shimmer
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{category.name} Products</h1>
      <p className="text-lg mb-6">{category.description}</p>

      {products.length === 0 ? (
        // Show shimmer effect while products are loading
        <Shimmer />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
