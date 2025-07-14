import { ProductCard } from "@/components/ProductCard";

const latestProducts = [
  {
    id: 7,
    name: "AMD Ryzen 9 7900X",
    category: "CPU",
    price: "$429.99",
    originalPrice: "$499.99",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 8,
    name: "NVIDIA RTX 4060 Ti",
    category: "Graphics Card",
    price: "$399.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 9,
    name: "ASUS TUF Gaming B650",
    category: "Motherboard",
    price: "$199.99",
    originalPrice: "$229.99",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 10,
    name: "G.Skill Trident Z5 RGB",
    category: "Memory",
    price: "$159.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    rating: 4.7,
    inStock: true,
  },
];

export const LatestProducts = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Arrivals</h2>
          <p className="text-gray-300 text-lg">Check out our newest hardware components</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};