import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  image: string[];
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const numericPrice = parseFloat(product.price.replace('$', ''));
    
    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image[0] 
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
  ...product,
  image: [product.image[0]], 
});
    }
  };

  return (
    <Card 
      className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
          {!product.inStock && (
            <Badge className="absolute top-3 right-3 bg-gray-500" variant="secondary">
              Out of Stock
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 p-2 transition-colors ${
              isWishlisted 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="p-6 flex flex-col grow">
          <div className="mb-2">
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">{product.originalPrice}</span>
                )}
              </div>
            </div>
            
            <Button
              size="sm"
              disabled={!product.inStock}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};