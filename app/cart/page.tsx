'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Eye, Paintbrush } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

type CustomizationDetails = {
  [key: string]: {
    color: string;
    size: string;
    details: string;
  }
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [customizations, setCustomizations] = useState<CustomizationDetails>({})
  const [customizingItemId, setCustomizingItemId] = useState<string | null>(null)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const savedCustomizations = localStorage.getItem('cartCustomizations')
    if (savedCustomizations) {
      setCustomizations(JSON.parse(savedCustomizations))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartCustomizations', JSON.stringify(customizations))
  }, [customizations])

  const handleCustomizationSubmit = (e: React.FormEvent<HTMLFormElement>, itemId: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const customizationDetails = {
      color: formData.get('color') as string,
      size: formData.get('size') as string,
      details: formData.get('details') as string,
    }
    setCustomizations(prev => ({ ...prev, [itemId]: customizationDetails }))
    setCustomizingItemId(null)
    toast({
      title: "Customization Saved",
      description: "Your customization details have been saved for this item.",
    })
  }

  const handleWhatsAppCheckout = () => {
    let message = "I&apos;d like to place an order for the following items:\n\n"
    items.forEach(item => {
      message += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`
      if (customizations[item.id]) {
        const customization = customizations[item.id]
        message += `   Customization: Color: ${customization.color}, Size: ${customization.size}, Details: ${customization.details}\n`
      }
      message += '\n'
    })
    message += `\nTotal: $${total.toFixed(2)}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/7339629247?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start justify-between border-b pb-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  {customizations[item.id] && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Color: {customizations[item.id].color}</p>
                      <p>Size: {customizations[item.id].size}</p>
                      <p>Details: {customizations[item.id].details}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-20"
                  />
                  <Link href={`/product/${item.id}`}>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Dialog open={customizingItemId === item.id} onOpenChange={(open) => setCustomizingItemId(open ? item.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Paintbrush className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Customize {item.name}</DialogTitle>
                        <DialogDescription>
                          Provide details for your custom {item.name}. Our team will contact you with a quote.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => handleCustomizationSubmit(e, item.id)} className="space-y-4">
                        <div>
                          <Label htmlFor="color">Preferred Color</Label>
                          <Input id="color" name="color" placeholder="e.g., Blue, Red, Green" defaultValue={customizations[item.id]?.color || ''} />
                        </div>
                        <div>
                          <Label htmlFor="size">Size (in inches)</Label>
                          <Input id="size" name="size" type="number" placeholder="e.g., 12" defaultValue={customizations[item.id]?.size || ''} />
                        </div>
                        <div>
                          <Label htmlFor="details">Additional Details</Label>
                          <Textarea id="details" name="details" placeholder="Any specific requirements?" defaultValue={customizations[item.id]?.details || ''} />
                        </div>
                        <Button type="submit" className="w-full">Submit Request</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xl font-semibold mb-4 sm:mb-0">Total: ${total.toFixed(2)}</p>
            <div className="space-x-4">
              <Button onClick={handleWhatsAppCheckout} className="mb-2 sm:mb-0">Checkout via WhatsApp</Button>
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

