import { Card } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const trendData = [
  { month: "Jan", funding: 2.1 },
  { month: "Feb", funding: 2.4 },
  { month: "Mar", funding: 2.8 },
  { month: "Apr", funding: 3.2 },
  { month: "May", funding: 3.6 },
  { month: "Jun", funding: 4.0 },
  { month: "Jul", funding: 4.4 },
  { month: "Aug", funding: 4.8 },
  { month: "Sep", funding: 5.2 },
  { month: "Oct", funding: 5.6 },
  { month: "Nov", funding: 6.0 },
  { month: "Dec", funding: 6.4 },
];

const industryData = [
  { name: "Software", value: 4200, color: "hsl(var(--chart-1))" },
  { name: "FinTech", value: 3200, color: "hsl(var(--chart-2))" },
  { name: "HCLS", value: 2800, color: "hsl(var(--chart-3))" },
  { name: "Energy/Climate", value: 2400, color: "hsl(var(--chart-4))" },
  { name: "Robotics", value: 2200, color: "hsl(var(--chart-5))" },
];

const InvestmentChart = () => {
  return (
    <Card className="p-6 flex-1">
      <h3 className="font-semibold mb-4">Investment Trends</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm text-muted-foreground mb-3">Month-over-Month Funding ($B)</h4>
          <ResponsiveContainer width="100%" height={200}>
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
                  color: "hsl(var(--card-foreground))",
                }}
                labelStyle={{ color: "hsl(var(--card-foreground))" }}
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
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
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
                  color: "hsl(var(--card-foreground))",
                }}
                labelStyle={{ color: "hsl(var(--card-foreground))" }}
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
