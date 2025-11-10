import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/CategoryContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Product {
  id: number;
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
export const CategoryNav = () => {
  const { activeCategory, setActiveCategory } = useCategory();
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
  },[]);


  return (
    <section className="py-8 px-4 border-b border-white/10 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {productsList.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.category ? "default" : "ghost"}
              className={
                activeCategory === category.name
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }
              onClick={() => setActiveCategory(category.category)}
            >
              {category.category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
