import { NewsItem } from "@/types/company";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Minus, TrendingDown } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

const NewsCard = ({ news, onClick }: NewsCardProps) => {
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
    <Card 
      className={`p-4 ${news.isFlagged ? "border-warning bg-warning/5" : ""} ${onClick ? "cursor-pointer hover:border-primary transition-colors" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <SentimentIcon className={`w-5 h-5 mt-1 flex-shrink-0 ${config.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className={`font-semibold text-sm leading-tight ${news.isFlagged ? "text-warning-foreground" : ""}`}>
              {news.title}
            </h4>
            {news.isFlagged && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                <Badge variant="outline" className="text-xs border-warning text-warning">
                  FLAGGED
                </Badge>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
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
    </Card>
  );
};

export default NewsCard;
