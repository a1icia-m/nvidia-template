import { useState } from "react";
import { mockCompanies } from "@/data/mockData";
import CompanyCard from "@/components/CompanyCard";
import CompanyDetailDialog from "@/components/CompanyDetailDialog";
import { Company } from "@/types/company";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);

  const industries = ["all", ...Array.from(new Set(mockCompanies.map((c) => c.industry)))];

  const filteredCompanies = mockCompanies
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry =
        industryFilter === "all" || company.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.scores.total - a.scores.total;
        case "name":
          return a.name.localeCompare(b.name);
        case "funding":
          return b.funding.totalRaised - a.funding.totalRaised;
        case "momentum":
          return Math.abs(b.scoreDelta) - Math.abs(a.scoreDelta);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Companies</h2>
        <p className="text-muted-foreground">
          Browse and analyze {mockCompanies.length} AI-native companies and partners
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Highest Score</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
              <SelectItem value="funding">Total Funding</SelectItem>
              <SelectItem value="momentum">Momentum</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <span className="text-sm font-medium">Industry:</span>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={industryFilter === industry ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry === "all" ? "All Industries" : industry}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredCompanies.length} of {mockCompanies.length} companies
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onClick={() => {
              // In a real app, this would navigate to company details
              console.log("View company:", company.name);
            }}
          />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No companies found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Companies;
