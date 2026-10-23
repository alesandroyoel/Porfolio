/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * =============================================================================
 * (A) PROJECT DATA STORE & TYPE DEFINITIONS
 * =============================================================================
 * Complete catalog of all 13 verified portfolio projects.
 * 
 * MAINTENANCE INSTRUCTIONS:
 * - Each project MUST contain a unique, stable `id`.
 * - For projects with verified public artifacts (GitHub repos, live Power BI
 *   reports), specify the exact `link`.
 * - For offline, academic, or proprietary deliverables without a public URL,
 *   set `link: undefined`. DO NOT fabricate placeholder URLs.
 * - Each item includes an interactive or visual dark-mode preview component.
 * =============================================================================
 */

export interface ProjectItem {
  id: string;
  title: string;
  overview: string;
  category: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  preview: React.ReactNode;
}

/**
 * =============================================================================
 * (B) FEATURED PROJECTS CONFIGURATION
 * =============================================================================
 * Controls the default 3-project showcase displayed upon page load.
 * Ordered specifically by priority:
 * 1. olist-ecommerce (Olist Brazilian E-Commerce)
 * 2. logistics-shipment (Logistics Shipment Analytics)
 * 3. hospital-readmission (Hospital Readmission)
 * =============================================================================
 */
export const FEATURED_PROJECT_IDS: readonly string[] = [
  'olist-ecommerce',
  'logistics-shipment',
  'hospital-readmission',
] as const;

/* =============================================================================
   PROJECT PREVIEW COMPONENTS
   High-fidelity, responsive mockups representing each project domain
   ============================================================================= */

// 1. Logistics & Shipment Analytics
export const LogisticsPreview: React.FC = () => (
  <div className="w-full h-full bg-[#091526] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/image_2b63cf85.png"
      alt="Gabut Logistics - Shipment Dashboard"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white font-medium">
      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
      <span>Gabut Logistics // Power BI</span>
    </div>
    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-orange-500/90 text-black font-bold text-[10px] shadow-sm">
      Operational & Cost
    </div>
  </div>
);

// 2. Olist Brazilian E-Commerce
export const OlistPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0d131a] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/1790660150244_1d068d18.png"
      alt="Olist Brazilian E-Commerce Dashboard"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Olist // Streamlit Dashboard
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-sky-400 font-mono text-[9px]">
        EDA &amp; RFM
      </span>
    </div>
  </div>
);

// 3. Hospital Readmission Dashboard
export const HospitalPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0c141d] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/image_05c169dd.png"
      alt="Hospital Readmission Analytics Dashboard"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Hospital Readmission // Power BI
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-gray-300 font-mono text-[9px]">
        Clinical BI
      </span>
    </div>
  </div>
);

// 4. Forecasting Bitcoin (BiGRU & Sentiment Analysis)
export const BitcoinPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0d1117] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/1790660281123_a4166d96.png"
      alt="Forecasting Bitcoin - IndoRoBERTa & BiGRU"
      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Forecasting Bitcoin // BiGRU
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-sky-400 font-mono text-[9px]">
        IndoRoBERTa
      </span>
    </div>
  </div>
);

// 5. Unilever Tube Capability Analysis
export const UnileverPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0e131d] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/1790663635894_921651f9.png"
      alt="Unilever Tube Capability Analysis - Streamlit Dashboard"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Unilever // Packaging Tube QA
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 font-mono text-[9px]">
        Cp &amp; Cpk
      </span>
    </div>
  </div>
);

// 6. Adidas Retail Performance Dashboard
export const AdidasPreview: React.FC = () => (
  <div className="w-full h-full bg-[#050508] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/image_dde5c097.png"
      alt="Adidas Retailer Performance Dashboard"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-white font-medium">
      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
      <span>Adidas // Retailer Performance</span>
    </div>
    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-orange-500/90 text-black font-bold text-[10px] shadow-sm">
      Power BI Report
    </div>
  </div>
);

