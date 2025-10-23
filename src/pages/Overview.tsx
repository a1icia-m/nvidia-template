import { useState, useEffect } from "react";
import { mockCompanies, mockNews } from "@/data/mockData";
import NewsCard from "@/components/NewsCard";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Filter, Users, UserCheck, UserX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Overview = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const [contactStats, setContactStats] = useState(contactStore.getContactStats());

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

  const flaggedNews = mockNews.filter((n) => n.isFlagged);
  const allNews = mockNews;

  // Contact tracking stats
  const totalCompanies = filteredCompanies.length;
  const contactedByNCP = contactStats.contacted;
  const notContacted = totalCompanies - contactedByNCP;
  const newToContactToday = 3;
  const contactProgress = (contactedByNCP / totalCompanies) * 100;

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setDialogOpen(true);
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setNewsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Progress Tracker */}
      <div className="mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Company Outreach Progress</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-success" />
                <span>Contacted by NCP: <strong>{contactedByNCP}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-destructive" />
                <span>Not Contacted: <strong>{notContacted}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Total: <strong>{totalCompanies}</strong></span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Contact Progress</span>
              <span className="font-semibold">
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
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">
            Digital & AI Natives Research
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

      {/* News Section - Horizontal Rectangle */}
      <div className="mb-8">
        <div className="bg-card border border-border rounded-lg p-5">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">News</h3>
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="flagged"
                  className="text-xs"
                >
                  Flagged ({flaggedNews.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[200px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {allNews.slice(0, 6).map((news) => (
                    <NewsCard 
                      key={news.id} 
                      news={news} 
                      onClick={() => handleNewsClick(news)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="flagged" className="mt-0">
              <ScrollArea className="h-[200px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {flaggedNews.slice(0, 6).map((news) => (
                    <NewsCard 
                      key={news.id} 
                      news={news}
                      onClick={() => handleNewsClick(news)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
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
                          <h4 className="font-semibold text-sm">{company.name}</h4>
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
          <div className="bg-card border border-border rounded-lg p-5 h-full">
            <h3 className="font-semibold mb-4">Top Companies</h3>
            <ScrollArea className="h-[calc(100%-40px)] pr-4">
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
                            <h4 className="font-semibold">{company.name}</h4>
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
    </div>
  );
};

export default Overview;
