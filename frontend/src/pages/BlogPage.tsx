import { useState } from "react";
import { Header } from "../components/Header";
import { BlogList } from "../components/blog/BlogList";
import { BlogEditor } from "../components/blog/BlogEditor";
import { Button } from "../components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

export  interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  category: string;
  tags: string[];
  hasUpvoted?: boolean;
}

export const BlogPage = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const currentUserId = "user-123"; // In a real app, this would come from auth context

  const handleCreateNew = () => {
    setEditingPost(null);
    setCurrentView('create');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Hardware Blog</h1>
              <p className="text-gray-400">Share knowledge about hardware components and tech insights</p>
            </div>
            {currentView === 'list' && (
              <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Write Article
              </Button>
            )}
            {currentView !== 'list' && (
              <Button onClick={handleBackToList} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            )}
          </div>
        </div>

        {currentView === 'list' && (
          <BlogList 
            currentUserId={currentUserId} 
            onEditPost={handleEditPost}
          />
        )}
        
        {(currentView === 'create' || currentView === 'edit') && (
          <BlogEditor 
            post={editingPost}
            currentUserId={currentUserId}
            onSave={handleBackToList}
            onCancel={handleBackToList}
          />
        )}
      </div>
    </div>
  );
};
