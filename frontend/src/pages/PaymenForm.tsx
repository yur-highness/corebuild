import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // variant: string;
}



export default function PaymentForm() {
  const { items, getTotalPrice, getTotalItems,clearCart, } = useCart();
 const { backendUrl,  delivery_fee,userData  } = useAppContext();
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    paymentMethod: "COD",
  });
  useEffect(() => {
  if (userData) {
    setFormData((prev) => ({
      ...prev,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      // if you also store phone, auto-fill that too
      
    }));
  }
}, [userData]);

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value:any) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!userData) {
    toast.error("Please log in before placing an order.");
    return;
  }

  const orderitems = items.map((item: CartItem) => ({
    product_id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const address = {
    street: formData.street,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    zipCode: formData.zipCode,
    fullName: `${formData.firstName} ${formData.lastName}`,
    phone: formData.phone,
  };


  try {
  const orderData = {
    user: userData.id,
    items:orderitems,
    totalAmount: getTotalPrice()+ delivery_fee,
    totalItems: getTotalItems(),
    shippingAddress: address,
    paymentMethod: formData.paymentMethod
  };




  switch (formData.paymentMethod) {
  case "COD": {
    const response = await axios.post(`${backendUrl}/api/orders/payment-COD`, orderData, {
      headers: {
        token: localStorage.getItem("token"),
      },
      withCredentials: true
    });
    if (response.data.success) {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
      return;
    }
    else{
      toast.error("Failed to place order");
    }
    break;
  }

  case "Stripe": {
    const response = await axios.post(`${backendUrl}/api/orders/payment-stripe`, orderData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    if (response.data.success) {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
      return;
    }
    else{
      toast.error("Failed to place order");
    }
    break;
  }

  case "Razorpay": {
       const response = await axios.post(`${backendUrl}/api/orders/payment-razorpay`, orderData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    if (response.data.success) {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
      return;
    }
    else{
      toast.error("Failed to place order");
    }
    break;
  }

  default: {
    formData.paymentMethod = "COD";
  }
}

    toast.success("Order placed successfully!");
    clearCart();
  } 
  catch (err: any) {
    console.error("Order error:", err);
    toast.error("Failed to place order");
  }
};


  return (
  
    <div className="min-h-screen bg-linear  -to-br from-zinc-950 via-zinc-900 to-black">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-white">CoreBuild</span>
            </div>
            <CardTitle className="text-2xl text-white">Payment Details</CardTitle>
            <CardDescription className="text-slate-400">
              Please fill in your billing and payment information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                    name="firstName"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                     name="lastName"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                   name="email"
                />
              </div>

              {/* Street */}
              <div className="space-y-2">
                <Label htmlFor="street" className="text-white">Street</Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="123 Main St"
                  value={formData.street}
                  onChange={handleChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                   name="street"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Los Angeles"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                     name="city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="CA"
                    value={formData.state}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                     name="state"
                  />
                </div>
              </div>

              {/* Country & Zip */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                     name="country"
                     required

                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-white">Zip Code</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="90001"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    required
                     name="zipCode"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+1 555 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                  name="phone"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-white">Payment Method</Label>
                <Select onValueChange={handleSelectChange} defaultValue={formData.paymentMethod} name="paymentMethod">
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                    <SelectItem value="STRIPE">Stripe</SelectItem>
                    <SelectItem value="RAZORPAY">Razorpay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}
