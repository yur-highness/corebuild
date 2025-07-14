import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Tag, Check } from "lucide-react";
import { toast } from "sonner";

interface CouponSectionProps {
  onCouponApply: (discount: number, couponCode: string) => void;
  appliedCoupon?: { code: string; discount: number } | null;
}

const availableCoupons = [
  { code: "SAVE10", discount: 10, description: "10% off your order" },
  { code: "HARDWARE20", discount: 20, description: "20% off hardware items" },
  { code: "NEWUSER15", discount: 15, description: "15% off for new users" },
];

export const CouponSection = ({ onCouponApply, appliedCoupon }: CouponSectionProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      const validCoupon = availableCoupons.find(
        coupon => coupon.code.toLowerCase() === couponCode.trim().toLowerCase()
      );

      if (validCoupon) {
        onCouponApply(validCoupon.discount, validCoupon.code);
        toast.success(`Coupon applied! ${validCoupon.discount}% discount`);
        setCouponCode("");
      } else {
        toast.error("Invalid coupon code");
      }
      
      setIsApplying(false);
    }, 1000);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Ticket className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Promo Code</h3>
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-medium">{appliedCoupon.code}</span>
              <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                -{appliedCoupon.discount}%
              </Badge>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              />
              <Button
                onClick={handleApplyCoupon}
                disabled={isApplying}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </div>

            {/* Available Coupons */}
            <div className="space-y-2">
              <p className="text-sm text-slate-400 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Available offers:
              </p>
              {availableCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex items-center justify-between p-2 bg-slate-700/50 rounded cursor-pointer hover:bg-slate-700/70 transition-colors"
                  onClick={() => setCouponCode(coupon.code)}
                >
                  <div>
                    <span className="text-blue-400 font-mono text-sm">{coupon.code}</span>
                    <p className="text-xs text-slate-400">{coupon.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                    -{coupon.discount}%
                  </Badge>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
