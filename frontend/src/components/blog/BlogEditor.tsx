import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { BlogPost } from "@/pages/BlogPage";
import { Save, X } from "lucide-react";
import { toast } from "sonner";


interface BlogEditorProps {
  post?: BlogPost | null;
  currentUserId: string;
  onSave: () => void;
  onCancel: () => void;
}

export const BlogEditor = ({ post, currentUserId, onSave, onCancel }: BlogEditorProps) => {
//   const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "PC Building",
    tags: ""
  });

  const categories = ["PC Building", "Graphics Cards", "Processors", "Memory", "Storage", "Cooling"];

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags.join(", ")
      });
    }
  }, [post]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast("required",{
      
        description: "Please fill in all required fields.",

      });
      return;
    }

    // In a real app, this would save to a database
    console.log("Saving blog post:", {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      authorId: currentUserId,
      id: post?.id || Date.now().toString(),
      author: "Current User", // Would come from auth context
      createdAt: post?.createdAt || new Date().toISOString().split('T')[0],
      upvotes: post?.upvotes || 0
    });

  toast.success(`${post} ? "Post Updated" : "Post Created",`,{
 
      description: `Blog post has been successfully ${post ? 'updated' : 'created'}.`,
    });

    onSave();
  };

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl">
          {post ? 'Edit Article' : 'Write New Article'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Title *</Label>
            <Input
              id="title"
              placeholder="Enter article title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-white">Tags</Label>
              <Input
                id="tags"
                placeholder="gaming, review, guide (comma separated)"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[400px] resize-y"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {post ? 'Update Article' : 'Publish Article'}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={onCancel}
              className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
