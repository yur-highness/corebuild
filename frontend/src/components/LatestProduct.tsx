import { ProductCard } from "@/components/ProductCard";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Product {
  _id: number;
  name: string;
  category: string;
  price: string;
  originalPrice: string | null;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
  variants: string[];
}


export const LatestProducts = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);
      if (response.data.success) {
       
        setProductsList(response.data.products);
      } else {
        toast.error("Failed to fetch products", {
          description: response.data.message,
        });
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  });

  return (
    <section className="py-16 px-4 bg-linear-to-r from-slate-900/50 to-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Arrivals</h2>
          <p className="text-gray-300 text-lg">Check out our newest hardware components</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};