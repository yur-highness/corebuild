import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/CategoryContext";

const categories = [
  { name: "All Products" },
  { name: "CPUs" },
  { name: "Graphics Cards" },
  { name: "Motherboards" },
  { name: "Memory" },
  { name: "Storage" },
  { name: "Cases" },
];

export const CategoryNav = () => {
  const { activeCategory, setActiveCategory } = useCategory();

  return (
    <section className="py-8 px-4 border-b border-white/10 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "ghost"}
              className={
                activeCategory === category.name
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
