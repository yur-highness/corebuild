import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CartProvider } from "../src/context/CardContext";
import {ProductPage} from "../src/pages/ProductDetails.tsx";
import {CartPage} from "../src/pages/Cart.tsx";
import {AdminDashboard} from "../src/pages/AdminDashboard.tsx";
import {BlogPage} from "../src/pages/BlogPage.tsx";


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>

        <Sonner />
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
             <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/blog" element={<BlogPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;