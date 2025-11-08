import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Package, DollarSign } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "order",
    message: "New order #1234 received",
    user: "John Doe",
    time: "2 minutes ago",
    status: "new",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "user",
    message: "New user registration",
    user: "Jane Smith",
    time: "5 minutes ago",
    status: "active",
    icon: User,
  },
  {
    id: 3,
    type: "product",
    message: "Product stock updated",
    user: "RTX 4080",
    time: "10 minutes ago",
    status: "updated",
    icon: Package,
  },
  {
    id: 4,
    type: "payment",
    message: "Payment processed",
    user: "$2,499.99",
    time: "15 minutes ago",
    status: "completed",
    icon: DollarSign,
  },
  {
    id: 5,
    type: "order",
    message: "Order #1235 shipped",
    user: "Mike Johnson",
    time: "20 minutes ago",
    status: "shipped",
    icon: ShoppingCart,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "new": return "bg-blue-500/20 text-blue-400";
    case "active": return "bg-green-500/20 text-green-400";
    case "updated": return "bg-yellow-500/20 text-yellow-400";
    case "completed": return "bg-purple-500/20 text-purple-400";
    case "shipped": return "bg-orange-500/20 text-orange-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

export const RecentActivity = () => {
  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{activity.message}</p>
                <p className="text-xs text-gray-400">{activity.user}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};