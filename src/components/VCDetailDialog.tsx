import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VentureCapital } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Building2, Calendar, TrendingUp, Sparkles } from "lucide-react";

interface VCDetailDialogProps {
  vc: VentureCapital | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VCDetailDialog = ({ vc, open, onOpenChange }: VCDetailDialogProps) => {
  if (!vc) return null;

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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{vc.name}</DialogTitle>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {vc.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Founded {vc.foundingYear}
                </span>
                <span>•</span>
                <a
                  href={vc.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Website
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{vc.score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="px-6 pb-6 space-y-6">
            {/* Description */}
            <div>
              <p className="text-muted-foreground">{vc.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Region</p>
                <p className="text-xl font-bold">{vc.region}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Active Investments</p>
                <p className="text-xl font-bold">{vc.investments}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Portfolio</p>
                <p className="text-xl font-bold">{vc.portfolio}</p>
              </div>
            </div>

            <Separator />

            {/* Portfolio Companies */}
            {vc.portfolioCompanies.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Portfolio Companies
                </h3>
                <div className="space-y-3">
                  {vc.portfolioCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{company.companyName}</h4>
                          <p className="text-sm text-muted-foreground">{company.industry}</p>
                        </div>
                        <Badge variant="outline">{company.investmentStage}</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Investment: </span>
                        <span className="font-semibold">
                          ${(company.investmentAmount / 1000000).toFixed(0)}M
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent News */}
            {vc.recentNews.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Recent News
                  </h3>
                  <div className="space-y-3">
                    {vc.recentNews.map((news, idx) => (
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

            {/* AI Summary */}
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Intelligence Summary
              </h3>
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-primary">
                    Overview
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vc.aiSummary.overview}
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-primary">
                    NVIDIA Relevance
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vc.aiSummary.nvidiaRelevance}
                  </p>
                </div>
                <div className="bg-success/10 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 text-success">
                    NCP Partnership Opportunities
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vc.aiSummary.ncpOpportunities}
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

export default VCDetailDialog;
