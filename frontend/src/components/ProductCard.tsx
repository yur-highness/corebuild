import { useState, useEffect } from "react";
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
  originalPrice:number;
  currentPrice: number;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
  variants: string;
}

export const ProductCard = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);
      if (response.data.success) {
       
        setProductsList(response.data.products);
      } else {
        toast.error("Failed to fetch products", {
          description: response.data.message,
        });
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
    
  };

  //very carefull with any useEffect
  useEffect(() => {
    fetchProducts();
  },[]);

const toggleCart = async (productId: string, quantity: number, variant?: string) => {
  try {
    await axios.post(
      `${backendUrl}/api/user/cart/add`,
      {
        productId,
        quantity,
        variant: variant || "",
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error syncing cart:", error);
  }
};



  //  Handle Add to Cart
  const handleAddToCart = async(e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
      const quantity = 1;
      const variant = product.variants;
      const numericPrice = parseFloat(product.price.toString().replace(/[^0-9.]/g, ""));
    addToCart({
      id: product._id,
      name: product.name,
      price: numericPrice,
      images: [product.images[0]],
      variant: product.variants,
    });

    await toggleCart(product._id, quantity, variant);

    toast.success(`${product.name} added to cart`);
  };


  const toggleWishlist = async (productId: string) => {
  try {
    await axios.post(`${backendUrl}/api/user/wishlist/toggle`, { productId }, { withCredentials: true });
  } catch (error) {
    console.error("Error syncing wishlist:", error);
  }
};

  //  Handle Wishlist Toggle
  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const wishlisted = isInWishlist(product._id);

    if (wishlisted) {
      removeFromWishlist(product._id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        ...product,
        images: [product.images[0]],
      });
      toggleWishlist(product._id);
      toast.success(`${product.name} added to wishlist`);
    }
  };



  //  Navigate to Product Detail
  const handleCardClick = (product: Product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="p-6">
  

      {loading ? (
        <p className="text-gray-400">Loading products...</p>
      ) : productsList.length === 0 ? (
        <p className="text-gray-400">No products found.</p>
      ) : (
        <div className="grid justify-center gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] auto-rows-fr">
          {productsList.map((product) => {
            const isWishlisted = isInWishlist(product._id);

            return (
              <Card
                key={product._id}
                onClick={() => handleCardClick(product)}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] group cursor-pointer flex flex-col h-full rounded-2xl shadow-md"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* ✅ Product Image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={
                        Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                        Sale
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge
                        className="absolute top-3 right-3 bg-gray-500"
                        variant="secondary"
                      >
                        Out of Stock
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className={`absolute top-3 right-3 p-2 transition-colors ${
                        isWishlisted
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white/20 hover:bg-white/30 text-white"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>

                  {/*  Product Details */}
                  <div className="p-6 flex flex-col grow">
                    <div className="mb-2">
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400"
                      >
                        {product.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm ml-2">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price + Add to Cart */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        disabled={!product.inStock}
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {product.inStock ? "Add to Cart" : "Sold Out"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