// 7. Bank Transaction Clustering & Classification
export const BankClusteringPreview: React.FC = () => (
  <div className="w-full h-full bg-[#110e1a] flex flex-col justify-between p-3 select-none overflow-hidden relative font-sans">
    <div
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wider">
          BANKING // TRANSACTION CLUSTERING
        </span>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
        k=4 Clusters
      </span>
    </div>

    <div className="relative z-10 my-2 h-24 bg-black/40 rounded border border-white/5 p-2 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 200 80">
        <circle cx="150" cy="25" r="4" fill="#f97316" />
        <circle cx="142" cy="30" r="3" fill="#f97316" opacity="0.8" />
        <circle cx="160" cy="20" r="3.5" fill="#f97316" opacity="0.8" />
        <circle cx="50" cy="60" r="3.5" fill="#f43f5e" />
        <circle cx="42" cy="55" r="3" fill="#f43f5e" opacity="0.7" />
        <circle cx="58" cy="65" r="3" fill="#f43f5e" opacity="0.7" />
        <circle cx="110" cy="45" r="3.5" fill="#38bdf8" />
        <circle cx="102" cy="40" r="3" fill="#38bdf8" opacity="0.8" />
        <circle cx="70" cy="25" r="3" fill="#10b981" />
        <circle cx="65" cy="32" r="3" fill="#10b981" opacity="0.8" />
        <text x="135" y="45" fill="#f97316" fontSize="7" fontWeight="bold">High Value</text>
        <text x="40" y="75" fill="#f43f5e" fontSize="7" fontWeight="bold">Dormant</text>
      </svg>
    </div>

    <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10 text-center text-[9px]">
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Models: </span>
        <span className="font-bold text-sky-400">K-Means/RF</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Silhouette: </span>
        <span className="font-bold text-orange-400">0.76</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Segment: </span>
        <span className="font-bold text-emerald-400">Verified</span>
      </div>
    </div>
  </div>
);

// 8. Social Media Engagement Analytics
export const SocialMediaPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0a1218] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/1790664818614_f59150c4.jpg"
      alt="Government Issue Social Media Monitoring - Prodata"
      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Social Media Monitoring // Prodata
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-sky-400 font-mono text-[9px]">
        IG · FB · TikTok
      </span>
    </div>
  </div>
);

// 9. Hotel Swiss-Belinn Text Mining & Feedback Analysis
export const HotelTextMiningPreview: React.FC = () => (
  <div className="w-full h-full bg-[#120f18] flex flex-col justify-between p-3 select-none overflow-hidden relative font-sans">
    <div
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wider">
          HOTEL REVIEWS // TEXT MINING &amp; NLP
        </span>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
        Swiss-Belinn
      </span>
    </div>

    <div className="relative z-10 my-2 h-24 bg-black/40 rounded border border-white/5 p-2 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[9px] text-gray-400">
        <span>Word Frequency &amp; Topic Clustering</span>
        <span className="text-orange-400 font-mono">BERTopic vs. LDA</span>
      </div>
      <div className="flex flex-wrap gap-1.5 items-center justify-center py-1">
        <span className="text-[11px] font-bold text-orange-400">Pelayanan (0.84)</span>
        <span className="text-[9px] text-sky-400">Kamar Bersih (0.78)</span>
        <span className="text-[10px] font-semibold text-emerald-400">Lokasi Strategis</span>
        <span className="text-[8px] text-gray-400">Sarapan Pagi</span>
        <span className="text-[9px] text-purple-400">Check-in Cepat</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div className="bg-gradient-to-r from-orange-500 to-purple-500 h-1.5 rounded-full" style={{ width: '88%' }} />
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10 text-center text-[9px]">
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Method: </span>
        <span className="font-bold text-white">IndoBERT</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Scrape: </span>
        <span className="font-bold text-orange-400">Traveloka</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Aspects: </span>
        <span className="font-bold text-purple-400">6 Dimensions</span>
      </div>
    </div>
  </div>
);

