# NVIDIA AI Natives Dashboard

A comprehensive dashboard for tracking emerging AI startups and enterprise partners for NVIDIA Cloud Partners.

## Project Overview

This dashboard provides automated research and tracking capabilities for AI-native companies, featuring:

- **Company Intelligence**: Comprehensive profiles with founding team research, funding history, and partnership opportunities
- **News Monitoring**: Real-time news tracking with sentiment analysis and relevance scoring
- **Professional Networking**: LinkedIn integration for founders and partnership contacts
- **Time-based Filtering**: Dynamic filtering by weekly, monthly, quarterly, and yearly periods

## Technologies Used

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn UI + Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + Custom Store
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ryanazu/nvidia-template4.git
cd nvidia-template4
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration needed

The `vercel.json` file includes:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing configuration

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## Features

### Dashboard Overview
- Company outreach progress tracking
- Time-based filtering (Weekly/Monthly/Quarterly/Yearly)
- News and newest companies side-by-side layout

### Company Profiles
- Founding team research and LinkedIn integration
- Partnership contact information
- Funding history and investor details
- AI analysis and PR safety metrics

### News System
- Real-time news monitoring
- Sentiment analysis (positive/negative/neutral)
- Relevance scoring (1-10)
- Time-based filtering

### Professional Networking
- Direct LinkedIn access for all founders
- Partnership contact cards with email and LinkedIn
- Enhanced business development capabilities

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── data/               # Mock data and configurations
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and stores
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary to NVIDIA Corporation.