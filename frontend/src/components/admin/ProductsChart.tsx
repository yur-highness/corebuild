import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis} from "recharts";

const productData = [
  { category: "Graphics Cards", sales: 450, revenue: 180000 },
  { category: "Processors", sales: 380, revenue: 152000 },
  { category: "Motherboards", sales: 320, revenue: 96000 },
  { category: "Memory", sales: 290, revenue: 58000 },
  { category: "Storage", sales: 420, revenue: 126000 },
  { category: "Cases", sales: 200, revenue: 40000 },
  { category: "PSU", sales: 180, revenue: 36000 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#f59e0b",
  },
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
};

export const ProductsChart = () => {
  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={productData}>
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sales" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};