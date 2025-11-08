import {  ShoppingCart, Package,BookOpen, Newspaper, Heart, User,Codesandbox  } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { createContext, type ReactNode,  useContext, useState } from "react";
import SearchComponent from "./animated-glowing-serach-bar";
import  { useCart } from "../context/CartContext";
import { AppContext } from "../context/AppContext";
import { ChevronDown } from "lucide-react";
import axios from "axios";


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
  const {userData,backendUrl,setIsLoggedIn,setUserData} = useContext(AppContext)||{} ;
const [settingsOpen, setSettingsOpen] = useState(false);
  
  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setSettingsOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleBlogClick = () => {
    navigate("/blog");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleNewsClick = () => {
    navigate("/news");
  };

   const handleOdersClick = () => {
    navigate("/orders");
  };



  const  handlelogout  = async () => {
    try{
      axios.defaults.withCredentials = true;
      const  {data} = await axios.post(`${backendUrl}/api/auth/logout`);
       if (data.success) {
      setIsLoggedIn?.(false);
      setUserData?.(null);
    }

    }
    catch(error){
      console.log(error);
    }
    navigate("/");
  };

 

  return (

<header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4">
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <div 
          className="flex items-center space-x-2 cursor-pointer "
          onClick={handleLogoClick}
        >
          <Package className="h-8 w-8 text-blue-400" />
          <span className="text-2xl md:text-xl sm:text-md font-bold text-white">CoreBuild</span>
        </div>
             <p>Hello, {userData?.firstName ?? "Guest"}!</p>
      </div>
      <div className="sm:max-w-1/2 m-8 md:flex md:max-w-sm mt-2.5 mb-2.5 mr-4.5 items-center space-x-4 flex-1 max-w-md mx-8">
        <div className="relative flex-1">
          <SearchComponent />
        </div>


      </div>
     
      <div className="flex items-center space-x-2 lg:flex-row md:flex-wrap md:space-x-4 sm:flex-wrap sm:space-x-2">
      
        <Button 
          variant="ghost" 
          onClick={handleNewsClick}
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Newspaper className="h-4 w-4" />
          <span className=" sm:inline">News</span>
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleBlogClick}
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          <span className=" sm:inline">Blog</span>
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleWishlistClick}
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Heart className="h-4 w-4" />
          <span className=" sm:inline">Wishlist</span>
        </Button>
         <Button 
          variant="ghost" 
          onClick={handleOdersClick}
          className="text-white hover:bg-white/10 flex items-center gap-2"
        >
   
          <Codesandbox className="h-4 w-4" />
          <span className=" sm:inline">Orders</span>
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
        {userData?.role === "admin" && (
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin")}
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            <span className=" sm:inline">Admin</span>
          </Button>
        )}
       {!userData ? (
          <>
            <Button 
              variant="ghost" 
              onClick={handleLoginClick}
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="sm:inline">Login</span>
            </Button>
            <Button 
              onClick={handleSignupClick}
              className="bg-blue-600 hover:bg-blue-700 text-white  sm:flex"
            >
              Sign Up
            </Button>
          </>
        ) : (
          <div className="relative">
          <Button
            variant="ghost"
            onClick={handleSettingsClick}
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            <span className="sm:inline">Settings</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-transparent border-2 rounded shadow-lg z-50 cursor-pointer">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-black  cursor-pointer"
                onClick={handleProfileClick}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-black  cursor-pointer"
                onClick={handlelogout}
              >
                Logout
              </button>
            </div>
          )}  
        </div>
        )}
      </div>
    </div>
  </div>
</header>
  );
};