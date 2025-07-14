import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ShoppingCart, Star, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "AMD Ryzen 9 7950X",
    category: "CPU",
    price: 599.99,
    originalPrice: 699.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    description: "The AMD Ryzen 9 7950X is a high-performance desktop processor featuring 16 cores and 32 threads. Built on the advanced Zen 4 architecture with 5nm process technology, it delivers exceptional performance for gaming, content creation, and professional workloads.",
    specifications: {
      "Cores": "16",
      "Threads": "32",
      "Base Clock": "4.5 GHz",
      "Max Boost Clock": "5.7 GHz",
      "Cache": "80MB",
      "TDP": "170W",
      "Socket": "AM5",
      "Architecture": "Zen 4"
    },
    features: [
      "Advanced Zen 4 architecture",
      "5nm process technology",
      "PCIe 5.0 support",
      "DDR5 memory support",
      "AMD Precision Boost 2",
      "AMD Precision Boost Overdrive"
    ],
    variants: [
      { name: "Standard Edition", price: 599.99, available: true },
      { name: "OEM Version", price: 549.99, available: false }
    ]
  },
  {
    id: 2,
    name: "NVIDIA RTX 4080 Super",
    category: "Graphics Card",
    price: 999.99,
    originalPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 1523,
    inStock: true,
    description: "The NVIDIA GeForce RTX 4080 Super delivers exceptional 4K gaming performance with advanced ray tracing and DLSS 3 technology.",
    specifications: {
      "CUDA Cores": "10240",
      "Memory": "16GB GDDR6X",
      "Memory Interface": "256-bit",
      "Base Clock": "2205 MHz",
      "Boost Clock": "2550 MHz",
      "TGP": "320W"
    },
    features: [
      "DLSS 3 with Frame Generation",
      "Ray Tracing",
      "4K Gaming Ready",
      "AV1 Encoding"
    ],
    variants: [
      { name: "Founders Edition", price: 999.99, available: true },
      { name: "Gaming OC", price: 1099.99, available: true }
    ]
  }
];

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const product = products.find(p => p.id === parseInt(id || "1"));

  if (!product) {
    return <div>Product not found</div>;
  }

  const currentPrice = product.variants[selectedVariant]?.price || product.price;
  const isAvailable = product.variants[selectedVariant]?.available !== false && product.inStock;
  const selectedVariantName = product.variants[selectedVariant]?.name;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      variant: selectedVariantName
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Here you would typically navigate to checkout
    // For now, we'll just show a toast via the addToCart function
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-slate-600'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-blue-600">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-slate-300">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-white">${currentPrice}</span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-600">
                    Save ${(product.originalPrice - currentPrice).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">{product.description}</p>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div>
                <label className="block text-white font-medium mb-2">Version:</label>
                <Select value={selectedVariant.toString()} onValueChange={(value) => setSelectedVariant(parseInt(value))}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {product.variants.map((variant, index) => (
                      <SelectItem 
                        key={index} 
                        value={index.toString()}
                        disabled={!variant.available}
                        className="text-white"
                      >
                        {variant.name} - ${variant.price} {!variant.available && "(Out of Stock)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <label className="block text-white font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-white font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!isAvailable}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAvailable ? `Add to Cart - $${(currentPrice * quantity).toFixed(2)}` : "Out of Stock"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-600 text-white hover:bg-slate-700"
                disabled={!isAvailable}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-slate-300">
                {isAvailable ? "In Stock - Ships within 24 hours" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-slate-300 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};