import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { toast } from "sonner";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  currentPrice: number;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
    variants: { 
  name: string; 
  price: number; 
  available: boolean 
}[];
}

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const quantity = 1;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.currentPrice || product.price,
      images: [product.images[0]],
      variant: product.variants?.[0]?.name || "",
    });

    try {
      await axios.post(`${backendUrl}/api/user/cart/add`, {
        productId: product._id,
        quantity
      }, { withCredentials: true });

      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync cart");
    }
  };

const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
  e.stopPropagation();
  const wishlisted = isInWishlist(product._id);

  if (wishlisted) {
    removeFromWishlist(product._id);
    toast.info(`${product.name} removed from wishlist`);
  } else {
    addToWishlist({
      _id: product._id,
      name: product.name,
      category: product.category,
      price: product.currentPrice || product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      rating: product.rating,
      inStock: product.inStock,
      description: product.description,
      specifications: product.specifications,
      features: product.features,
      variants: product.variants || [],
      currentPrice: product.currentPrice || product.price,
    });
    toast.success(`${product.name} added to wishlist`);
  }
};


  return (
    <Card
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white/5 backdrop-blur-sm border border-white/10 
      hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] 
      hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] 
      group cursor-pointer flex flex-col h-full rounded-2xl shadow-md"
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-red-500">Sale</Badge>
          )}
     <Button
  variant="ghost"
  size="icon"
  onClick={(e) => handleWishlistToggle(e, product)}
  className={`absolute top-3 right-3 ${
    isInWishlist(product._id)
      ? "bg-red-500 hover:bg-red-600"
      : "bg-white/20 hover:bg-white/30"
  }`}
>
  <Heart className="h-4 w-4" />
</Button>

        </div>

        <div className="p-6 flex flex-col grow">
          <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
            {product.category}
          </Badge>

          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="mt-4 w-full bg-linear-to-r from-blue-600 to-purple-600"
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
