import { Company } from "@/types/company";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  onClick?: () => void;
}

const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  return (
    <Card
      className="p-4 hover:border-primary transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            {company.isNCPPartner && (
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {company.foundingYear}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {company.country}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {company.scores.total.toFixed(1)}
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              company.scoreDelta > 0 ? "text-success" : "text-destructive"
            }`}
          >
            {company.scoreDelta > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(company.scoreDelta).toFixed(1)}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {company.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="outline">{company.industry}</Badge>
        {company.isLighthouse && (
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Lighthouse
          </Badge>
        )}
        {company.isDigitalNative && (
          <Badge variant="secondary">Digital Native</Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="font-semibold text-foreground">
            {company.scores.talent}
          </div>
          <div className="text-muted-foreground">Talent</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground">
            {company.scores.market}
          </div>
          <div className="text-muted-foreground">Market</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground">
            {company.scores.ecosystem}
          </div>
          <div className="text-muted-foreground">Ecosystem</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-foreground">
            {company.scores.research}
          </div>
          <div className="text-muted-foreground">Research</div>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;
