export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string[];  // Now an array of numbers to allow multiple categories
  tags: string[];
  modelUrl: string;
}
