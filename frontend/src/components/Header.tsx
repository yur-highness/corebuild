import { Search, ShoppingCart, Package,BookOpen  } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { createContext, type ReactNode, useState } from "react";

import  { useCart } from "../context/CardContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && (i.quantity ?? 1) > 1
            ? { ...i, quantity: (i.quantity ?? 1) - 1 }
            : i
        )
        .filter((i) => i.id !== id || (i.quantity ?? 1) > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};



export const Header = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  


  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleBlogClick = () => {
    navigate("/blog");
  };

  return (

    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
              <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">CoreBuild</span>
          </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search hardware..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
                  <Button 
              variant="ghost" 
              onClick={handleBlogClick}
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </Button>
               <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 relative button"
              
              
              onClick={handleCartClick}
            >
             <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  
  );
};