import { Shield, Truck, Award, Headphones } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "Comprehensive warranty coverage on all hardware components with hassle-free claims."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free expedited shipping on orders over $299. Get your build components quickly."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only authentic, brand-new components from authorized distributors and manufacturers."
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical support from certified PC building experts to help with your build."
    }
  ];

  return (
    <section className="py-20 px-4 bg-zinc-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose CoreBuild?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We're committed to providing the best PC building experience with premium components and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};