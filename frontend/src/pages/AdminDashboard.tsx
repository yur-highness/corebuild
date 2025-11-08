import { Header } from "../components/Header";
import { DashboardStats } from "../components/admin/DashboardStats";
import { SalesChart } from "../components/admin/SalesChart";
import { OrdersTable } from "../components/admin/OrdersTable";
import { ProductsChart } from "../components/admin/ProductsChart";
import { UserAnalytics } from "../components/admin/UserAnalytics";
import { RecentActivity } from "../components/admin/RecentActivity";
import { AddProductForm } from "../components/admin/AddProductForm";
import { AdminManagement } from "../components/admin/AdminManagemen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Package, Users, Settings } from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your ecommerce platform with comprehensive analytics</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Stats */}
            <DashboardStats />
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <UserAnalytics />
            </div>
            
            {/* Products and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProductsChart />
              </div>
              <RecentActivity />
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-6">
              <AddProductForm />
              <ProductsChart />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};