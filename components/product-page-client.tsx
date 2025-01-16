'use client';

import { useState } from "react";
import ProductViewer from "@/components/product-viewer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, HeartOff } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/products";

export default function ProductPageClient({ product }: { product: Product }) {
  const { addItem, removeItem, isInCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCartToggle = () => {
    if (isInCart(product.id)) {
      removeItem(product.id);
      removeFromWishlist(product.id); // Ensure the item is removed from the wishlist too
    } else {
      addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 });
      addToWishlist(product.id); // Optionally, add to the wishlist when added to cart
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(`I'm interested in purchasing the ${product.name}. Can you provide more information?`);
    window.open(`https://wa.me/7339629247?text=${message}`, '_blank');
  };

  const handleCustomizationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customizationDetails = Object.fromEntries(formData.entries());
    console.log('Customization details:', customizationDetails);
    setIsCustomizing(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full max-w-2xl mx-auto">
          <ProductViewer
            productUrl={
              product.modelUrl ||
              "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb"
            }
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
          <p className="text-xl sm:text-2xl mb-6 text-gray-700">${product.price.toFixed(2)}</p>
          <p className="mb-8 text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={handleWhatsAppRedirect} className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order via WhatsApp
            </Button>
            <Button onClick={handleCartToggle} variant="outline" className="flex-1">
              {isInCart(product.id) ? (
                <HeartOff className="w-4 h-4 mr-2" />
              ) : (
                <ShoppingCart className="w-4 h-4 mr-2" />
              )}
              {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </Button>
          </div>
          <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Request Customization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Customize Your Product</DialogTitle>
                <DialogDescription>
                  Provide details for your custom {product.name}. Our team will contact you with a quote.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCustomizationSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="color">Preferred Color</Label>
                  <Input id="color" name="color" placeholder="e.g., Blue, Red, Green" />
                </div>
                <div>
                  <Label htmlFor="size">Size (in inches)</Label>
                  <Input id="size" name="size" type="number" placeholder="e.g., 12" />
                </div>
                <div>
                  <Label htmlFor="details">Additional Details</Label>
                  <Input id="details" name="details" placeholder="Any specific requirements?" />
                </div>
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
