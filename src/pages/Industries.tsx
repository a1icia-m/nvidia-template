import { useState } from "react";
import { mockIndustries, mockVCs, mockCompanies } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, Building2, Briefcase } from "lucide-react";
import VCDetailDialog from "@/components/VCDetailDialog";
import IndustryDetailDialog from "@/components/IndustryDetailDialog";
import CompanyDetailDialog from "@/components/CompanyDetailDialog";
import { VentureCapital, IndustryData, Company } from "@/types/company";

const Industries = () => {
  const [selectedVC, setSelectedVC] = useState<VentureCapital | null>(null);
  const [vcDialogOpen, setVCDialogOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryData | null>(null);
  const [industryDialogOpen, setIndustryDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);

  const handleVCClick = (vc: VentureCapital) => {
    setSelectedVC(vc);
    setVCDialogOpen(true);
  };

  const handleIndustryClick = (industry: IndustryData) => {
    setSelectedIndustry(industry);
    setIndustryDialogOpen(true);
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setCompanyDialogOpen(true);
  };

  const handleVCCompanyClick = (companyName: string) => {
    const company = mockCompanies.find(c => c.name === companyName);
    if (company) {
      handleCompanyClick(company);
    }
  };
  // Investment trends data - month over month
  const investmentTrendsData = [
    { month: "Jan", funding: 2.1, deals: 15 },
    { month: "Feb", funding: 2.4, deals: 16 },
    { month: "Mar", funding: 2.8, deals: 18 },
    { month: "Apr", funding: 3.2, deals: 19 },
    { month: "May", funding: 3.6, deals: 20 },
    { month: "Jun", funding: 4.0, deals: 22 },
    { month: "Jul", funding: 4.4, deals: 23 },
    { month: "Aug", funding: 4.8, deals: 25 },
    { month: "Sep", funding: 5.2, deals: 27 },
    { month: "Oct", funding: 5.6, deals: 28 },
    { month: "Nov", funding: 6.0, deals: 30 },
    { month: "Dec", funding: 6.4, deals: 32 },
  ];

  // Category data
  const categoryData = mockIndustries.map((ind, idx) => ({
    name: ind.name,
    value: ind.totalFunding / 1000000000,
    color: `hsl(var(--chart-${(idx % 5) + 1}))`,
  }));

  // Portfolio stats
  const totalPortfolioValue = mockIndustries.reduce((sum, ind) => sum + ind.totalFunding, 0);
  const totalActiveCompanies = mockIndustries.reduce((sum, ind) => sum + ind.totalCompanies, 0);
  const avgGrowthRate = mockIndustries.reduce((sum, ind) => sum + ind.growth, 0) / mockIndustries.length;

  // Recent activity stats
  const dealsThisQuarter = 27;
  const q3Investment = 10.8;
  const newExits = 9;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Investment Analytics</h2>
        <p className="text-muted-foreground">
          Portfolio insights and venture capital intelligence
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investments</p>
              <p className="text-2xl font-bold">25</p>
            </div>
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Portfolio</p>
              <p className="text-2xl font-bold">300</p>
            </div>
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investments</p>
              <p className="text-2xl font-bold">20</p>
            </div>
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Portfolio</p>
              <p className="text-2xl font-bold">150</p>
            </div>
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Portfolio Summary */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Portfolio Summary</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <p className="text-2xl font-bold">${(totalPortfolioValue / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Active Companies</p>
              <p className="text-2xl font-bold">{totalActiveCompanies}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Avg Growth Rate</p>
              <p className="text-2xl font-bold">{avgGrowthRate.toFixed(0)}%</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Recent Activity</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Deals This Quarter</p>
              <p className="text-2xl font-bold">{dealsThisQuarter}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Q3 Investment</p>
              <p className="text-2xl font-bold">${q3Investment}B</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">New Exits</p>
              <p className="text-2xl font-bold">{newExits}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Investment Trends & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Investment Trends Month-over-Month</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={investmentTrendsData}>
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="funding" stroke="hsl(var(--primary))" strokeWidth={2} name="Funding ($B)" />
              <Line yAxisId="right" type="monotone" dataKey="deals" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Deals" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">Investments by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                cx="50%" 
                cy="50%" 
                labelLine={true}
                label={(entry) => entry.name}
                outerRadius={90} 
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
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
                          {payload[0].name}: ${(Number(payload[0].value || 0)).toFixed(2)}B
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Venture Capital Firms */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Top Venture Capital Firms</h3>
        </div>

        <Tabs defaultValue="NALA" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="NALA">NALA</TabsTrigger>
            <TabsTrigger value="EMEA">EMEA</TabsTrigger>
            <TabsTrigger value="ROAP">ROAP/Japan</TabsTrigger>
          </TabsList>

          {["NALA", "EMEA", "ROAP/JAPAN"].map((region) => (
            <TabsContent key={region} value={region === "ROAP/JAPAN" ? "ROAP" : region} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockVCs.filter(vc => vc.region === region).map((vc, idx) => (
                  <Card 
                    key={idx} 
                    className="p-5 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleVCClick(vc)}
                  >
                    <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center font-bold text-lg mb-3">
                      {vc.name.charAt(0)}
                    </div>
                    <h4 className="font-semibold mb-1">{vc.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{vc.location}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary">{vc.score}</span>
                      <span className="text-xs text-muted-foreground">Score</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="font-bold">{vc.investments}</div>
                        <div className="text-muted-foreground">Investments</div>
                      </div>
                      <div>
                        <div className="font-bold">{vc.portfolio}</div>
                        <div className="text-muted-foreground">Portfolio</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Industry Breakdown - keeping for reference */}
      <Card className="p-6">
        <h3 className="font-semibold mb-6">Industry Breakdown</h3>
        <div className="space-y-4">
          {mockIndustries.map((industry, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-5 hover:border-primary transition-colors cursor-pointer"
              onClick={() => handleIndustryClick(industry)}
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

      {/* VC Detail Dialog */}
      <VCDetailDialog
        vc={selectedVC}
        open={vcDialogOpen}
        onOpenChange={setVCDialogOpen}
        onCompanyClick={handleVCCompanyClick}
      />

      {/* Industry Detail Dialog */}
      <IndustryDetailDialog
        industry={selectedIndustry}
        open={industryDialogOpen}
        onOpenChange={setIndustryDialogOpen}
        onCompanyClick={handleCompanyClick}
      />

      {/* Company Detail Dialog */}
      <CompanyDetailDialog
        company={selectedCompany}
        open={companyDialogOpen}
        onOpenChange={setCompanyDialogOpen}
      />
    </div>
  );
};

export default Industries;
