import { notFound } from "next/navigation";
import ProductPageClient from "@/components/product-page-client";
import { fetchData } from "@/lib/fetchData";
import { Product } from "@/types/products";

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const { products = [] } = await fetchData<{ products: Product[] }>("products.json");
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      notFound();
    }

    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error("Failed to load product:", error);
    return <div>Failed to load product. Please try again later.</div>;
  }
}
