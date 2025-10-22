import { NewsItem } from "@/types/company";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Minus, TrendingDown, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NewsDetailDialogProps {
  news: NewsItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewsDetailDialog = ({ news, open, onOpenChange }: NewsDetailDialogProps) => {
  if (!news) return null;

  const sentimentConfig = {
    positive: {
      icon: TrendingUp,
      color: "text-success",
      badge: "bg-success/20 text-success border-success/30",
    },
    neutral: {
      icon: Minus,
      color: "text-muted-foreground",
      badge: "bg-muted text-muted-foreground",
    },
    negative: {
      icon: TrendingDown,
      color: "text-destructive",
      badge: "bg-destructive/20 text-destructive border-destructive/30",
    },
  };

  const config = sentimentConfig[news.sentiment];
  const SentimentIcon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <SentimentIcon className={`w-6 h-6 mt-1 flex-shrink-0 ${config.color}`} />
            <div className="flex-1">
              <DialogTitle className="text-xl leading-tight mb-3">{news.title}</DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {news.source}
                </Badge>
                <Badge className={`text-xs ${config.badge}`}>
                  {news.sentiment}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(news.date).toLocaleDateString()}
                </span>
                <span className="text-xs font-semibold text-primary">
                  Impact: {news.importance}/10
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Article Summary */}
          <div>
            <h3 className="font-semibold mb-2">Article Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{news.summary}</p>
          </div>

          <Separator />

          {/* AI Analysis */}
          <div className="bg-secondary/50 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">AI Analysis</h3>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Brief Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {news.aiSummary.briefSummary}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-semibold mb-2 text-primary">NCP Relevance</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {news.aiSummary.ncpRelevance}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-semibold mb-2 text-primary">NVIDIA Relationship Implications</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {news.aiSummary.nvidiaRelationship}
              </p>
            </div>
          </div>

          {/* Read Full Article */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => window.open(news.url, '_blank')}
              className="gap-2"
            >
              Read Full Article
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetailDialog;
