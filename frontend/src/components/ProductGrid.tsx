import { ProductCard } from "../components/ProductCard";
import { useCategory } from "@/context/CategoryContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  currentPrice?: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  inStock: boolean;
}

export const ProductGrid = () => {
  const { activeCategory } = useCategory();
  const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const { data } = await axios.get(`${backendUrl}/api/products/list`);

      if (data.success) {
        setProductsList(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All Products"
      ? productsList
      : productsList.filter((product) => product.category === activeCategory);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {activeCategory === "All Products"
              ? "Featured Products"
              : activeCategory}
          </h2>
          <p className="text-gray-300 text-lg">
            {activeCategory === "All Products"
              ? "Discover our top-rated hardware components"
              : `Browse our selection of ${activeCategory.toLowerCase()}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
