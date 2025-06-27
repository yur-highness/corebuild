import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

const salesData = [
  { month: "Jan", revenue: 12000, orders: 240 },
  { month: "Feb", revenue: 19000, orders: 380 },
  { month: "Mar", revenue: 15000, orders: 300 },
  { month: "Apr", revenue: 25000, orders: 500 },
  { month: "May", revenue: 22000, orders: 440 },
  { month: "Jun", revenue: 30000, orders: 600 },
  { month: "Jul", revenue: 28000, orders: 560 },
  { month: "Aug", revenue: 35000, orders: 700 },
  { month: "Sep", revenue: 32000, orders: 640 },
  { month: "Oct", revenue: 38000, orders: 760 },
  { month: "Nov", revenue: 42000, orders: 840 },
  { month: "Dec", revenue: 45000, orders: 900 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
  orders: {
    label: "Orders",
    color: "#10b981",
  },
};

export const SalesChart = () => {
  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};