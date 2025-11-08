import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export const OrdersDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // You can fetch data by ID here
  const order = {
    id,
    date: "2025-10-30",
    status: "Delivered",
    total: "$124.99",
    shipping: {
      name: "Souvick Das",
      address: "123 MG Road, Kolkata, India",
      method: "Standard Shipping (5–7 days)",
    },
    items: [
      { name: "Wireless Headphones", image: "/images/headphones.jpg", qty: 1, price: "$99.99" },
      { name: "Charging Cable", image: "/images/cable.jpg", qty: 1, price: "$25.00" },
    ],
  };

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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Order #{order.id}</h1>
                <p className="text-gray-400 text-sm">Placed on {order.date}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                {getStatusIcon(order.status)}
                <Badge variant="outline" className="text-green-400 border-green-400/30">
                  {order.status}
                </Badge>
              </div>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            <h2 className="text-xl text-white font-semibold mb-3">Shipping Information</h2>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
              <p className="text-white">{order.shipping.name}</p>
              <p className="text-gray-400">{order.shipping.address}</p>
              <p className="text-gray-400 text-sm mt-2">{order.shipping.method}</p>
            </div>

            <h2 className="text-xl text-white font-semibold mb-3">Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.qty} • {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <p className="text-lg text-gray-300">Total:</p>
              <p className="text-2xl text-purple-400 font-bold">{order.total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};
