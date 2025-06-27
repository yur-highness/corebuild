import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useCart } from "../context/CardContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black ">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-gray-600 to-blue-900 hover:from-blue-500 hover:to-gray-700 button"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <div className="mt-52">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <Badge variant="secondary" className="bg-slate-700 text-white">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          {items.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.variant || 'default'}`} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-white text-lg">{item.name}</h3>
                          {item.variant && (
                            <p className="text-slate-400 text-sm">{item.variant}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-slate-400 text-sm">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 border-slate-600 text-white hover:bg-slate-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 border-slate-600 text-white hover:bg-slate-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-green-400 text-sm">
                      🎉 Free shipping on orders over $100!
                    </p>
                  )}
                  
                  <div className="flex justify-between text-slate-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-gray-500 to-slate-500 hover:from-slate-200 hover:to-gray-300
                    hover:text-blue-500"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {isCheckingOut ? "Processing..." : `Checkout - $${total.toFixed(2)}`}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-white hover:bg-slate-200 hover:text-slate-900 "
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </Button>
                </div>
                
                <div className="text-center text-sm text-slate-400 pt-4">
                  <p>🔒 Secure checkout with SSL encryption</p>
                  <p>💳 We accept all major credit cards</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};