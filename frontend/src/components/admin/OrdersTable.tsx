import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

const orders = [
  {
    id: "#1234",
    customer: "John Doe",
    email: "john@example.com",
    product: "RTX 4080 Graphics Card",
    amount: "$1,199.99",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#1235",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Intel i9-13900K",
    amount: "$589.99",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "#1236",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "ASUS ROG Motherboard",
    amount: "$399.99",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "#1237",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "32GB DDR5 RAM",
    amount: "$299.99",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#1238",
    customer: "Tom Brown",
    email: "tom@example.com",
    product: "Samsung 980 Pro SSD",
    amount: "$199.99",
    status: "completed",
    date: "2024-01-13",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "processing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "shipped": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const OrdersTable = () => {
  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-gray-300">Order ID</TableHead>
                <TableHead className="text-gray-300">Customer</TableHead>
                <TableHead className="text-gray-300">Product</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-white/10">
                  <TableCell className="text-white font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-white">{order.customer}</div>
                      <div className="text-gray-400 text-sm">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{order.product}</TableCell>
                  <TableCell className="text-white font-semibold">{order.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-500/20">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-500/20">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/20">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};