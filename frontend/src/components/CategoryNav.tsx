import { Button } from "../components/ui/button";

const categories = [
  { name: "All Products", active: true },
  { name: "CPUs" },
  { name: "Graphics Cards" },
  { name: "Motherboards" },
  { name: "Memory" },
  { name: "Storage" },
  { name: "Cases" },
];

export const CategoryNav = () => {
  return (
    <section className="py-8 px-4 border-b border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "ghost"}
              className={
                category.active
                  ? "bg-gradient-to-r from-blue-200 to-gray-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
