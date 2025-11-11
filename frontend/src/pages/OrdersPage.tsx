import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  variant: string;
}

interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  count: number;
}




export const OrdersPage = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
     const { backendUrl  } = useAppContext();
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/orders/my-orders`);
      if (response.data.success) {
       
        setOrders(response.data.orders);
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
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="text-green-500" />;
      case "Shipped":
        return <Truck className="text-blue-500" />;
      case "Cancelled":
        return <XCircle className="text-red-500" />;
      default:
        return <Package className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/10 text-green-400 border-green-400/30";
      case "Shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-400/30";
      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-400/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">My Orders</h1>
          <Badge variant="secondary" className="ml-2">
            orders{orders.count}
          </Badge>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
  <Card
    key={order._id}
    className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
  >
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Order #{order._id}</h3>
          <p className="text-gray-400 text-sm">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {getStatusIcon(order.status)}
          <Badge
            variant="outline"
            className={`${getStatusColor(order.status)} border`}
          >
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="border-t border-white/10 my-4"></div>

      <div className="flex flex-wrap gap-4 mb-6">
        {order.items.map((item: any, i: number) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/10 min-w-[240px]"
          >
            <img
              src={item.product_id?.images?.[0] || "/placeholder.png"}
              alt={item.product_id?.name || "Product"}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h4 className="text-white font-medium truncate">
                {item.product_id?.name || "Unnamed Product"}
              </h4>
              <p className="text-gray-400 text-sm truncate">
                Qty: {item.quantity} • ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-white text-lg font-semibold">
          Total: <span className="text-purple-400">₹{orders.totalAmount}</span>
        </p>
        <Button
          onClick={() => navigate(`/orders/${order._id}`)}
          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
))}

        </div>
      </div>

      <Footer />
    </div>
  );
};