// 10. Face Recognition Web App
export const FaceRecognitionPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0d1117] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/image_bcec90e9.png"
      alt="Face Recognition Web App - Visitor Monitoring"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Visitor Monitoring // Streamlit
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 font-mono text-[9px]">
        Face Recognition
      </span>
    </div>
  </div>
);

// 11. AIDS Clinical Trial Classification
export const SupervisedLearningPreview: React.FC = () => (
  <div className="w-full h-full bg-[#10131d] flex flex-col justify-between p-3 select-none overflow-hidden relative font-sans">
    <div
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(to right, #ea580c 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wider">
          ACTG STUDY 175 // CLINICAL PREDICTION
        </span>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
        Accuracy: 89.7%
      </span>
    </div>

    <div className="relative z-10 my-2 h-24 bg-black/40 rounded border border-white/5 p-2 flex flex-col justify-between">
      <div className="flex justify-between text-[9px] text-gray-400">
        <span>5-Classifier Benchmark (ACTG 175)</span>
        <span className="text-emerald-400 font-mono">Tuned SVM: 89.7%</span>
      </div>
      <svg className="w-full h-12" viewBox="0 0 160 50" preserveAspectRatio="none">
        <path
          d="M 5 45 Q 15 15, 60 10 T 155 5"
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
        />
        <line x1="5" y1="45" x2="155" y2="5" stroke="#ffffff" strokeOpacity="0.2" strokeDasharray="3 3" />
        <circle cx="60" cy="10" r="3" fill="#38bdf8" />
      </svg>
      <div className="flex justify-between text-[8px] text-gray-400">
        <span>Random Forest: 88.6%</span>
        <span>Grid / Random Search</span>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10 text-center text-[9px]">
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Dataset: </span>
        <span className="font-bold text-white">UCI #890</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Models: </span>
        <span className="font-bold text-orange-400">RF / SVM</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Cohort: </span>
        <span className="font-bold text-emerald-400">2,139 Patients</span>
      </div>
    </div>
  </div>
);

// 12. Quantitative Investment Analysis & Econometric Modeling (New Project A)
export const QuantInvestmentPreview: React.FC = () => (
  <div className="w-full h-full bg-[#0a1017] flex flex-col justify-between p-3 select-none overflow-hidden relative font-sans">
    <div
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wider">
          RSTUDIO // QUANT INVEST &amp; ECM
        </span>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
        MAPE: 0.1% (Reported)
      </span>
    </div>

    {/* Financial Econometrics Chart Visualization */}
    <div className="relative z-10 my-2 h-24 bg-black/50 rounded border border-white/5 p-2 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[9px] text-gray-400">
        <span>IDXG30 (22 Stocks) // K-Means k=3</span>
        <span className="text-orange-400 font-mono font-medium">ITMG · ICBP · KLBF</span>
      </div>

      {/* Econometric Cointegration & Winter's forecast curves */}
      <div className="h-12 w-full relative">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 240 48" preserveAspectRatio="none">
          <defs>
            <linearGradient id="quant-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="12" x2="240" y2="12" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="2 2" />
          <line x1="0" y1="28" x2="240" y2="28" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="2 2" />
          <path
            d="M 0 38 Q 30 42, 60 26 T 120 22 T 180 14 L 240 8 L 240 48 L 0 48 Z"
            fill="url(#quant-grad)"
          />
          {/* Actual series */}
          <path
            d="M 0 38 Q 30 42, 60 26 T 120 22 T 180 14 L 240 8"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          {/* Forecast series (Winter's Method) */}
          <path
            d="M 160 16 Q 190 12, 215 10 T 240 7"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          <circle cx="240" cy="7" r="3" fill="#f97316" />
        </svg>
      </div>

      <div className="flex justify-between text-[8px] text-gray-400">
        <span>Macro: IHSG · Bond Yield · FTSE</span>
        <span className="text-sky-300 font-mono">ECM Equilibrium</span>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10 text-center text-[9px]">
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Tool: </span>
        <span className="font-bold text-white">R / RStudio</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Ratios: </span>
        <span className="font-bold text-orange-400">10 Financial</span>
      </div>
      <div className="bg-white/5 rounded p-1">
        <span className="text-gray-400">Model: </span>
        <span className="font-bold text-emerald-400">Winter's/ECM</span>
      </div>
    </div>
  </div>
);

// 13. Adidas Retail & Athlete Performance — Animated Data Storytelling (New Project B)
export const FlourishStorytellingPreview: React.FC = () => (
  <div className="w-full h-full bg-[#140e10] select-none overflow-hidden relative group/img">
    <img
      src="/assets/aistudio/1790680951082_b72bc331.jpg"
      alt="Adidas Retail & Athlete Storytelling - Flourish"
      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] pointer-events-none">
      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-400 font-mono font-medium border border-orange-500/30">
        Flourish // Data Storytelling
      </span>
      <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-rose-400 font-mono text-[9px]">
        Interactive Story
      </span>
    </div>
  </div>
);

