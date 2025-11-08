import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/pages/BlogPage";
import { Heart, Search, Calendar, User, TrendingUp, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";


interface BlogListProps {
  currentUserId: string;
  onEditPost: (post: BlogPost) => void;
}

export const BlogList = ({ currentUserId, onEditPost }: BlogListProps) => {
//   const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Mock data - in a real app, this would come from a database
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Building Your First Gaming PC: A Complete Guide",
      content: "Building a gaming PC can seem daunting, but with the right components and guidance, it's an incredibly rewarding experience. In this comprehensive guide, we'll walk through selecting each component, from the CPU and GPU to storage and cooling solutions...",
      author: "TechMaster",
      authorId: "user-123",
      createdAt: "2024-01-15",
      upvotes: 24,
      category: "PC Building",
      tags: ["gaming", "beginner", "guide"],
      hasUpvoted: false
    },
    {
      id: "2",
      title: "RTX 4090 vs RTX 4080: Performance Comparison",
      content: "The RTX 4090 and RTX 4080 represent NVIDIA's flagship graphics cards. But which one offers the best value for money? We dive deep into benchmarks, power consumption, and real-world gaming performance...",
      author: "HardwareReviewer",
      authorId: "user-456",
      createdAt: "2024-01-12",
      upvotes: 42,
      category: "Graphics Cards",
      tags: ["nvidia", "comparison", "review"],
      hasUpvoted: true
    },
    {
      id: "3",
      title: "Understanding RAM: DDR5 vs DDR4 in 2024",
      content: "Memory technology continues to evolve, and DDR5 is becoming more mainstream. But is it worth upgrading from DDR4? Let's explore the differences in speed, latency, and real-world performance impacts...",
      author: "MemoryExpert",
      authorId: "user-789",
      createdAt: "2024-01-10",
      upvotes: 18,
      category: "Memory",
      tags: ["ram", "ddr5", "upgrade"],
      hasUpvoted: false
    }
  ]);

  const categories = ["all", "PC Building", "Graphics Cards", "Processors", "Memory", "Storage", "Cooling"];

  const handleUpvote = (postId: string) => {
    setBlogPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              upvotes: post.hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
              hasUpvoted: !post.hasUpvoted 
            }
          : post
      )
    );
    toast.success("Vote Recorded",{
     
      description: "Thank you for your feedback!",
    });
  };

  const handleDelete = (postId: string) => {
    setBlogPosts(posts => posts.filter(post => post.id !== postId));
    toast.success("Post Deleted",{
      description: "Blog post has been successfully deleted.",
    });
  };

  const filteredPosts = blogPosts
    .filter(post => 
      (selectedCategory === "all" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => b.upvotes - a.upvotes);

  const trendingPosts = [...blogPosts]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Search */}
        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Trending */}
        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingPosts.map((post, index) => (
              <div key={post.id} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 font-bold">#{index + 1}</span>
                  <span className="text-red-400 flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.upvotes}
                  </span>
                </div>
                <p className="text-white font-medium line-clamp-2">{post.title}</p>
                <p className="text-gray-400 text-xs">by {post.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <div className="text-white">
          <p>{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found</p>
        </div>

        {filteredPosts.map(post => (
          <Card key={post.id} className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-xl mb-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                      {post.category}
                    </Badge>
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-white/20 text-gray-300">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {post.authorId === currentUserId && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditPost(post)}
                      className="text-white hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpvote(post.id)}
                  className={`flex items-center gap-2 ${
                    post.hasUpvoted 
                      ? 'text-red-400 hover:text-red-300' 
                      : 'text-white hover:text-red-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.hasUpvoted ? 'fill-current' : ''}`} />
                  {post.upvotes} {post.upvotes === 1 ? 'upvote' : 'upvotes'}
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <p className="text-gray-400">No blog posts found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
