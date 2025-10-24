import { useState, useEffect } from "react";
import { mockCompanies, mockNews } from "@/data/mockData";
import NewsCard from "@/components/NewsCard";
import NewestCompaniesCard from "@/components/NewestCompaniesCard";
import InvestmentChart from "@/components/InvestmentChart";
import CompanyDetailDialog from "@/components/CompanyDetailDialog";
import NewsDetailDialog from "@/components/NewsDetailDialog";
import { Company, NewsItem } from "@/types/company";
import { contactStore } from "@/lib/contactStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Filter, Users, UserCheck, UserX, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Overview = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const [contactStats, setContactStats] = useState(contactStore.getContactStats());
  const [newContactsDialogOpen, setNewContactsDialogOpen] = useState(false);

  useEffect(() => {
    contactStore.setTotalCompanies(mockCompanies.length);
    setContactStats(contactStore.getContactStats());
    
    const unsubscribe = contactStore.subscribe(() => {
      setContactStats(contactStore.getContactStats());
    });
    return unsubscribe;
  }, []);

  // Filter data based on time period
  const getFilteredData = () => {
    // For demo purposes, we'll simulate filtering by adjusting the score deltas
    // In a real app, this would filter by actual timestamps
    const multiplier = {
      weekly: 0.25,
      monthly: 1,
      quarterly: 3,
      yearly: 12,
    }[timeFilter] || 1;

    return mockCompanies.map(company => ({
      ...company,
      scoreDelta: company.scoreDelta * multiplier,
    }));
  };

  const filteredCompanies = getFilteredData();

  const biggestMovers = [...filteredCompanies]
    .sort((a, b) => Math.abs(b.scoreDelta) - Math.abs(a.scoreDelta))
    .slice(0, 5);

  const topCompanies = [...filteredCompanies]
    .sort((a, b) => b.scores.total - a.scores.total);

  const allNews = [...mockNews].sort((a, b) => b.importance - a.importance);

  // Filter news based on time period
  const getFilteredNews = () => {
    const now = new Date();
    const timeFilterMap = {
      weekly: 7,
      monthly: 30,
      quarterly: 90,
      yearly: 365,
    };
    
    const daysBack = timeFilterMap[timeFilter as keyof typeof timeFilterMap] || 30;
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    return allNews.filter(news => {
      const newsDate = new Date(news.date);
      return newsDate >= cutoffDate;
    });
  };

  const filteredNews = getFilteredNews();

  // Get newest companies (founded in last 3 years or recent funding)
  const newestCompanies = [...filteredCompanies]
    .filter(company => {
      const currentYear = new Date().getFullYear();
      const isNewCompany = currentYear - company.foundingYear <= 3;
      const hasRecentFunding = currentYear - parseInt(company.funding.latestRound.date.split('-')[0]) <= 1;
      return isNewCompany || hasRecentFunding;
    })
    .sort((a, b) => {
      // Sort by founding year (newest first), then by funding date
      const yearDiff = b.foundingYear - a.foundingYear;
      if (yearDiff !== 0) return yearDiff;
      return b.funding.latestRound.date.localeCompare(a.funding.latestRound.date);
    })
    .slice(0, 6);

  // Contact tracking stats
  const totalCompanies = filteredCompanies.length;
  const contactedByNCP = contactStats.contacted;
  const notContacted = totalCompanies - contactedByNCP;
  const newToContactToday = contactStats.newToContactToday;
  const contactProgress = (contactedByNCP / totalCompanies) * 100;

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setDialogOpen(true);
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setNewsDialogOpen(true);
  };

  const newlyContactedCompanyIds = contactStore.getNewlyContactedCompanies();
  const newlyContactedCompanies = mockCompanies.filter(c => newlyContactedCompanyIds.includes(c.id));
  
  const companiesToContactTodayIds = contactStore.getCompaniesToContactToday();
  const companiesToContactToday = mockCompanies.filter(c => companiesToContactTodayIds.includes(c.id));

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Progress Tracker */}
      <div className="mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Company Outreach Progress</h3>
            <div className="flex items-center gap-6 text-base">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-success" />
                <span>Contacted: <strong className="text-lg">{contactedByNCP}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <UserX className="w-5 h-5 text-destructive" />
                <span>Not Contacted: <strong className="text-lg">{notContacted}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span>Total: <strong className="text-lg">{totalCompanies}</strong></span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Contact Progress</span>
              <span 
                className="font-semibold cursor-pointer hover:underline"
                onClick={() => newToContactToday > 0 && setNewContactsDialogOpen(true)}
              >
                <span className="text-primary">{newToContactToday} new</span> companies to contact today
              </span>
            </div>
            <Progress value={contactProgress} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Header with Time Filter */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold"><span className="text-primary">NVIDIA</span> Digital/AI Natives on NCP</h2>
          <p className="text-muted-foreground mt-1">
            Dashboard Overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* News and Newest Companies Section - Side by Side */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Section - 66% width (2/3) */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">News</h3>
                <div className="text-xs text-muted-foreground">
                  Filtered by: {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
                </div>
              </div>
              <ScrollArea className="h-[200px] pr-4">
                {filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredNews.slice(0, 6).map((news) => (
                      <NewsCard 
                        key={news.id} 
                        news={news} 
                        onClick={() => handleNewsClick(news)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <p className="text-sm">No news found for the selected time period</p>
                      <p className="text-xs mt-1">Try selecting a longer time period</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Newest Companies Section - 33% width (1/3) */}
          <div className="lg:col-span-1 bg-card border border-border rounded-lg p-5">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Newest Companies</h3>
              </div>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-3">
                  {newestCompanies.map((company) => (
                    <NewestCompaniesCard 
                      key={company.id} 
                      company={company} 
                      onClick={() => handleCompanyClick(company)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Biggest Movers - Left Column */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              Biggest Movers
              <span className="text-xs text-muted-foreground font-normal">
                (by score Δ)
              </span>
            </h3>
            <div className="space-y-4">
              {biggestMovers.map((company, index) => (
                <div
                  key={company.id}
                  className="border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="bg-primary/20 text-primary rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="font-semibold text-sm">{company.name}</h4>
                            {company.isNCPPartner && (
                              <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">Rank #{company.overallRank}</div>
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            company.scoreDelta > 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {company.scoreDelta > 0 ? "+" : ""}
                          {company.scoreDelta.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Founded: {company.foundingYear}</div>
                    <div>
                      Team: {company.leadership.founders.map((f) => f.name).join(", ")}
                    </div>
                    <div className="font-semibold text-foreground mt-2">
                      Latest: {company.funding.latestRound.type} - $
                      {(company.funding.latestRound.amount / 1000000).toFixed(0)}M
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Companies - Middle Column */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-card border border-border rounded-lg p-5 flex flex-col" style={{ height: "600px" }}>
            <h3 className="font-semibold mb-4">Top Companies</h3>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {topCompanies.map((company, index) => (
                  <div
                    key={company.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleCompanyClick(company)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="font-semibold">{company.name}</h4>
                              {company.isNCPPartner && (
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {company.industry} • {company.country}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {company.scores.total.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-xs mt-3">
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
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Investment Trends - Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="space-y-6 h-full">

            {/* Investment Trends */}
            <InvestmentChart />
          </div>
        </div>
      </div>

      {/* Company Detail Dialog */}
      <CompanyDetailDialog
        company={selectedCompany}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* News Detail Dialog */}
      <NewsDetailDialog
        news={selectedNews}
        open={newsDialogOpen}
        onOpenChange={setNewsDialogOpen}
      />

      {/* Companies to Contact Today Dialog */}
      <Dialog open={newContactsDialogOpen} onOpenChange={setNewContactsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Companies to Contact Today ({companiesToContactToday.length})</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-3">
              {companiesToContactToday.length > 0 ? (
                companiesToContactToday.map((company) => (
                  <div
                    key={company.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => {
                      setNewContactsDialogOpen(false);
                      handleCompanyClick(company);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="font-semibold">{company.name}</h4>
                              {company.isNCPPartner && (
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {company.industry} • {company.country}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {company.scores.total.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-xs mt-3">
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
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No companies to contact today</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Overview;