/* =============================================================================
   COMPLETE PORTFOLIO REPOSITORY
   All 13 projects across data analytics, machine learning, and BI
   ============================================================================= */

export const PROJECTS: ProjectItem[] = [
  // FEATURED PROJECT 1: Olist Brazilian E-Commerce
  {
    id: 'olist-ecommerce',
    title: 'Olist Brazilian E-Commerce',
    overview:
      'End-to-end e-commerce analysis pipeline covering data wrangling, EDA, RFM customer segmentation, geospatial order mapping with Folium, and an interactive Streamlit dashboard.',
    category: 'E-Commerce Analytics & Interactive Dashboard',
    tags: ['Python', 'Pandas', 'Streamlit', 'RFM Analysis', 'Folium', 'EDA'],
    link: 'https://olist-brazilian-e-commerce-dashboard.streamlit.app/',
    githubUrl: 'https://github.com/alesandroyoel/Olist-Brazilian-E-Commerce',
    imageUrl: '/assets/aistudio/1790660150244_1d068d18.png',
    isFeatured: true,
    preview: <OlistPreview />,
  },

  // FEATURED PROJECT 2: Logistics Shipment Analytics
  {
    id: 'logistics-shipment',
    title: 'Logistics Shipment Analytics',
    overview:
      'End-to-end analytics with PostgreSQL analysis queries, a star-schema data warehouse with SQL ETL, and a Power BI dashboard for shipment operations and cost.',
    category: 'Data Engineering & Business Intelligence',
    tags: ['PostgreSQL', 'SQL ETL', 'Star Schema', 'Power BI', 'DAX'],
    link: 'https://github.com/alesandroyoel/Logistics-Shipment-Analytics',
    githubUrl: 'https://github.com/alesandroyoel/Logistics-Shipment-Analytics',
    imageUrl: '/assets/aistudio/image_2b63cf85.png',
    isFeatured: true,
    preview: <LogisticsPreview />,
  },

  // FEATURED PROJECT 3: Hospital Readmission
  {
    id: 'hospital-readmission',
    title: 'Hospital Readmission',
    overview:
      'Healthcare analytics dashboard tracking clinical readmission probabilities, length of stay, and patient demographics for diabetes care.',
    category: 'Healthcare Business Intelligence',
    tags: ['Power BI', 'Healthcare BI', 'DAX', 'Statistics'],
    link: 'https://app.powerbi.com/groups/me/reports/cdb10212-907d-4ca6-bc72-5d907ea2ed48/d6e66cc0c60110b99211?experience=power-bi',
    imageUrl: '/assets/aistudio/image_05c169dd.png',
    isFeatured: true,
    preview: <HospitalPreview />,
  },

  // PROJECT 4: Forecasting Bitcoin (Renamed from Bitcoin Price & Sentiment Forecasting)
  {
    id: 'bitcoin-forecasting-sentiment',
    title: 'Forecasting Bitcoin',
    overview:
      'Hybrid deep learning model integrating historical market data with Indonesian financial news sentiment (8,800+ articles via Indo-RoBERTa) and Bidirectional GRU to forecast Bitcoin closing prices.',
    category: 'Deep Learning & Natural Language Processing',
    tags: ['Python', 'BiGRU', 'IndoRoBERTa', 'Deep Learning', 'yfinance'],
    link: 'https://github.com/alesandroyoel/Forecasting-Bitcoin-BiGRU-Sentiment',
    githubUrl: 'https://github.com/alesandroyoel/Forecasting-Bitcoin-BiGRU-Sentiment',
    imageUrl: '/assets/aistudio/1790660281123_a4166d96.png',
    preview: <BitcoinPreview />,
  },

  // PROJECT 5: Unilever Tube Capability Analysis
  {
    id: 'unilever-tube-capability',
    title: 'Unilever Tube Capability Analysis',
    overview:
      'Interactive Streamlit dashboard analyzing tube process capability (Cp, Cpk) across multi-supplier Excel inspection datasets with automated period detection and supplier rankings.',
    category: 'Industrial Analytics & Streamlit Web App',
    tags: ['Python', 'Streamlit', 'Process Capability', 'Statistical QA', 'Pandas'],
    link: 'https://kapabilitas-packaging-tube-unilever.streamlit.app/',
    githubUrl: 'https://github.com/alesandroyoel/analisis-kapabilitas-tube-unilever',
    imageUrl: '/assets/aistudio/1790663635894_921651f9.png',
    preview: <UnileverPreview />,
  },

  // PROJECT 6: Adidas Retail Performance
  {
    id: 'adidas-retail-performance',
    title: 'Adidas Retail Performance',
    overview:
      'Commercial retail intelligence dashboard evaluating regional sales volume, profit margins, and apparel revenue trends.',
    category: 'Commercial Business Intelligence',
    tags: ['Power BI', 'Retail Analytics', 'DAX', 'KPIs'],
    link: 'https://app.powerbi.com/groups/me/reports/88977b60-d0bf-462e-8165-05bec4d8778c/6ba5957a7e2db65ff33c?experience=power-bi',
    imageUrl: '/assets/aistudio/image_dde5c097.png',
    preview: <AdidasPreview />,
  },

  // PROJECT 7: Bank Transaction Clustering & Classification
  {
    id: 'bank-transaction-clustering-classification',
    title: 'Bank Transaction Clustering & Classification',
    overview:
      'Two-stage machine learning pipeline combining unsupervised K-Means clustering for customer segmentation and supervised classification (Random Forest with GridSearchCV) on transaction patterns.',
    category: 'Machine Learning & Customer Segmentation',
    tags: ['Python', 'Scikit-learn', 'K-Means', 'Random Forest', 'GridSearchCV'],
    link: 'https://github.com/alesandroyoel/Bank-transaction-clustering-classification',
    githubUrl: 'https://github.com/alesandroyoel/Bank-transaction-clustering-classification',
    preview: <BankClusteringPreview />,
  },

  // PROJECT 8: Government Issue Social Media Monitoring
  {
    id: 'government-issue-social-media-monitoring',
    title: 'Government Issue Social Media Monitoring',
    overview:
      'Exploratory analysis of 15,134 Instagram, Facebook, and TikTok posts regarding Indonesian government issues: engagement analytics, spam detection, and InSet lexicon-based sentiment analysis.',
    category: 'Social Media Analytics & Public Policy',
    tags: ['Python', 'Pandas', 'InSet Lexicon', 'Sentiment Analysis', 'EDA'],
    link: 'https://github.com/alesandroyoel/Goverment-Issue_Social-Media-Monitoring',
    githubUrl: 'https://github.com/alesandroyoel/Goverment-Issue_Social-Media-Monitoring',
    imageUrl: '/assets/aistudio/1790664818614_f59150c4.jpg',
    preview: <SocialMediaPreview />,
  },

  // PROJECT 9: Swiss-Belinn Review Analysis
  {
    id: 'swiss-belinn-review-analysis',
    title: 'Swiss-Belinn Review Analysis',
    overview:
      'Customer review analysis of Hotel Swiss-Belinn Manyar Surabaya scraped from Traveloka using topic modeling (LDA vs. BERTopic) and IndoBERT aspect-based sentiment analysis across 6 service dimensions.',
    category: 'Text Mining & Aspect-Based Sentiment Analysis',
    tags: ['Python', 'BERTopic', 'LDA', 'IndoBERT', 'Selenium', 'BeautifulSoup'],
    link: 'https://github.com/alesandroyoel/swiss-belinn-review-analysis',
    githubUrl: 'https://github.com/alesandroyoel/swiss-belinn-review-analysis',
    preview: <HotelTextMiningPreview />,
  },

  // PROJECT 10: Face Recognition Web App
  {
    id: 'face-recognition-web-app',
    title: 'Face Recognition Web App',
    overview:
      'Developed an interactive Visitor Monitoring web application using Python and Streamlit to automate and modernize university student attendance.',
    category: 'Computer Vision & Streamlit Web App',
    tags: ['Python', 'Streamlit', 'Face Recognition', 'OpenCV', 'Dlib'],
    link: 'https://github.com/alesandroyoel/cctv1',
    githubUrl: 'https://github.com/alesandroyoel/cctv1',
    imageUrl: '/assets/aistudio/image_bcec90e9.png',
    preview: <FaceRecognitionPreview />,
  },

  // PROJECT 11: AIDS Clinical Trial Classification
  {
    id: 'aids-clinical-trial-classification',
    title: 'AIDS Clinical Trial Classification',
    overview:
      'Binary classification predicting patient outcomes on the ACTG Study 175 dataset (UCI ML Repository), benchmarking Random Forest (88.6% accuracy), tuned SVM (89.7%), Naive Bayes, Decision Trees, and KNN.',
    category: 'Supervised Learning & Medical Prediction',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'SVM', 'ucimlrepo', 'EDA'],
    link: 'https://github.com/alesandroyoel/AIDS-Clinical-Trial-Classification',
    githubUrl: 'https://github.com/alesandroyoel/AIDS-Clinical-Trial-Classification',
    preview: <SupervisedLearningPreview />,
  },

  // PROJECT 12: Quantitative Investment Analysis & Econometric Modeling (Project A)
  {
    id: 'quantitative-investment-analysis',
    title: 'Quantitative Investment Analysis & Econometric Modeling',
    overview:
      'Investment analysis combining fundamental stock clustering (22 IDXG30 manufacturing stocks), expected return evaluation, Error Correction Model (ECM), and statistical time-series forecasting.',
    category: 'Financial Analytics, Econometrics & Quantitative Investment',
    tags: ['R', 'RStudio', 'K-Means', 'Econometrics', 'ECM', 'Time Series'],
    // Note: Proprietary/academic econometric model deliverable without public URL
    link: undefined,
    preview: <QuantInvestmentPreview />,
  },

  // PROJECT 13: Adidas Retail & Athlete Performance — Animated Data Storytelling (Project B)
  {
    id: 'adidas-flourish-storytelling',
    title: 'Adidas Retail & Athlete Performance — Animated Data Storytelling',
    overview:
      'Interactive data storytelling built with Flourish Studio, translating complex retail sales and athletic performance datasets into animated bar chart races, bump ranking charts, and multi-variable radar metrics.',
    category: 'Data Visualization, Data Storytelling & Business Analytics',
    tags: ['Flourish Studio', 'Data Storytelling', 'Animated Visuals', 'Business Analytics'],
    // Live Flourish Studio storytelling story
    link: 'https://public.flourish.studio/story/2678070/',
    imageUrl: '/assets/aistudio/1790680951082_b72bc331.jpg',
    preview: <FlourishStorytellingPreview />,
  },
];
