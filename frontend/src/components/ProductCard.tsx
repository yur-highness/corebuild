import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    
    const numericPrice = parseFloat(product.price.replace('$', ''));
    
    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image
    });
  };

  return (
    <Card 
      className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 "
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
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <Badge variant="outline" className="text-blue-400  hover: border-blue-400">
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>
            
            <Button
              size="sm"
              disabled={!product.inStock}
              className="bg-gradient-to-r from-gray-600 to-blue-900 hover:from-gray-700 hover:to-blue-700 disabled:opacity-50 button"
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