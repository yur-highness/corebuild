import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, ExternalLink, TrendingUp, Cpu, HardDrive, Monitor } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  imageUrl?: string;
}

export const HardwareNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - in a real app, this would come from a news API
  useEffect(() => {
    const mockArticles: NewsArticle[] = [
      {
        id: "1",
        title: "NVIDIA RTX 5090 Leaked Specifications Reveal Massive Performance Jump",
        description: "Latest leaks suggest the RTX 5090 could deliver up to 70% better performance than the RTX 4090, with new Blackwell architecture bringing significant improvements to ray tracing and AI workloads.",
        url: "#",
        publishedAt: "2024-01-20",
        source: "TechRadar",
        category: "Graphics Cards",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "2",
        title: "Intel Arrow Lake Desktop CPUs Launch Date Confirmed for Q4 2024",
        description: "Intel officially confirms that their next-generation Arrow Lake desktop processors will launch in Q4 2024, featuring new hybrid architecture and improved power efficiency.",
        url: "#",
        publishedAt: "2024-01-19",
        source: "AnandTech",
        category: "Processors"
      },
      {
        id: "3",
        title: "DDR5-8000 Memory Modules Now Available for Enthusiast Builds",
        description: "Major memory manufacturers have started shipping DDR5-8000 modules, pushing the boundaries of system memory performance for high-end gaming and workstation builds.",
        url: "#",
        publishedAt: "2024-01-18",
        source: "Tom's Hardware",
        category: "Memory"
      },
      {
        id: "4",
        title: "Samsung Announces Revolutionary QD-OLED Gaming Monitors",
        description: "Samsung's new QD-OLED gaming monitors promise unprecedented color accuracy and response times, targeting competitive esports and content creation markets.",
        url: "#",
        publishedAt: "2024-01-17",
        source: "DisplayPort Weekly",
        category: "Monitors"
      },
      {
        id: "5",
        title: "PCIe 6.0 SSDs Promise 32GB/s Transfer Speeds",
        description: "Next-generation PCIe 6.0 NVMe SSDs are in development, promising to deliver transfer speeds of up to 32GB/s, revolutionizing storage performance.",
        url: "#",
        publishedAt: "2024-01-16",
        source: "Storage Review",
        category: "Storage"
      },
      {
        id: "6",
        title: "AMD Ryzen 8000 Series APUs Bring Desktop-Class Graphics",
        description: "AMD's latest APUs integrate powerful RDNA 3 graphics, offering desktop-class gaming performance without the need for a dedicated graphics card.",
        url: "#",
        publishedAt: "2024-01-15",
        source: "PC World",
        category: "Processors"
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ["all", "Graphics Cards", "Processors", "Memory", "Storage", "Monitors", "Cooling"];

  const filteredArticles = articles.filter(article => 
    (selectedCategory === "all" || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Graphics Cards": return <Monitor className="h-4 w-4" />;
      case "Processors": return <Cpu className="h-4 w-4" />;
      case "Storage": return <HardDrive className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Skeleton className="h-32 w-full bg-white/10" />
              <Skeleton className="h-48 w-full bg-white/10" />
            </div>
            <div className="lg:col-span-3 space-y-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Hardware News</h1>
          <p className="text-gray-400 text-lg">Stay updated with the latest hardware news and reviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Search News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
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
                    {getCategoryIcon(category)}
                    <span className="ml-2">
                      {category === "all" ? "All Categories" : category}
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-white">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="space-y-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2 hover:text-blue-400 transition-colors">
                          {article.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(article.category)}
                            {article.source}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-blue-600/20 text-blue-400 border-blue-600/30 mb-3"
                        >
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 line-clamp-3">{article.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <p className="text-gray-400">No articles found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HardwareNews;
