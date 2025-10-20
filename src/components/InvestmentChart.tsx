import { Card } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const trendData = [
  { month: "Jun", funding: 2.1 },
  { month: "Jul", funding: 3.4 },
  { month: "Aug", funding: 2.8 },
  { month: "Sep", funding: 4.2 },
  { month: "Oct", funding: 5.8 },
];

const industryData = [
  { name: "GenAI", value: 10088, color: "hsl(var(--chart-1))" },
  { name: "AI Infra", value: 2400, color: "hsl(var(--chart-2))" },
  { name: "Robotics", value: 1800, color: "hsl(var(--chart-3))" },
  { name: "AI for Good", value: 890, color: "hsl(var(--chart-4))" },
];

const InvestmentChart = () => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Investment Trends</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm text-muted-foreground mb-3">Monthly Funding ($B)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={trendData}>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="funding"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm text-muted-foreground mb-3">Industry Allocation</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: number) => `$${(value / 1000).toFixed(1)}B`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {industryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentChart;
