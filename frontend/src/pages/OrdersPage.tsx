import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  {
    id: 1,
    date: "2025-10-30",
    status: "Delivered",
    total: "$124.99",
    items: [
      { name: "Wireless Headphones", image: "/images/headphones.jpg", qty: 1, price: "$99.99" },
      { name: "Charging Cable", image: "/images/cable.jpg", qty: 1, price: "$25.00" },
    ],
  },
  {
    id: 2,
    date: "2025-11-05",
    status: "Shipped",
    total: "$59.99",
    items: [
      { name: "Smartwatch Strap", image: "/images/strap.jpg", qty: 2, price: "$29.99" },
    ],
  },
];

export const OrdersPage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">My Orders</h1>
          <Badge variant="secondary" className="ml-2">
            {mockOrders.length} orders
          </Badge>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card
              key={order.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Order #{order.id}</h3>
                    <p className="text-gray-400 text-sm">Placed on {order.date}</p>
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

                {/* Items Grid */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/10 min-w-[240px] max-w-[300px] flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-white font-medium truncate">{item.name}</h4>
                        <p className="text-gray-400 text-sm truncate">
                          Qty: {item.qty} • {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg font-semibold">
                    Total: <span className="text-purple-400">{order.total}</span>
                  </p>
                  <Button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
