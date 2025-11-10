import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  images: string[];
  rating: number;
  inStock: boolean;
  description: string;
  specifications: string[];
  features: string[];
  variants: string;
}

export const ShowAllProducts = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", description: "" });
  const fetchProducts = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${backendUrl}/api/products/list`);
    if(response.data.success){
      setProductsList(response.data.products);
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
  fetchProducts();
}, []);



  const handleDelete = () => {

    toast.success("Product deleted successfully");
  };

  const handleEdit = () => {
  
  };

  const handleUpdate = () => {
   
    setEditingProduct(null);
    toast.success("Product updated successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsList.map((product,index) => (
          <Card key={index} className="bg-slate-800 border border-slate-700 text-white shadow-md">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="rounded-xl w-full h-48 object-cover border border-slate-600"
              />

              {editingProduct === product.id ? (
                <div className="space-y-2">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="bg-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                      className="bg-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="bg-slate-700 text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button onClick={() => handleUpdate()} className="bg-blue-600 hover:bg-blue-700">
                      <Check className="w-4 h-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-400">{product.description}</p>
                  <p className="font-semibold text-lg">₹{product.price}</p>

                  <div className="flex justify-end gap-3 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit()}
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete()}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
