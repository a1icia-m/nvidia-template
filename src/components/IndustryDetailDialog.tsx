import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IndustryData, Company } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Building2, Sparkles, DollarSign, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IndustryDetailDialogProps {
  industry: IndustryData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompanyClick: (company: Company) => void;
}

const IndustryDetailDialog = ({
  industry,
  open,
  onOpenChange,
  onCompanyClick,
}: IndustryDetailDialogProps) => {
  if (!industry) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{industry.name}</DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {industry.totalCompanies} companies
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ${(industry.totalFunding / 1000000000).toFixed(2)}B total funding
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {industry.averageScore.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="px-6 pb-6 space-y-6">
            {/* Investment Trends Chart */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Investment Trends - {industry.name}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={industry.investmentTrends}>
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
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
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="funding"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Funding ($B)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="deals"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Deals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Separator />

            {/* Companies in Space */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Top Companies in {industry.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industry.topCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => onCompanyClick(company)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {company.country} • Founded {company.foundingYear}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          {company.scores.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs mt-3">
                      <div className="text-center">
                        <div className="font-semibold">{company.scores.talent}</div>
                        <div className="text-muted-foreground">Talent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{company.scores.market}</div>
                        <div className="text-muted-foreground">Market</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{company.scores.ecosystem}</div>
                        <div className="text-muted-foreground">Eco</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{company.scores.research}</div>
                        <div className="text-muted-foreground">Research</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent News */}
            {industry.recentNews.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Recent Industry News
                  </h3>
                  <div className="space-y-3">
                    {industry.recentNews.map((news, idx) => (
                      <div
                        key={idx}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold flex-1">{news.title}</h4>
                          <Badge
                            variant="outline"
                            className={getSentimentColor(news.sentiment)}
                          >
                            {news.sentiment}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{news.source}</span>
                          <span>•</span>
                          <span>{news.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{news.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* AI Analysis */}
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Sector Analysis
              </h3>
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-primary">
                    Overview
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.aiAnalysis.overview}
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-primary">
                    Future Outlook & Key Trends
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.aiAnalysis.futureOutlook}
                  </p>
                  <Separator className="my-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.aiAnalysis.keyTrends}
                  </p>
                </div>
                <div className="bg-success/10 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-success">
                    NCP Partnership Opportunities
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.aiAnalysis.ncpOpportunities}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryDetailDialog;