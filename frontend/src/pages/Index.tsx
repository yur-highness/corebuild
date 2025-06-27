import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { CategoryNav } from "../components/CategoryNav";
import { Header } from "../components/Header";
import { Features } from "../components/Features";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

/**
 * The home page of the application.
 *
 * This component renders the main page of the application, which includes the
 * header, hero, category navigation, product grid, features, newsletter, and
 * footer components.
 *
 * @returns The home page of the application.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />
      <Hero />
      <CategoryNav />
      <ProductGrid />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;