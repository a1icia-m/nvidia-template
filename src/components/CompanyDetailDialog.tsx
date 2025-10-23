import { Company } from "@/types/company";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactStore } from "@/lib/contactStore";
import { useState, useEffect } from "react";

interface CompanyDetailDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompanyDetailDialog = ({
  company,
  open,
  onOpenChange,
}: CompanyDetailDialogProps) => {
  const [isContacted, setIsContacted] = useState(false);

  useEffect(() => {
    if (company) {
      setIsContacted(contactStore.isContacted(company.id));
    }
  }, [company]);

  const handleToggleContact = () => {
    if (company) {
      contactStore.toggleContact(company.id);
      setIsContacted(!isContacted);
    }
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">{company.name}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.headquarters}</span>
                <span>•</span>
                <span>Founded {company.foundingYear}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {company.scores.total.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Total Score</div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* NCP Contact Status */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">NCP Contact Status</h3>
                <Badge variant={isContacted ? "default" : "secondary"}>
                  {isContacted ? "Contacted" : "Not Contacted"}
                </Badge>
              </div>
              <Button 
                className="w-full" 
                variant={isContacted ? "outline" : "default"}
                onClick={handleToggleContact}
              >
                {isContacted ? "Mark as Not Contacted" : "Mark as Contacted"}
              </Button>
            </div>

            {/* Company Description */}
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{company.description}</p>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <Separator />

            {/* Founding Team */}
            <div>
              <h3 className="font-semibold mb-3">Founding Team</h3>
              <div className="space-y-3">
                {company.leadership.founders.map((founder, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{founder.name}</div>
                        <div className="text-sm text-muted-foreground">{founder.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{founder.background}</p>
                    {founder.previousVentures && founder.previousVentures.length > 0 && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Previous: </span>
                        {founder.previousVentures.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Funding History */}
            <div>
              <h3 className="font-semibold mb-3">Funding History & Investors</h3>
              <div className="bg-primary/10 rounded-lg p-4 mb-3">
                <div className="text-2xl font-bold text-primary">
                  {company.funding.totalRaised >= 1000000000 
                    ? `$${(company.funding.totalRaised / 1000000000).toFixed(1)}B`
                    : `$${(company.funding.totalRaised / 1000000).toFixed(0)}M`
                  }
                </div>
                <div className="text-sm text-muted-foreground">Total Raised</div>
              </div>
              <div className="space-y-3">
                {company.funding.allRounds.map((round, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold">{round.type}</div>
                        <div className="text-xs text-muted-foreground">{round.date}</div>
                      </div>
                      <div className="text-lg font-bold text-success">
                        {round.amount >= 1000000000 
                          ? `$${(round.amount / 1000000000).toFixed(1)}B`
                          : `$${(round.amount / 1000000).toFixed(0)}M`
                        }
                      </div>
                    </div>
                    {round.investors && round.investors.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2 text-muted-foreground">Investors:</div>
                        <div className="flex flex-wrap gap-2">
                          {round.investors.map((investor, investorIdx) => (
                            <Badge key={investorIdx} variant="secondary" className="text-xs">
                              {investor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Ecosystem Positioning */}
            <div>
              <h3 className="font-semibold mb-3">Ecosystem Positioning</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Partnerships:</div>
                  <div className="flex flex-wrap gap-2">
                    {company.partnerships.map((partner, idx) => (
                      <Badge key={idx} variant="secondary">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">NVIDIA Mentions</div>
                    <div className="text-2xl font-bold">{company.nvidiaMentions}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Lighthouse Status</div>
                    <div className="text-2xl font-bold">
                      {company.isLighthouse ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* AI Summary */}
            <div>
              <h3 className="font-semibold mb-3">AI Summary</h3>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">{company.aiSummary}</p>
              </div>
            </div>

            <Separator />

            {/* Research & Reputation - By Founder */}
            <div>
              <h3 className="font-semibold mb-3">Founding Team Research & Reputation</h3>
              <div className="space-y-4">
                {company.leadership.founders.map((founder, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg">{founder.name}</div>
                        <div className="text-sm text-muted-foreground">{founder.role}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="bg-secondary/50 rounded-lg p-3 text-center">
                        <Github className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-bold">{founder.research.githubContributions}</div>
                        <div className="text-xs text-muted-foreground">GitHub</div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3 text-center">
                        <FileText className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-bold">{founder.research.publications}</div>
                        <div className="text-xs text-muted-foreground">Publications</div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3 text-center">
                        <Award className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-bold">{founder.research.patents}</div>
                        <div className="text-xs text-muted-foreground">Patents</div>
                      </div>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="text-xs font-medium mb-1 text-muted-foreground">Reputation Analysis:</div>
                      <p className="text-sm">{founder.research.reputation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* PR Safety & Checkmarks */}
            <div>
              <h3 className="font-semibold mb-3">PR Safety</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={company.prProfile.pressSafe ? "default" : "destructive"}>
                    {company.prProfile.pressSafe ? "Press Safe" : "Needs Review"}
                  </Badge>
                  {company.prProfile.riskFlags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {company.prProfile.riskFlags.map((flag, idx) => (
                        <Badge key={idx} variant="outline" className="text-destructive">
                          ⚠ {flag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Summary:</div>
                  <div className="text-sm text-muted-foreground">
                    {company.prProfile.summary}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Categories:</div>
                  <div className="flex flex-wrap gap-2">
                    {company.prProfile.categories.map((cat, idx) => (
                      <Badge key={idx} variant="outline">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetailDialog;
