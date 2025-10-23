import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const companyData = [
  { category: "NCP Partners", count: 12, color: "hsl(var(--chart-1))" },
  { category: "Digital Natives", count: 45, color: "hsl(var(--chart-2))" },
  { category: "AI Natives", count: 78, color: "hsl(var(--chart-3))" },
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
    <Card className="p-6 flex-1 flex flex-col">
      <h3 className="font-semibold mb-6">Company Overview</h3>
      
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <h4 className="text-sm text-muted-foreground mb-3">Company Categories</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [`${value} companies`, 'Count']}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col items-center">
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
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        color: "hsl(var(--foreground))",
                        fontSize: "12px"
                      }}>
                        <p style={{ color: "hsl(var(--foreground))", margin: 0 }}>
                          {payload[0].name}: ${(Number(payload[0].value || 0) / 1000).toFixed(1)}B
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3 w-full max-w-xs mx-auto">
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

