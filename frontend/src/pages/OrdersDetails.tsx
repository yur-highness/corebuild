import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export const OrdersDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // order ID from URL
  const { backendUrl } = useAppContext();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single order details
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });

      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        toast.error("Failed to fetch order", { description: response.data.message });
      }
    } catch (error: any) {
      console.error("Error fetching order:", error);
      toast.error("Error fetching order details", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="text-green-500" />;
      case "shipped":
        return <Truck className="text-blue-500" />;
      case "cancelled":
        return <XCircle className="text-red-500" />;
      default:
        return <Package className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white text-lg">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-gray-400">
        <p>Order not found.</p>
        <Button onClick={() => navigate("/orders")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white mb-6"
          onClick={() => navigate("/orders")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </Button>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Order #{order._id}
                </h1>
                <p className="text-gray-400 text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                {getStatusIcon(order.status)}
                <Badge
                  variant="outline"
                  className="text-green-400 border-green-400/30 capitalize"
                >
                  {order.status}
                </Badge>
              </div>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            {/* Shipping Info */}
            <h2 className="text-xl text-white font-semibold mb-3">
              Shipping Information
            </h2>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
              <p className="text-white">{order.shippingAddress?.fullName || "N/A"}</p>
              <p className="text-gray-400">
                {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}, {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Phone: {order.shippingAddress?.phone}
              </p>
            </div>

            {/* Items */}
            <h2 className="text-xl text-white font-semibold mb-3">Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {order.items.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <img
                    src={item.product_id?.images?.[0] || "/placeholder.png"}
                    alt={item.product_id?.name || "Product"}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {item.product_id?.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity} • ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <p className="text-lg text-gray-300">Total:</p>
              <p className="text-2xl text-purple-400 font-bold">
                ₹{order.totalAmount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};
