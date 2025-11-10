import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingCart, Star, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
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
  variants: string;
}

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setErrorMessage("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${backendUrl}/api/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          setErrorMessage("Product not found.");
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setErrorMessage(
          err.response?.status === 404
            ? "This product does not exist."
            : "Server error while fetching product."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendUrl]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading product details...
      </div>
    );

  if (errorMessage)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p className="mb-4">{errorMessage}</p>
        <Button onClick={() => navigate("/products")} variant="outline">
          Back to Products
        </Button>
      </div>
    );

  if (!product) return null;



  const handleAddToCart = () => {
    addToCart(
      {
        id: product._id.toString(),
        name: product.name,
        price: product.currentPrice,
        images: product.images,
        variant: product.variants,
      },
      quantity
    );
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
              className="rounded-lg w-full h-[400px] object-cover"
            />
            <div className="flex gap-2 overflow-x-auto">
              {product.images?.map((img, i) => (
                <button
                  key={`img-${product._id}-${i}`}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 border-2 rounded-md overflow-hidden ${
                    selectedImage === i
                      ? "border-blue-500"
                      : "border-slate-600"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <Badge className="mb-2 bg-blue-600">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-white mb-2">
              {product.name}
            </h1>

            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={`star-${i}`} className={i < product.rating ? "fill-current" : ""} />
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl text-white font-bold">
                ₹{product.currentPrice}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge className="bg-red-600">
                    Save ₹{(product.originalPrice - product.currentPrice).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-slate-300 mb-4">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <Select
                value={selectedVariant.toString()}
                onValueChange={(val) => setSelectedVariant(Number(val))}
              >
                <SelectTrigger className="bg-slate-800 text-white border-slate-700">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {/* {product.variants.map((i) => (
                    <SelectItem
                      key={`variant-${product._id}-${i}`}
                      value={i.toString()}
                      disabled={!product.inStock}
                      className="text-white"
                    >
                      {product.name} - ₹{product.currentPrice}{" "}
                      {!product.inStock && "(Out of Stock)"}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span className="text-white font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus />
              </Button>
            </div>

            <Button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" />{" "}
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        {/* Specs */}
        {product.specifications && (
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl text-white mb-3 font-semibold">
                  Specifications
                </h3>
             
                  <div
                    key={product._id}
                    className="flex justify-between text-slate-300 mb-2"
                  >
                  
                    <p className="text-white font-medium">{product.specifications}</p>
                  </div>
                
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
