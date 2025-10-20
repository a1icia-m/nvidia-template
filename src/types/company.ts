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
