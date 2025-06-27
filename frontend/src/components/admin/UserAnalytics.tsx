import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const userData = [
  { month: "Jan", newUsers: 120, activeUsers: 890 },
  { month: "Feb", newUsers: 180, activeUsers: 950 },
  { month: "Mar", newUsers: 150, activeUsers: 920 },
  { month: "Apr", newUsers: 220, activeUsers: 1100 },
  { month: "May", newUsers: 190, activeUsers: 1050 },
  { month: "Jun", newUsers: 250, activeUsers: 1200 },
  { month: "Jul", newUsers: 280, activeUsers: 1300 },
  { month: "Aug", newUsers: 320, activeUsers: 1450 },
  { month: "Sep", newUsers: 290, activeUsers: 1380 },
  { month: "Oct", newUsers: 350, activeUsers: 1520 },
  { month: "Nov", newUsers: 380, activeUsers: 1650 },
  { month: "Dec", newUsers: 420, activeUsers: 1780 },
];

const chartConfig = {
  newUsers: {
    label: "New Users",
    color: "#8b5cf6",
  },
  activeUsers: {
    label: "Active Users",
    color: "#06b6d4",
  },
};

export const UserAnalytics = () => {
  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">User Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={userData}>
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
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};