import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";


export const AddProductForm = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    currentPrice: "",
    originalPrice: "",
    variants: "",
    images: "",
    features: "",
    specifications: "",


  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImageFiles((prev) => [...prev, ...newFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("category", formData.category);
      data.append("currentPrice", formData.currentPrice);
      data.append("originalPrice", formData.originalPrice);
    data.append("specifications", JSON.stringify(formData.specifications.split("\n")));
data.append("features", JSON.stringify(formData.features.split("\n")));
data.append(
  "variants",
  JSON.stringify(
    formData.variants
      .split("\n")
      .map(v => v.trim())
      .filter(v => v.length > 0) // remove empty lines
      .map(v => ({
        name: v,
        price: Number(formData.price),
        available: true,
      }))
  )
);



      // imageFiles.forEach((file) => data.append("image", file));  //suspicious
      imageFiles.forEach((file, index) => {
          data.append(`image${index + 1}`, file);
        });


      const response = await axios.post(`${backendUrl}/api/products/add`, data, {
       headers: {
         "token": localStorage.getItem("token")
       },
      });

      if(response.data.success){
        toast.success("✅ Product added successfully", {
          description: "Your new product has been saved to the inventory.",
        });
        // Reset form
        setFormData({ name: "", description: "", price: "", quantity: "", category: "", currentPrice: "", originalPrice: "", variants: "", images: "", features: "", specifications: "" });
        setPreviewImages([]);
        setImageFiles([]);
      }
      else{
        toast.error("❌ Failed to add product", {
          description: `error:${response.data.message}`,
        });
      }
    } 
    catch (err) {
      console.error(err);
      toast.error("❌ Failed to add product", {
        description: "Please try again.",
      });
    }
  };

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Category</Label>
              <Input
                id="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              required
            />
          </div>
                <div className="space-y-2">
            <Label htmlFor="specifications" className="text-white">specifications</Label>
            <Textarea
              id="specifications"
              placeholder="Enter product specifications"
              value={formData.specifications}
              onChange={(e) => handleInputChange("specifications", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              required
            />
          </div>
               <div className="space-y-2">
            <Label htmlFor="variants" className="text-white">variants</Label>
            <Textarea
              id="variants"
              placeholder="Enter product variants"
              value={formData.variants}
              onChange={(e) => handleInputChange("variants", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              required
            />
          </div>

              <div className="space-y-2">
            <Label htmlFor="variants" className="text-white">features</Label>
            <Textarea
              id="features"
              placeholder="Enter product features"
              value={formData.features}
              onChange={(e) => handleInputChange("features", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">currentPrice ($)</Label>
              <Input
                id="currentPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.currentPrice}
                onChange={(e) => handleInputChange("currentPrice", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">originalPrice ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            </div>
              

            
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-white">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Product Images</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Upload Images
                </Label>
                <span className="text-gray-400 text-sm">
                  {previewImages.length} image(s) selected
                </span>
              </div>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
