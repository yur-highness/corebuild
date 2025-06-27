import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface Variant {
  name: string;
  price: number;
  available: boolean;
}

interface ProductControlsProps {
  variants: Variant[];
  selectedVariant: number;
  onVariantChange: (value: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  currentPrice: number;
  isAvailable: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductControls = ({
  variants,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
  currentPrice,
  isAvailable,
  onAddToCart,
  onBuyNow
}: ProductControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      {variants.length > 1 && (
        <div>
          <label className="block text-white font-medium mb-2">Version:</label>
          <Select value={selectedVariant.toString()} onValueChange={onVariantChange}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {variants.map((variant, index) => (
                <SelectItem 
                  key={index} 
                  value={index.toString()}
                  disabled={!variant.available}
                  className="text-white"
                >
                  {variant.name} - ${variant.price} {!variant.available && "(Out of Stock)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <label className="block text-white font-medium mb-2">Quantity:</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-white font-medium w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(quantity + 1)}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={!isAvailable}
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAvailable ? `Add to Cart - $${(currentPrice * quantity).toFixed(2)}` : "Out of Stock"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-slate-600 text-white hover:bg-slate-700"
          disabled={!isAvailable}
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-slate-300">
          {isAvailable ? "In Stock - Ships within 24 hours" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};