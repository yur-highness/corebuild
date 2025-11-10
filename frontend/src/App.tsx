import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext.tsx";
import { ProductDetails } from "../src/pages/ProductDetails.tsx";
import { CartPage } from "../src/pages/Cart.tsx";
import { AdminDashboard } from "../src/pages/AdminDashboard.tsx";
import { BlogPage } from "../src/pages/BlogPage.tsx";
import { HardwareNews } from "../src/pages/HardwareNewsPage.tsx";
import { LoginPage } from "../src/pages/LoginPage.tsx";
import { SignupPage } from "./pages/SignupPage.tsx";
import { WishlistPage } from "./pages/WishListPage.js";
import { WishlistProvider } from "./context/WishListContext.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import EmailVerify from "./pages/EmailVerify.tsx";
import Profile from "./pages/Profile.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import {OrdersDetails}  from "./pages/OrdersDetails.tsx";
import {OrdersPage} from "./pages/OrdersPage.tsx";
import PaymentForm from "./pages/PaymenForm.tsx";


const queryClient = new QueryClient();


const App = () => (


  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <CartProvider>
        <WishlistProvider>
          <CategoryProvider>
            <TooltipProvider>
              <Sonner />
              <BrowserRouter>
                  <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/news" element={<HardwareNews />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                   <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders/:id" element={<OrdersDetails />} />
                    <Route path="/paymentform" element={<PaymentForm />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/email-verify" element={<EmailVerify />} />
                  <Route
                    path="/forgot-password"
                    element={<ResetPasswordPage />}
                  />
                  <Route path="/signup" element={<SignupPage />} />
         
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CategoryProvider>
        </WishlistProvider>
      </CartProvider>
    </AppContextProvider>
  </QueryClientProvider>
);

export default App;
