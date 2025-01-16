import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchData } from "@/lib/fetchData";
import Image from "next/image";
import { Banner } from "@/types/banners";
import { Product } from "@/types/products";

async function HeroCarousel() {
  try {
    const { banners = [] } = await fetchData<{ banners: Banner[] }>(
      "/hero-carousel.json"
    );

    return (
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {banners
            .sort((a, b) => a.order - b.order)
            .map((promo) => (
              <CarouselItem key={promo.id}>
                <div className="relative h-[400px] md:h-[600px] transition-all duration-300 transform hover:scale-[1.02]">
                  <Image
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover rounded-lg"
                    width="400"
                    height={400}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-center text-white p-6">
                      <h2 className="text-4xl font-bold mb-4">{promo.title}</h2>
                      <p className="text-xl mb-8">{promo.description}</p>
                      <Button asChild size="lg">
                        <Link href={promo.link}>{promo.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  } catch (error) {
    console.error("Failed to load hero carousel:", error);
    return (
      <div className="text-red-500 p-4">
        Error loading hero carousel:{" "}
        {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
}

async function FeaturedProducts() {
  try {
    const { products = [] } = await fetchData<{ products: Product[] }>(
      "products.json"
    );
    const featuredProducts = products.slice(0, 4);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to load featured products:", error);
    return (
      <div className="text-red-500 p-4">
        Error loading featured products:{" "}
        {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
}

export default function Home() {
  return (
    <div className="bg-background">
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Suspense fallback={<div>Loading hero carousel...</div>}>
            <HeroCarousel />
          </Suspense>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured Products
          </h2>
          <Suspense fallback={<div>Loading featured products...</div>}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-secondary-foreground">
            Customize Your Perfect Product
          </h2>
          <p className="text-xl mb-8 text-secondary-foreground/80 max-w-2xl mx-auto">
            From 3D designs to personalized engravings, we offer a wide range of
            customization options to make your product truly unique.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/custom">Start Designing</Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Swrilsart?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Unique Designs</h3>
              <p className="text-muted-foreground">
                Our products stand out with their innovative and eye-catching
                designs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Quality Craftsmanship
              </h3>
              <p className="text-muted-foreground">
                Each item is crafted with attention to detail and high-quality
                materials.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Personalized Service
              </h3>
              <p className="text-muted-foreground">
                Our team is dedicated to helping you find or create the perfect
                product.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
