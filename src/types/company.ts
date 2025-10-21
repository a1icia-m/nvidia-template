export interface Company {
  id: string;
  name: string;
  logo?: string;
  foundingYear: number;
  headquarters: string;
  country: string;
  website: string;
  description: string;
  industry: string;
  isDigitalNative: boolean;
  
  scores: {
    talent: number;
    market: number;
    ecosystem: number;
    research: number;
    total: number;
  };
  
  scoreDelta: number;
  overallRank: number;
  isContactedByNCP: boolean;
  
  leadership: {
    founders: Array<{
      name: string;
      role: string;
      background: string;
      previousVentures?: string[];
    }>;
  };
  
  funding: {
    totalRaised: number;
    latestRound: {
      type: string;
      amount: number;
      date: string;
      investors: string[];
    };
    allRounds: Array<{
      type: string;
      amount: number;
      date: string;
    }>;
  };
  
  partnerships: string[];
  nvidiaMentions: number;
  isLighthouse: boolean;
  
  research: {
    githubRepos: number;
    publications: number;
    patents: number;
  };
  
  prProfile: {
    pressSafe: boolean;
    riskFlags: string[];
    categories: string[];
    summary: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  importance: number;
  companyId?: string;
  isFlagged: boolean;
  summary: string;
}

export interface IndustryData {
  name: string;
  totalCompanies: number;
  averageScore: number;
  totalFunding: number;
  topCompanies: Company[];
  growth: number;
}

export interface VentureCapital {
  id: string;
  name: string;
  location: string;
  score: number;
  investments: number;
  portfolio: number;
  region: string;
  description: string;
  website: string;
  foundingYear: number;
  portfolioCompanies: Array<{
    companyId: string;
    companyName: string;
    industry: string;
    investmentStage: string;
    investmentAmount: number;
  }>;
  recentNews: Array<{
    title: string;
    date: string;
    source: string;
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
  aiSummary: {
    overview: string;
    nvidiaRelevance: string;
    ncpOpportunities: string;
  };
}
