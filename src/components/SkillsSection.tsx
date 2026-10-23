/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, PieChart, Sparkles } from 'lucide-react';

interface TechItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

type CategoryType = 'Data Analytics' | 'Business Intelligence' | 'Data Science';

// Custom high-fidelity brand SVGs
const ExcelIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#107C41" />
    <path
      d="M28 14H19C17.8954 14 17 14.8954 17 16V32C17 33.1046 17.8954 34 19 34H33C34.1046 34 35 33.1046 35 32V21L28 14Z"
      fill="#185C37"
    />
    <path d="M28 14V21H35L28 14Z" fill="#33C481" />
    <path d="M19 19H33V32H19V19Z" fill="#107C41" />
    <path
      d="M13 20H23C23.5523 20 24 20.4477 24 21V31C24 31.5523 23.5523 32 23 32H13C12.4477 32 12 31.5523 12 31V21C12 20.4477 12.4477 20 13 20Z"
      fill="#107C41"
    />
    <path
      d="M15.5 23.5L17.5 26.5L15.3 29.5H16.9L18.3 27.5L19.7 29.5H21.3L19.1 26.5L21.1 23.5H19.5L18.3 25.5L17.1 23.5H15.5Z"
      fill="white"
    />
  </svg>
);

const SQLIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1A202C" />
    <ellipse cx="24" cy="14" rx="14" ry="5" fill="#38BDF8" fillOpacity="0.85" />
    <path
      d="M10 14V22C10 24.7614 16.268 27 24 27C31.732 27 38 24.7614 38 22V14"
      stroke="#38BDF8"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M10 22V30C10 32.7614 16.268 35 24 35C31.732 35 38 32.7614 38 30V22"
      stroke="#0284C7"
      strokeWidth="2.5"
      fill="none"
    />
    <circle cx="31" cy="31" r="7" fill="#F59E0B" />
    <path d="M36 36L40 40" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PythonIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1E293B" />
    <path
      d="M23.6 10C17.3 10 17.7 12.7 17.7 12.7L17.8 15.5H24V16.4H15.1C11.5 16.4 10 18.5 10 22.1C10 26.3 12.5 26.3 12.5 26.3H14.3V23.7C14.3 20.6 16.9 20.6 16.9 20.6H23.9C26.7 20.6 27.2 18.2 27.2 18.2V12.9C27.2 12.9 27.4 10 23.6 10ZM21.5 11.9C22.2 11.9 22.8 12.5 22.8 13.2C22.8 13.9 22.2 14.5 21.5 14.5C20.8 14.5 20.2 13.9 20.2 13.2C20.2 12.5 20.8 11.9 21.5 11.9Z"
      fill="#387EB8"
    />
    <path
      d="M24.4 38C30.7 38 30.3 35.3 30.3 35.3L30.2 32.5H24V31.6H32.9C36.5 31.6 38 29.5 38 25.9C38 21.7 35.5 21.7 35.5 21.7H33.7V24.3C33.7 27.4 31.1 27.4 31.1 27.4H24.1C21.3 27.4 20.8 29.8 20.8 29.8V35.1C20.8 35.1 20.6 38 24.4 38ZM26.5 36.1C25.8 36.1 25.2 35.5 25.2 34.8C25.2 34.1 25.8 33.5 26.5 33.5C27.2 33.5 27.8 34.1 27.8 34.8C27.8 35.5 27.2 36.1 26.5 36.1Z"
      fill="#FFE052"
    />
  </svg>
);

const PandasIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#150458" />
    <rect x="15" y="12" width="5.5" height="24" rx="2" fill="#E70488" />
    <rect x="27.5" y="12" width="5.5" height="24" rx="2" fill="#00A3E0" />
    <rect x="21.2" y="17" width="5.5" height="14" rx="1.5" fill="#FFD400" />
    <circle cx="17.7" cy="18" r="1.5" fill="#FFFFFF" />
    <circle cx="30.2" cy="30" r="1.5" fill="#FFFFFF" />
  </svg>
);

const NumpyIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#013243" />
    <path
      d="M13 16L24 10L35 16V32L24 38L13 32V16Z"
      fill="#4DABCF"
      fillOpacity="0.3"
      stroke="#4DABCF"
      strokeWidth="2"
    />
    <path d="M24 10V24M24 24V38M24 24L35 16M24 24L13 16" stroke="#4DABCF" strokeWidth="2" />
    <text x="24" y="27" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
      NP
    </text>
  </svg>
);

const JupyterIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#202022" />
    <path
      d="M24 11C18 11 13 15 13 20C13 22.8 14.8 25.2 17.5 26.7C16.8 25.8 16.4 24.6 16.4 23.3C16.4 19.3 19.8 16.1 24 16.1C28.2 16.1 31.6 19.3 31.6 23.3C31.6 24.6 31.2 25.8 30.5 26.7C33.2 25.2 35 22.8 35 20C35 15 30 11 24 11Z"
      fill="#F37626"
    />
    <path
      d="M24 37C30 37 35 33 35 28C35 25.2 33.2 22.8 30.5 21.3C31.2 22.2 31.6 23.4 31.6 24.7C31.6 28.7 28.2 31.9 24 31.9C19.8 31.9 16.4 28.7 16.4 24.7C16.4 23.4 16.8 22.2 17.5 21.3C14.8 22.8 13 25.2 13 28C13 33 18 37 24 37Z"
      fill="#9E9E9E"
    />
    <circle cx="16" cy="14" r="2" fill="#E85A18" />
    <circle cx="34" cy="33" r="2" fill="#666666" />
  </svg>
);

const StatsIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1C1917" />
    <path d="M10 36H38" stroke="#78716C" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 10V36" stroke="#78716C" strokeWidth="1.5" strokeDasharray="3 3" />
    <path
      d="M12 34C15 34 18 32 20 25C22 18 23 14 24 14C25 14 26 18 28 25C30 32 33 34 36 34"
      stroke="#F59E0B"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="24" cy="14" r="3" fill="#F59E0B" />
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#0F9D58" />
    <path
      d="M17 13H27L33 19V35H17C15.8954 35 15 34.1046 15 33V15C15 13.8954 15.8954 13 17 13Z"
      fill="#FFFFFF"
    />
    <path d="M27 13V19H33" fill="#B7E1CD" />
    <rect x="19" y="22" width="10" height="8" rx="1" fill="#0F9D58" fillOpacity="0.15" />
    <path d="M19 26H29M24 22V30" stroke="#0F9D58" strokeWidth="1.5" />
  </svg>
);

const PowerBIIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1E1E24" />
    <rect x="14" y="26" width="5.5" height="12" rx="1.5" fill="#E6AD10" />
    <rect x="21.2" y="19" width="5.5" height="19" rx="1.5" fill="#F2C811" />
    <rect x="28.5" y="12" width="5.5" height="26" rx="1.5" fill="#FBE66D" />
  </svg>
);

const TableauIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1B1F27" />
    {/* Center large cross */}
    <path d="M24 16V32M16 24H32" stroke="#E97627" strokeWidth="3" strokeLinecap="round" />
    {/* Left cross */}
    <path d="M12 21V27M9 24H15" stroke="#0070B8" strokeWidth="2.2" strokeLinecap="round" />
    {/* Right cross */}
    <path d="M36 21V27M33 24H39" stroke="#EE6352" strokeWidth="2.2" strokeLinecap="round" />
    {/* Top cross */}
    <path d="M24 9V15M21 12H27" stroke="#5C913B" strokeWidth="2.2" strokeLinecap="round" />
    {/* Bottom cross */}
    <path d="M24 33V39M21 36H27" stroke="#9E4E85" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const LookerStudioIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1E222D" />
    <path d="M14 34L24 14L34 34H14Z" stroke="#4285F4" strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="14" r="3.5" fill="#EA4335" />
    <circle cx="14" cy="34" r="3.5" fill="#FBBC04" />
    <circle cx="34" cy="34" r="3.5" fill="#34A853" />
    <path d="M24 24L34 34" stroke="#4285F4" strokeWidth="2" />
  </svg>
);

const DAXIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1C1811" />
    <rect x="11" y="11" width="26" height="26" rx="6" stroke="#F59E0B" strokeWidth="2" fill="none" />
    <text x="24" y="28" fill="#F59E0B" fontSize="13" fontWeight="900" textAnchor="middle">
      fx
    </text>
    <path d="M15 15L18 15M30 33L33 33" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PowerQueryIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1C211A" />
    <path
      d="M14 16H22C24.2 16 26 17.8 26 20V28C26 30.2 24.2 32 22 32H14"
      stroke="#107C41"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M34 16H26M34 32H26"
      stroke="#F2C811"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="14" cy="16" r="2.5" fill="#107C41" />
    <circle cx="14" cy="32" r="2.5" fill="#107C41" />
    <circle cx="34" cy="16" r="2.5" fill="#F2C811" />
    <circle cx="34" cy="32" r="2.5" fill="#F2C811" />
  </svg>
);

const ScikitLearnIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#192534" />
    <path
      d="M20 16C15 16 12 20 12 24C12 28 15 32 20 32C24 32 26 29 27 27L23 25C22 26 21 27 20 27C17 27 16 25 16 24C16 23 17 21 20 21C21 21 22 22 23 23L27 21C26 19 24 16 20 16Z"
      fill="#F89939"
    />
    <circle cx="30" cy="24" r="5" fill="#3499CD" />
    <circle cx="20" cy="24" r="2" fill="#FFFFFF" />
  </svg>
);

const MatplotlibIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#112233" />
    <circle cx="24" cy="24" r="14" stroke="#11557C" strokeWidth="2" fill="none" />
    <path
      d="M14 26C16 20 19 16 22 16C26 16 28 32 31 32C33 32 34 26 35 24"
      stroke="#1085C9"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M13 24C16 28 18 30 21 30C25 30 27 18 30 18C33 18 34 22 35 24"
      stroke="#FF6F00"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SeabornIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#141E28" />
    <path
      d="M14 32C17 32 19 26 21 22C24 16 26 14 30 14C33 14 35 18 35 20"
      stroke="#4C72B0"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M14 24C18 24 20 30 23 34C26 38 29 36 34 30"
      stroke="#55A868"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="21" cy="22" r="3" fill="#DD8452" />
  </svg>
);

const MachineLearningIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#1C1811" />
    {/* Input layer */}
    <circle cx="14" cy="18" r="3" fill="#F59E0B" />
    <circle cx="14" cy="30" r="3" fill="#F59E0B" />
    {/* Hidden layer */}
    <circle cx="24" cy="14" r="3" fill="#FBBF24" />
    <circle cx="24" cy="24" r="3" fill="#FBBF24" />
    <circle cx="24" cy="34" r="3" fill="#FBBF24" />
    {/* Output layer */}
    <circle cx="34" cy="24" r="3.5" fill="#F59E0B" />
    {/* Connections */}
    <line x1="14" y1="18" x2="24" y2="14" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="14" y1="18" x2="24" y2="24" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="14" y1="30" x2="24" y2="24" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="14" y1="30" x2="24" y2="34" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="24" y1="14" x2="34" y2="24" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="24" y1="24" x2="34" y2="24" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.8" />
    <line x1="24" y1="34" x2="34" y2="24" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.7" />
  </svg>
);

const SKILLS_DATA: Record<CategoryType, TechItem[]> = {
  'Data Analytics': [
    { name: 'Microsoft Excel', desc: 'Formulas & Advanced Modeling', icon: <ExcelIcon /> },
    { name: 'SQL', desc: 'Queries, Joins & Aggregations', icon: <SQLIcon /> },
    { name: 'Python', desc: 'Scripting & Automation', icon: <PythonIcon /> },
    { name: 'Pandas', desc: 'Data Cleaning & Transformation', icon: <PandasIcon /> },
    { name: 'NumPy', desc: 'Matrix & Vectorized Computations', icon: <NumpyIcon /> },
    { name: 'Jupyter Notebook', desc: 'Interactive Exploratory Analysis', icon: <JupyterIcon /> },
    { name: 'Statistics', desc: 'Hypothesis Testing & Regressions', icon: <StatsIcon /> },
    { name: 'Google Sheets', desc: 'Collaborative Spreadsheets & Apps Script', icon: <GoogleSheetsIcon /> },
  ],
  'Business Intelligence': [
    { name: 'Microsoft Power BI', desc: 'Interactive Enterprise Dashboards', icon: <PowerBIIcon /> },
    { name: 'Tableau', desc: 'Visual Analytics & Storytelling', icon: <TableauIcon /> },
    { name: 'Looker Studio', desc: 'Executive KPI Reporting', icon: <LookerStudioIcon /> },
    { name: 'DAX', desc: 'Calculated Measures & Business Logic', icon: <DAXIcon /> },
    { name: 'Power Query', desc: 'ETL Pipelines & Data Prep', icon: <PowerQueryIcon /> },
    { name: 'SQL', desc: 'Data Extraction & Schema Design', icon: <SQLIcon /> },
    { name: 'Microsoft Excel', desc: 'Pivot Tables & Financial Modeling', icon: <ExcelIcon /> },
  ],
  'Data Science': [
    { name: 'Python', desc: 'Algorithms & Model Training', icon: <PythonIcon /> },
    { name: 'Pandas', desc: 'Feature Engineering & DataFrames', icon: <PandasIcon /> },
    { name: 'NumPy', desc: 'High-Performance Numerical Arrays', icon: <NumpyIcon /> },
    { name: 'Scikit-learn', desc: 'Supervised & Unsupervised ML', icon: <ScikitLearnIcon /> },
    { name: 'Matplotlib', desc: 'Custom Plots & Exploratory Graphics', icon: <MatplotlibIcon /> },
    { name: 'Seaborn', desc: 'Statistical Distribution Visualizations', icon: <SeabornIcon /> },
    { name: 'Jupyter Notebook', desc: 'End-to-End Experimentation', icon: <JupyterIcon /> },
    { name: 'Machine Learning', desc: 'Classification, Regression & Clustering', icon: <MachineLearningIcon /> },
  ],
};

