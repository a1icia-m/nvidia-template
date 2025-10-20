import { mockIndustries, mockCompanies } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, Building2 } from "lucide-react";

const Industries = () => {
  const chartData = mockIndustries.map((ind) => ({
    name: ind.name,
    score: ind.averageScore,
    funding: ind.totalFunding / 1000000000, // Convert to billions
    companies: ind.totalCompanies,
  }));

  const pieData = mockIndustries.map((ind, idx) => ({
    name: ind.name,
    value: ind.totalFunding,
    color: `hsl(var(--chart-${(idx % 5) + 1}))`,
  }));

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Industries Overview</h2>
        <p className="text-muted-foreground">
          Sector analysis and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Industries</p>
              <p className="text-3xl font-bold">{mockIndustries.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Funding</p>
              <p className="text-3xl font-bold">
                ${(mockIndustries.reduce((sum, ind) => sum + ind.totalFunding, 0) / 1000000000).toFixed(1)}B
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Growth</p>
              <p className="text-3xl font-bold">
                {(mockIndustries.reduce((sum, ind) => sum + ind.growth, 0) / mockIndustries.length).toFixed(0)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance by Industry */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Average Score by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Funding Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Funding Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: number) => `$${(value / 1000000000).toFixed(2)}B`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Industry Details Table */}
      <Card className="p-6">
        <h3 className="font-semibold mb-6">Industry Breakdown</h3>
        <div className="space-y-4">
          {mockIndustries.map((industry, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-5 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold mb-1">{industry.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {industry.totalCompanies} companies tracked
                  </p>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  +{industry.growth}% Growth
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {industry.averageScore.toFixed(1)}
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Funding</p>
                  <p className="text-2xl font-bold text-success">
                    ${(industry.totalFunding / 1000000000).toFixed(2)}B
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Avg per Company</p>
                  <p className="text-2xl font-bold">
                    ${(industry.totalFunding / industry.totalCompanies / 1000000).toFixed(0)}M
                  </p>
                </div>
              </div>

              {industry.topCompanies.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Top Companies:</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.topCompanies.slice(0, 5).map((company) => (
                      <Badge key={company.id} variant="outline">
                        {company.name} ({company.scores.total.toFixed(1)})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Industries;
