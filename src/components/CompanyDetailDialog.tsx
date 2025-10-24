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
import { ExternalLink, Github, FileText, Award, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactStore } from "@/lib/contactStore";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
      const newContactedState = !isContacted;
      contactStore.toggleContact(company.id);
      setIsContacted(newContactedState);
      
      // Trigger confetti when marking as contacted
      if (newContactedState) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
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

            {/* Company Overview - Combined Team & Funding */}
            <div>
              <h3 className="font-semibold mb-3">Company Overview</h3>
              
              {/* Funding Summary */}
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
            <div>
                <div className="text-2xl font-bold text-primary">
                  {company.funding.totalRaised >= 1000000000 
                    ? `$${(company.funding.totalRaised / 1000000000).toFixed(1)}B`
                    : `$${(company.funding.totalRaised / 1000000).toFixed(0)}M`
                  }
                </div>
                <div className="text-sm text-muted-foreground">Total Raised</div>
              </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{company.funding.allRounds.length} Rounds</div>
                    <div className="text-xs text-muted-foreground">Latest: {company.funding.allRounds[0]?.type}</div>
                  </div>
                </div>
              </div>

              {/* Founding Team with Research - Combined */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Founding Team & Research</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {company.leadership.founders.map((founder, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{founder.name}</div>
                          <div className="text-xs text-muted-foreground mb-1">{founder.role}</div>
                          <div className="text-xs text-muted-foreground">{founder.background}</div>
                          {founder.previousVentures && founder.previousVentures.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Previous: {founder.previousVentures.join(", ")}
                            </div>
                          )}
                        </div>
                        {/* LinkedIn button only for specific verified profiles */}
                        {founder.name === "Ilya Sutskever" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0"
                            onClick={() => window.open("https://www.linkedin.com/in/ilya-sutskever/", '_blank')}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {founder.name === "Reid Hoffman" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0"
                            onClick={() => window.open("https://linkedin.com/in/reidhoffman", '_blank')}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {founder.name === "Nick Frosst" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0"
                            onClick={() => window.open("https://www.linkedin.com/in/nick-frosst-19b80463/", '_blank')}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {/* Research Metrics */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-secondary/50 rounded p-2 text-center">
                          <Github className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <div className="font-bold text-sm">{founder.research.githubContributions}</div>
                          <div className="text-xs text-muted-foreground">GitHub</div>
                        </div>
                        <div className="bg-secondary/50 rounded p-2 text-center">
                          <FileText className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <div className="font-bold text-sm">{founder.research.publications}</div>
                          <div className="text-xs text-muted-foreground">Publications</div>
                        </div>
                        <div className="bg-secondary/50 rounded p-2 text-center">
                          <Award className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <div className="font-bold text-sm">{founder.research.patents}</div>
                          <div className="text-xs text-muted-foreground">Patents</div>
                        </div>
                      </div>

                      {/* Reputation */}
                      <div className="bg-secondary/30 rounded p-2">
                        <div className="text-xs font-medium mb-1 text-muted-foreground">Reputation:</div>
                        <p className="text-xs">{founder.research.reputation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Head of Partnerships */}
              {company.leadership.partnerships?.headOfPartnerships && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Partnerships Contact</h4>
                  <div className="border border-border rounded-lg p-3 bg-primary/5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{company.leadership.partnerships.headOfPartnerships.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{company.leadership.partnerships.headOfPartnerships.role}</div>
                        <div className="text-xs text-muted-foreground">{company.leadership.partnerships.headOfPartnerships.background}</div>
                        {company.leadership.partnerships.headOfPartnerships.email && (
                          <div className="text-xs text-primary mt-1">{company.leadership.partnerships.headOfPartnerships.email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Funding Rounds - Compact */}
              <div>
                <h4 className="font-medium mb-2">Recent Funding</h4>
                <div className="space-y-2">
                  {company.funding.allRounds.slice(0, 3).map((round, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-border rounded p-2">
                      <div>
                        <div className="font-medium text-sm">{round.type}</div>
                        <div className="text-xs text-muted-foreground">{round.date}</div>
                      </div>
                      <div className="text-sm font-bold text-success">
                        {round.amount >= 1000000000 
                          ? `$${(round.amount / 1000000000).toFixed(1)}B`
                          : `$${(round.amount / 1000000).toFixed(0)}M`
                        }
                      </div>
                    </div>
                          ))}
                        </div>
              </div>
            </div>

            <Separator />

            {/* Ecosystem Positioning */}
            <div>
              <h3 className="font-semibold mb-3">Ecosystem Positioning</h3>
              
              {/* Partnerships & Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Partnerships */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h4 className="font-semibold text-primary text-sm">Strategic Partnerships</h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {company.partnerships.map((partner, idx) => (
                      <Badge key={idx} variant="default" className="bg-primary/10 text-primary border-primary/30 text-xs px-1 py-0">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">NVIDIA Mentions</div>
                    <div className="text-lg font-semibold">{company.nvidiaMentions}</div>
                    <div className="text-xs text-muted-foreground">Press/Media</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Lighthouse</div>
                    <div className="text-lg font-semibold">
                      {company.isLighthouse ? "✓" : "○"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {company.isLighthouse ? "Featured" : "Standard"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* AI Summary & PR Safety - Combined */}
            <div>
              <h3 className="font-semibold mb-3">AI Analysis & PR Safety</h3>
              
              {/* AI Summary */}
              <div className="bg-primary/10 rounded-lg p-3 mb-4">
                <h4 className="font-medium mb-2">AI Summary</h4>
                <p className="text-sm text-muted-foreground">{company.aiSummary}</p>
                    </div>
                    
              {/* PR Safety */}
            <div>
                <h4 className="font-medium mb-2">PR Safety</h4>
                <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={company.prProfile.pressSafe ? "default" : "destructive"}>
                    {company.prProfile.pressSafe ? "Press Safe" : "Needs Review"}
                  </Badge>
                  {company.prProfile.riskFlags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                      {company.prProfile.riskFlags.map((flag, idx) => (
                          <Badge key={idx} variant="outline" className="text-destructive text-xs px-1 py-0">
                          ⚠ {flag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                  <div className="bg-secondary/50 rounded p-2">
                    <div className="text-xs font-medium mb-1">Summary:</div>
                    <div className="text-xs text-muted-foreground">
                    {company.prProfile.summary}
                  </div>
                </div>
                <div>
                    <div className="text-xs font-medium mb-1">Categories:</div>
                    <div className="flex flex-wrap gap-1">
                    {company.prProfile.categories.map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                        {cat}
                      </Badge>
                    ))}
                    </div>
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
