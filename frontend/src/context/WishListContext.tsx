
import  { createContext, useContext, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

export interface WishlistItem {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  rating: number;
  inStock: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (product: WishlistItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevItems;
      } else {
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (id: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.success(`Removed ${item.name} from wishlist`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id);
  };

  const getTotalItems = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getTotalItems
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
