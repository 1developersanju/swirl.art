'use client'

import { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Review {
  author_name: string
  rating: number
  text: string
  time: number
}

// Dummy reviews data
const dummyReviews: Review[] = [
  {
    author_name: "John Doe",
    rating: 5,
    text: "Absolutely love the custom vase I ordered! The attention to detail is amazing.",
    time: 1625097600 // July 1, 2021
  },
  {
    author_name: "Jane Smith",
    rating: 4,
    text: "Great quality products. The 3D printed items are truly unique.",
    time: 1627776000 // August 1, 2021
  },
  {
    author_name: "Mike Johnson",
    rating: 5,
    text: "Exceptional customer service. They went above and beyond to meet my requirements.",
    time: 1630454400 // September 1, 2021
  },
  {
    author_name: "Emily Brown",
    rating: 4,
    text: "Beautiful designs and high-quality materials. Slightly pricey but worth it.",
    time: 1633046400 // October 1, 2021
  },
  {
    author_name: "Chris Lee",
    rating: 5,
    text: "The customization options are fantastic. I got exactly what I wanted!",
    time: 1635724800 // November 1, 2021
  }
]

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate an API call with a slight delay
    const timer = setTimeout(() => {
      try {
        setReviews(dummyReviews)
      } catch (error) {
        console.error('Error loading reviews:', error)
        setError('Failed to load reviews. Please try again later.')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (reviews.length === 0) {
    return <p>Loading reviews...</p>
  }

  return (
    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-center mb-4">{review.text}</p>
                <p className="font-semibold">{review.author_name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

