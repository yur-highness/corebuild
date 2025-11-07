
import { ProductCard } from "../components/ProductCard";
import { useCategory } from "@/context/CategoryContext";

import products  from "../assets/index.ts";




export const ProductGrid = () => {
  const { activeCategory } = useCategory();
  
  const filteredProducts = activeCategory === "All Products" 
  ? products.map(product => ({ ...product, images: product.image[0] })) 
  : products.filter(product => product.category === activeCategory).map(product => ({ ...product, image: product.image[0] }));

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
            <ProductCard key={product.id} product={product} />
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