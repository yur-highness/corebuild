import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductInfoProps {
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice?: number;
  description: string;
}

export const ProductInfo = ({ 
  category, 
  name, 
  rating, 
  reviewCount, 
  currentPrice, 
  originalPrice, 
  description 
}: ProductInfoProps) => {
  return (
    <div>
      <Badge className="mb-2 bg-blue-600">{category}</Badge>
      <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
          ))}
        </div>
        <span className="text-slate-300">({reviewCount} reviews)</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-white">${currentPrice}</span>
        {originalPrice && (
          <span className="text-xl text-slate-400 line-through">${originalPrice}</span>
        )}
        {originalPrice && (
          <Badge className="bg-red-600">
            Save ${(originalPrice - currentPrice).toFixed(2)}
          </Badge>
        )}
      </div>

      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
};