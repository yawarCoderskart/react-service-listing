
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserProfile from "./pages/admin/UserProfile";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Services from "./pages/admin/Services";
import ScrollToTop from "./components/ScrollToTop";
import ContactUs from "./components/ContactUs";
import ContactUsList from "./pages/admin/ContactUsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="contact_us" element={<ContactUsList />} />
            <Route path="users" element={<Users />} />
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
