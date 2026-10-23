/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ExternalLink, ArrowRight, ArrowUp, Lock, Github } from 'lucide-react';
import { PROJECTS, FEATURED_PROJECT_IDS, ProjectItem } from '../data/projects';

/**
 * =============================================================================
 * (D) PROJECT GALLERY EXPAND/COLLAPSE & RENDERING LOGIC
 * =============================================================================
 * Manages display state for Section 4:
 * 1. Initial view: Exactly 3 featured projects, ordered strictly by
 *    `FEATURED_PROJECT_IDS` ('olist-ecommerce', 'logistics-shipment', 'hospital-readmission').
 * 2. "VIEW ALL PROJECTS →" button: Toggles to full directory view.
 * 3. Expanded view: Displays all 13 distinct projects directly in Section 4,
 *    keeping the 3 featured projects at the top, followed by remaining projects,
 *    guaranteeing zero duplicate cards.
 * 4. Toggle button changes to "SHOW LESS ↑" when expanded.
 * =============================================================================
 */

export default function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute the 3 featured projects in strict priority order
  const featuredProjects = useMemo(() => {
    return FEATURED_PROJECT_IDS.map((id) =>
      PROJECTS.find((p) => p.id === id)
    ).filter((p): p is ProjectItem => Boolean(p));
  }, []);

  // Compute remaining non-featured projects
  const remainingProjects = useMemo(() => {
    const featuredIdSet = new Set(FEATURED_PROJECT_IDS);
    return PROJECTS.filter((p) => !featuredIdSet.has(p.id));
  }, []);

  // When collapsed: show initial 3 featured projects
  // When expanded: show all 13 projects with the 3 featured ones at the top, without duplication
  const displayedProjects = useMemo(() => {
    if (!isExpanded) {
      return featuredProjects;
    }
    return [...featuredProjects, ...remainingProjects];
  }, [isExpanded, featuredProjects, remainingProjects]);

  const toggleGallery = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white select-none transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #06070c 0%, #080a13 18%, #0b0e19 42%, #090c16 72%, #05060b 100%)',
      }}
    >
      {/* Top seamless transition veil from Section 3 */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, #06070c 0%, transparent 100%)',
        }}
      />

      {/* Subtle tactile grid layer echoing Section 1 & 3 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="projects-grid"
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
        <rect width="100%" height="100%" fill="url(#projects-grid)" />
      </svg>

      {/* Ambient Lighting & Layered Radial Glows */}
      {/* Header & top-left glow elevating featured projects */}
      <div
        className="absolute top-12 left-1/4 -translate-x-1/2 w-[520px] h-[360px] pointer-events-none blur-[110px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.08) 0%, rgba(30, 41, 59, 0.14) 50%, transparent 75%)',
        }}
      />
      {/* Upper-right atmospheric glow */}
      <div
        className="absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.065) 0%, rgba(15, 23, 42, 0.18) 50%, transparent 75%)',
        }}
      />
      {/* Mid-section subtle warmth behind gallery cards */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[520px] pointer-events-none blur-[140px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.04) 0%, rgba(30, 41, 59, 0.10) 45%, transparent 80%)',
        }}
      />
      {/* Lower ambient illumination covering the expanded full directory */}
      <div
        className="absolute bottom-16 left-1/3 -translate-x-1/2 w-[580px] h-[420px] pointer-events-none blur-[130px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.055) 0%, rgba(30, 41, 59, 0.12) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header with "VIEW ALL PROJECTS →" / "SHOW LESS ↑" button at top-right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div className="text-center sm:text-left">
            <p className="text-orange-500 font-bold text-xs sm:text-sm tracking-[0.28em] uppercase mb-2 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
              FEATURED PROJECTS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Some of My Recent Work
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full mt-3.5 mx-auto sm:mx-0 shadow-[0_0_14px_rgba(249,115,22,0.7)]" />
          </div>

          {/* Toggle Button: "VIEW ALL PROJECTS →" initially, "SHOW LESS ↑" when expanded */}
          <div className="flex justify-center sm:justify-end">
            <button
              type="button"
              onClick={toggleGallery}
              aria-expanded={isExpanded}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14141c] hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 text-orange-400 hover:text-orange-300 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-orange-500/10"
            >
              <span>{isExpanded ? 'SHOW LESS' : 'VIEW ALL PROJECTS'}</span>
              {isExpanded ? (
                <ArrowUp
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 text-orange-400"
                />
              ) : (
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 text-orange-400"
                />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 transition-all duration-500">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#111116] border border-white/10 hover:border-orange-500/50 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(249,115,22,0.18)] overflow-hidden"
            >
              <div>
                {/* Top Project Preview Visual (16:10 ratio) */}
                <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-[#181820] border border-white/5 relative group-hover:border-orange-500/20 transition-all">
                  {project.preview}

                  {/* Subtle sheen highlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111116]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Project Title */}
                <h3 className="text-white font-semibold text-base sm:text-lg group-hover:text-orange-400 transition-colors duration-200 mt-4 mb-1.5 line-clamp-1">
                  {project.title}
                </h3>

                {/* Brief Overview: 1-2 concise sentences describing project */}
                <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed line-clamp-2 mb-3 min-h-[36px]">
                  {project.overview}
                </p>
              </div>

              {/* Bottom Row: Technology tags on left, external link on right */}
              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1a1a24] text-gray-300 border border-white/5 text-[11px] font-medium px-2 py-0.5 rounded-md truncate max-w-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] text-gray-500 font-mono">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* External Link Buttons & Offline Deliverable Badge */}
                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                  {/* Secondary GitHub Repository Button (shown when distinct from primary live link) */}
                  {project.githubUrl && project.githubUrl !== project.link && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      aria-label={`View GitHub repository for ${project.title}`}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-white/5 hover:border-white/20 active:scale-95"
                    >
                      <Github size={14} />
                    </a>
                  )}

                  {/* Primary Link Button (Live app / dashboard / report or repository) */}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={
                        project.githubUrl && project.githubUrl !== project.link
                          ? `Open Live Application`
                          : `Open ${project.title}`
                      }
                      aria-label={`Open ${project.title}`}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-black text-gray-400 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-sm group-hover:border-orange-500/30 active:scale-95"
                    >
                      {project.link.includes('github.com') ? (
                        <Github size={14} />
                      ) : (
                        <ExternalLink size={14} />
                      )}
                    </a>
                  ) : (
                    <div
                      title="Case study / Offline deliverable"
                      aria-label="Offline deliverable"
                      className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 flex items-center justify-center shrink-0 cursor-default border border-white/5"
                    >
                      <Lock size={13} className="opacity-60" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
