import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlist, type WishlistItem } from "@/context/WishListContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export const WishlistPage = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Add to cart still synced with backend ✔
  const handleAddToCart = async (item: WishlistItem) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.currentPrice || item.price,
      images: [item.images[0]],
      variant: item.variants?.[0]?.name || "",
    });

    try {
      await axios.post(
        `${backendUrl}/api/user/cart/add`,
        {
          productId: item._id,
          quantity: 1,
          variant: item.variants?.[0]?.name || "",
        },
        { withCredentials: true }
      );

      toast.success(`${item.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart");
    }
  };

  // Wishlist is frontend-only → NO API calls ❌
  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-400" />
          <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
          <Badge variant="secondary" className="ml-2">{wishlistItems.length} items</Badge>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400">Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const variantName = item.variants?.[0]?.name;
              return (
                <Card
                  key={item._id}
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div
                      className="relative overflow-hidden rounded-t-lg"
                      onClick={() => handleProductClick(item._id)}
                    >
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/400x300"}
                        alt={item.name}
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <button
                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromWishlist(item._id);
                        }}
                      >
                        <Heart className="h-4 w-4 text-white fill-current" />
                      </button>
                    </div>

                    <div className="p-6" onClick={() => handleProductClick(item._id)}>
                      <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
                        {item.category}
                      </Badge>

                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400">
                        {item.name}
                      </h3>

                      {variantName && (
                        <p className="text-xs text-gray-400 mb-1">{variantName}</p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-white">
                          ₹{item.currentPrice || item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-gray-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>

                      <Button
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
