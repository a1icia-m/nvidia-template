import { Company } from "@/types/company";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, TrendingUp } from "lucide-react";

interface NewestCompaniesCardProps {
  company: Company;
  onClick?: () => void;
}

const NewestCompaniesCard = ({ company, onClick }: NewestCompaniesCardProps) => {
  const isNew = new Date().getFullYear() - company.foundingYear <= 2;
  const isRecentFunding = new Date().getFullYear() - parseInt(company.funding.latestRound.date.split('-')[0]) <= 1;

  return (
    <Card
      className={`p-3 ${onClick ? "cursor-pointer hover:border-primary transition-colors" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1">
              <h4 className="font-semibold text-sm">{company.name}</h4>
              {company.isNCPPartner && (
                <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">
                {company.scores.total.toFixed(1)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mb-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {company.industry}
            </Badge>
            {isNew && (
              <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                <Calendar className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
            {isRecentFunding && (
              <Badge variant="default" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Funded
              </Badge>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>Founded: {company.foundingYear}</div>
            <div>HQ: {company.headquarters}</div>
            <div className="font-semibold text-foreground mt-1">
              Latest: {company.funding.latestRound.type} - $
              {(company.funding.latestRound.amount / 1000000).toFixed(0)}M
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewestCompaniesCard;
