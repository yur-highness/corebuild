import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

export interface WishlistItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
  variants: string;
  currentPrice: number;

}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    // ✅ Load wishlist from localStorage on initial load
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  // ✅ Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item._id === product._id);
      if (exists) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevItems;
      }
      toast.success(`Added ${product.name} to wishlist`);
      return [...prevItems, product];
    });
    
  };

  

  const removeFromWishlist = (id: string) => {
    setItems((prevItems) => {
      const removedItem = prevItems.find((item) => item._id === id);
      if (removedItem) {
        toast.success(`Removed ${removedItem.name} from wishlist`);
      }
      return prevItems.filter((item) => item._id !== id);
    });
  };

  const isInWishlist = (id: string) => items.some((item) => item._id === id);

  const getTotalItems = () => items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getTotalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
