
import { ProductCard } from "../components/ProductCard";
import { useCategory } from "@/context/CategoryContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";




interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
  variants: string;
}


export const ProductGrid = () => {
  const { activeCategory } = useCategory();
    const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${backendUrl}/api/products/list`);
    if(response.data.success){
      setProductsList(response.data.products);
    }
    else{
      console.error(response.data.message);
      toast.error("Failed to fetch orders", { description: response.data.message });
      
    }

  } 
  catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders", { description: "An error occurred while fetching orders."});
  }
}

useEffect(() => {
  fetchProducts();
}, []);

  
  const filteredProducts = activeCategory === "All Products" 
  ? productsList.map(product => ({ ...product, images: product.images[0] })) 
  : productsList.filter(product => product.category === activeCategory).map(product => ({ ...product, image: product.images[0] }));

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {activeCategory === "All Products" ? "Featured Products" : activeCategory}
          </h2>
          <p className="text-gray-300 text-lg">
            {activeCategory === "All Products" 
              ? "Discover our top-rated hardware components" 
              : `Browse our selection of ${activeCategory.toLowerCase()}`
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={productsList} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};