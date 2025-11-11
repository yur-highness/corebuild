import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  variant: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  toggleWishlist: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  //  Fetch user’s cart from MongoDB on mount (if logged in)
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/data`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.cart) {
          const loadedCart = res.data.cart.map((c: any) => ({
            id: c.product._id,
            name: c.product.name,
            price: c.product.price,
            images: c.product.images,
            variant: c.variant,
            quantity: c.quantity,
          }));
          setItems(loadedCart);
        }
      } catch (err:any) {
        console.log("No user cart found (guest mode)."+err.message);
      }
    };
    fetchUserCart();
  }, [backendUrl]);

  // ✅ Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ Add to cart (frontend + backend sync)
  const addToCart = async (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.variant === product.variant
      );

      if (existingItem) {
        toast.success(`Updated ${product.name} quantity`);
        return prevItems.map((item) =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });


  };

  const toggleWishlist = async (productId: string) => {
  try {
    await axios.post(`${backendUrl}/api/user/wishlist/toggle`, { productId }, { withCredentials: true });
  } catch (error) {
    console.error("Error syncing wishlist:", error);
  }
};

  const removeFromCart = async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");

    // Optional: Add API call to remove from backend
    // await axios.post(`${backendUrl}/api/user/cart/remove`, { productId: id }, { withCredentials: true });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = async () => {
    setItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");

    // Optional: Add backend sync
    // await axios.post(`${backendUrl}/api/user/cart/clear`, {}, { withCredentials: true });
  };

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        toggleWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};