const CATEGORIES: { label: CategoryType; icon: React.ReactNode }[] = [
  { label: 'Data Analytics', icon: <BarChart3 size={15} /> },
  { label: 'Business Intelligence', icon: <PieChart size={15} /> },
  { label: 'Data Science', icon: <Sparkles size={15} /> },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Data Analytics');

  return (
    <section
      id="skills"
      className="relative overflow-hidden w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white select-none"
      style={{
        background: 'linear-gradient(180deg, #010103 0%, #06080e 22%, #090c14 55%, #070910 82%, #06070c 100%)',
      }}
    >
      {/* Top seamless transition veil from Section 2 */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)',
        }}
      />

      {/* Subtle tactile grid layer echoing Section 1 hero */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="skills-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-grid)" />
      </svg>

      {/* Ambient Lighting & Layered Radial Glows */}
      {/* Top header subtle warm illumination */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 pointer-events-none blur-[100px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(249, 115, 22, 0.09) 0%, transparent 70%)',
        }}
      />
      {/* Left flank warm amber bloom */}
      <div
        className="absolute top-1/3 -left-28 w-[420px] h-[420px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(30, 41, 59, 0.12) 45%, transparent 70%)',
        }}
      />
      {/* Right flank slate & warm glow */}
      <div
        className="absolute bottom-1/4 -right-28 w-[440px] h-[440px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.07) 0%, rgba(15, 23, 42, 0.16) 50%, transparent 70%)',
        }}
      />
      {/* Center subtle glow behind skill cards */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[450px] pointer-events-none blur-[130px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.04) 0%, rgba(30, 41, 59, 0.10) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-orange-500 font-bold text-xs sm:text-sm tracking-[0.28em] uppercase mb-2 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
            MY EXPERTISE
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">Skills &amp; </span>
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.55)]">
              Technologies
            </span>
          </h2>

          {/* Orange underline matching Section 1 & 2 theme */}
          <div className="w-16 sm:w-20 h-1 bg-orange-500 rounded-full mx-auto mt-3.5 shadow-[0_0_14px_rgba(249,115,22,0.7)]" />
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={`relative rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-[0_0_24px_rgba(249,115,22,0.55)] scale-[1.03]'
                    : 'bg-[#151518] text-gray-400 hover:text-white hover:bg-[#1f1f25] border border-white/5 hover:border-white/15'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
          >
            {SKILLS_DATA[activeCategory].map((tech) => (
              <div
                key={tech.name}
                className="group relative bg-[#121216]/95 hover:bg-[#18181f] border border-white/5 hover:border-orange-500/50 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(249,115,22,0.18)] overflow-hidden cursor-default"
              >
                {/* Subtle orange ambient sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Tech Icon Container */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-black/40 border border-white/5 group-hover:border-orange-500/40 group-hover:scale-105 transition-all duration-300 shadow-inner">
                  {tech.icon}
                </div>

                {/* Tech Title */}
                <h3 className="relative z-10 text-white text-sm sm:text-base font-semibold mt-4 group-hover:text-orange-400 transition-colors duration-200">
                  {tech.name}
                </h3>

                {/* Tech Subtitle / Category Label */}
                <p className="relative z-10 text-[11px] sm:text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
