import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    fullName: string;
    phone: string;
  };
}



export const OrdersTable = () => {
const[orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedOrder, setSelectedOrder] = useState<any>(null);
const [viewModalOpen, setViewModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [newStatus, setNewStatus] = useState("");
const openViewModal = (order: any) => {
  setSelectedOrder(order);
  setViewModalOpen(true);
};

const openEditModal = (order: any) => {
  setSelectedOrder(order);
  setNewStatus(order.status);
  setEditModalOpen(true);
};

const openDeleteModal = (order: any) => {
  setSelectedOrder(order);
  setDeleteModalOpen(true);
};


const fetchOrders = async () => {
  setLoading(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${backendUrl}/api/orders/all-orders`);
    if(response.data.success){
      setOrders(response.data.order);
    }
    else{
      console.error(response.data.message);
      toast.error("Failed to fetch orders", { description: response.data.message });
      
    }


  } 
  catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders", { description: "An error occurred while fetching orders."});
  }
}

useEffect(() => {
  fetchOrders();
}, []);

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
  <DialogContent className="bg-zinc-900 text-white border border-white/10">
    <DialogHeader>
      <DialogTitle>Order #{selectedOrder?._id}</DialogTitle>
      <DialogDescription>Placed on {new Date(selectedOrder?.createdAt).toLocaleString()}</DialogDescription>
    </DialogHeader>
    <div className="mt-4 space-y-2">
      <p><span className="font-semibold">Customer:</span> {selectedOrder?.user?.firstName} {selectedOrder?.user?.lastName}</p>
      <p><span className="font-semibold">Email:</span> {selectedOrder?.user?.email}</p>
      <p><span className="font-semibold">Total:</span> ₹{selectedOrder?.totalAmount}</p>
      <p><span className="font-semibold">Status:</span> {selectedOrder?.status}</p>
      <div className="mt-3 border-t border-white/10 pt-2">
        <p className="font-semibold mb-2">Items:</p>
        {selectedOrder?.items?.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm text-gray-300">
            <span>{item.product_id?.name}</span>
            <span>× {item.quantity}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
<Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
  <DialogContent className="bg-zinc-900 text-white border border-white/10">
    <DialogHeader>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogDescription>Modify the status for Order #{selectedOrder?._id}</DialogDescription>
    </DialogHeader>

    <div className="space-y-3 mt-4">
      <label htmlFor="status" className="block text-gray-400">Select Status</label>
      <select
        id="status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-white/10 text-white"
      >
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <DialogFooter>
      <Button
        onClick={async () => {
          try {
            const response = await axios.put(
              `${backendUrl}/api/orders/update-status/${selectedOrder._id}`,
              { status: newStatus },
              { headers: { token: localStorage.getItem("token") } }
            );
            if (response.data.success) {
              toast.success("Order status updated!");
              fetchOrders();
              setEditModalOpen(false);
            } else {
              toast.error("Failed to update order");
            }
          } catch (err) {
            toast.error("Error updating order", { description: err.message });
          }
        }}
        className="bg-green-600 hover:bg-green-700"
      >
        Save Changes
      </Button>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
<Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
  <DialogContent className="bg-zinc-900 text-white border border-white/10">
    <DialogHeader>
      <DialogTitle>Delete Order?</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete order #{selectedOrder?._id}? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <Button
        onClick={async () => {
          try {
            const res = await axios.delete(`${backendUrl}/api/orders/${selectedOrder._id}`, {
              headers: { token: localStorage.getItem("token") },
            });
            if (res.data.success) {
              toast.success("Order deleted!");
              setOrders((prev: any) => prev.filter((o: any) => o._id !== selectedOrder._id));
              setDeleteModalOpen(false);
            } else {
              toast.error("Failed to delete order");
            }
          } catch (err:any) {
            toast.error("Error deleting order", { description: err.message });
          }
        }}
        className="bg-red-600 hover:bg-red-700"
      >
        Delete
      </Button>
      <DialogClose asChild>
        <Button variant="secondary">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

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
  {orders.map((order: Order) => (
    <TableRow key={order._id} className="border-white/10">
      <TableCell className="text-white font-medium">{order._id}</TableCell>
      <TableCell>
        <div>
          <div className="text-white">
            {order.shippingAddress?.fullName}
          </div>

        </div>
      </TableCell>
      <TableCell className="text-gray-300">
        {order.items?.map((item: CartItem) => item.name).join(", ")}
      </TableCell>
      <TableCell className="text-white font-semibold">₹{order.totalAmount}</TableCell>
      <TableCell>
        <Badge className="bg-blue-600 text-white capitalize">{order.status}</Badge>
      </TableCell>
      <TableCell className="text-gray-300">
        {new Date(order.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
    {/* 👁️ View */}
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-blue-400 hover:bg-blue-500/20"
      onClick={() => openViewModal(order)}
    >
      <Eye className="h-4 w-4" />
    </Button>

    {/* ✏️ Edit */}
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-green-400 hover:bg-green-500/20"
      onClick={() => openEditModal(order)}
    >
      <Edit className="h-4 w-4" />
    </Button>

    {/* 🗑️ Delete */}
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-400 hover:bg-red-500/20"
      onClick={() => openDeleteModal(order)}
    >
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