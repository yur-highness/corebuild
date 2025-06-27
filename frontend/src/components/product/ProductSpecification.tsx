import { Card, CardContent } from "@/components/ui/card";

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
  features: string[];
}

export const ProductSpecifications = ({ specifications, features }: ProductSpecificationsProps) => {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
          <div className="space-y-3">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-slate-400">{key}:</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-slate-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
