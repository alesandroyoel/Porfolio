/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'motion/react';
import SkillsSection from './components/SkillsSection.tsx';
import ProjectsSection from './components/ProjectsSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import { CV_URL } from './config/site.ts';

const BG_IMAGE_1 =
  '/assets/aistudio/Potret_Dramatis_Cahaya_Jingga-Rahasia_32bd0b75.png';

const BG_IMAGE_2 =
  '/assets/aistudio/Potret_Pria_dengan_Armor_Cyber_Futuristik_1de6c9f8.png';

interface ArcConfig {
  r: number;
  startDeg: number;
  endDeg: number;
  dotDeg: number;
  numMain: string;
  suffix: string;
  label: string;
}

const ARC_DATA: ArcConfig[] = [
  {
    r: 330,
    startDeg: -92,
    endDeg: 16,
    dotDeg: -46,
    numMain: '1',
    suffix: '+',
    label: 'YEAR EXPERIENCE',
  },
  {
    r: 395,
    startDeg: -56,
    endDeg: 60,
    dotDeg: 2,
    numMain: '10',
    suffix: '+',
    label: 'PROJECTS',
  },
  {
    r: 460,
    startDeg: -14,
    endDeg: 72,
    dotDeg: 44,
    numMain: '15',
    suffix: '+',
    label: 'LICENSES & CERTIFICATIONS',
  },
];

const NAV_LINKS = [
  'Home',
  'About',
  'Skills',
  'Projects',
  'Contact',
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const patternRef = useRef<SVGPatternElement | null>(null);
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Section 2 ref and Framer Motion scroll progress hooks
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: aboutSectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth bottom-to-top animated scroll translation (from 80px upward to -80px)
  const rawY = useTransform(scrollYProgress, [0.1, 0.9], [80, -80]);
  const yScaleValue = useSpring(rawY, { stiffness: 18, damping: 28, mass: 1.5 });

  // Opacity fades in cleanly as it enters viewport and holds clarity
  const opacity = useTransform(scrollYProgress, [0.15, 0.38, 0.78, 0.95], [0, 1, 1, 0.25]);

  // 3D perspective transform: rotateX(18deg) translateY(${yScaleValue}px) translateZ(12px)
  const transform3D = useMotionTemplate`rotateX(18deg) translateY(${yScaleValue}px) translateZ(12px)`;

  // Mouse coords & parallax refs for requestAnimationFrame
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothedMouseRef = useRef({ x: -999, y: -999 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // Create an offscreen or hidden canvas for mask generation
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const handleResize = () => {
      updateCanvasSize();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        // Start smoothed mouse near the cursor entry so it snaps gracefully
        smoothedMouseRef.current.x = e.clientX;
        smoothedMouseRef.current.y = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        if (!hasInteractedRef.current) {
          hasInteractedRef.current = true;
          smoothedMouseRef.current.x = e.touches[0].clientX;
          smoothedMouseRef.current.y = e.touches[0].clientY;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animationFrameId: number;
    let lastRenderedX = -9999;
    let lastRenderedY = -9999;

    const renderLoop = () => {
      const mouse = mouseRef.current;
      const smoothed = smoothedMouseRef.current;
      const grid = gridOffsetRef.current;

      // 1. Cursor smoothing: rAF loop with lerp factor 0.1 toward real mouse position
      smoothed.x += (mouse.x - smoothed.x) * 0.1;
      smoothed.y += (mouse.y - smoothed.y) * 0.1;

      // 2. Grid background parallax: target = (normalized cursor position - 0.5) * 16px, eased at 0.06 lerp
      if (hasInteractedRef.current && window.innerWidth > 0 && window.innerHeight > 0) {
        const normX = mouse.x / window.innerWidth;
        const normY = mouse.y / window.innerHeight;
        const targetGridX = (normX - 0.5) * 16;
        const targetGridY = (normY - 0.5) * 16;

        grid.x += (targetGridX - grid.x) * 0.06;
        grid.y += (targetGridY - grid.y) * 0.06;

        if (patternRef.current) {
          patternRef.current.setAttribute('x', grid.x.toFixed(2));
          patternRef.current.setAttribute('y', grid.y.toFixed(2));
        }
      }

      // 3. Update spotlight reveal mask
      if (ctx && revealLayerRef.current) {
        const dx = Math.abs(smoothed.x - lastRenderedX);
        const dy = Math.abs(smoothed.y - lastRenderedY);

        // Only redraw canvas if cursor moved significantly or on initial run
        if (dx > 0.2 || dy > 0.2) {
          lastRenderedX = smoothed.x;
          lastRenderedY = smoothed.y;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const radius = 260;
          const grad = ctx.createRadialGradient(
            smoothed.x,
            smoothed.y,
            0,
            smoothed.x,
            smoothed.y,
            radius
          );

          // stops: 0→1 opacity, 0.4→1, 0.6→0.75, 0.75→0.4, 0.88→0.12, 1→0
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.75)');
          grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.4)');
          grad.addColorStop(0.88, 'rgba(0, 0, 0, 0.12)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(smoothed.x, smoothed.y, radius, 0, Math.PI * 2);
          ctx.fill();

          const dataUrl = canvas.toDataURL();
          revealLayerRef.current.style.maskImage = `url(${dataUrl})`;
          revealLayerRef.current.style.webkitMaskImage = `url(${dataUrl})`;
          revealLayerRef.current.style.maskSize = '100% 100%';
          revealLayerRef.current.style.webkitMaskSize = '100% 100%';
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleNavClick = (link: string) => {
    setActiveTab(link);
    if (link === 'Home') {
      const el = document.getElementById('home');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'About') {
      const el = document.getElementById('about');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Skills') {
      const el = document.getElementById('skills');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Projects') {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Contact') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      triggerNotice(`${link.toUpperCase()} SECTION SELECTED`);
    }
  };

  // Concentric arcs calculations (cx = -110, cy = 300)
  const cx = -110;
  const cy = 300;

  return (
    <div
      className="min-h-screen bg-[#010103] tracking-[-0.02em] select-none text-white overflow-x-hidden"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Toast Notification for HUD events */}
      {actionNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Navbar (fixed, z-50) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        {/* Desktop (md+): ONE centered pill */}
        <div className="hidden md:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full pl-3 pr-2 py-2 nav-drop shadow-2xl border border-white/10">
          {/* Logo SVG (22x22 geometric angular mark) */}
          <button
            type="button"
            onClick={() => handleNavClick('Home')}
            className="flex items-center cursor-pointer focus:outline-none"
            aria-label="Augmented Self Mark"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 256 256"
              fill="white"
              className="shrink-0 mr-1"
            >
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </button>

          {/* Nav links */}
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link;
            return (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/15 shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link}
              </button>
            );
          })}

          {/* Desktop CTA "Download CV" */}
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Alesandro_Yoel_Deca_Putranto.pdf"
            onClick={() => triggerNotice('CURRICULUM VITAE DOWNLOAD INITIATED')}
            className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 ml-1 transition-colors cursor-pointer shadow-sm active:scale-95 whitespace-nowrap inline-flex items-center justify-center"
          >
            Download CV
          </a>
        </div>

        {/* Mobile (<md): Left Logo Pill */}
        <button
          type="button"
          onClick={() => handleNavClick('Home')}
          className="md:hidden bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center nav-drop border border-white/10 shadow-lg cursor-pointer focus:outline-none"
          aria-label="Logo"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 256 256"
            fill="white"
          >
            <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
          </svg>
        </button>

        {/* Mobile (<md): Right Hamburger Toggle Pill */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center text-white nav-drop border border-white/10 shadow-lg cursor-pointer focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Dropdown Menu (full-width white dropdown) */}
        {mobileMenuOpen && (
          <div className="fixed top-0 left-0 right-0 z-40 pt-16 pb-6 px-5 shadow-2xl bg-white text-gray-800 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col divide-y divide-gray-100">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => {
                    handleNavClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-3 text-left font-medium text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    activeTab === link
                      ? 'text-black font-semibold'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <span>{link}</span>
                  {activeTab === link && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                  )}
                </button>
              ))}
            </div>

            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Alesandro_Yoel_Deca_Putranto.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                triggerNotice('CURRICULUM VITAE DOWNLOAD INITIATED');
              }}
              className="w-full mt-4 bg-gray-900 text-white text-sm font-semibold py-3 rounded-full hover:bg-black transition-colors text-center cursor-pointer active:scale-98 shadow-md block"
            >
              Download CV
            </a>
          </div>
        )}
      </nav>

      {/* Hero section (100dvh, relative overflow-hidden) */}
      <section
        id="home"
        className="relative overflow-hidden w-full"
        style={{ height: '100dvh' }}
      >
        {/* Layer 1: Grid background (z-0) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ opacity: 0.1 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              ref={patternRef}
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Layer 2: Base image (z-10, red-tinted portrait with Ken Burns intro) */}
        <div
          className="absolute inset-0 bg-center bg-cover ken-burns z-10 pointer-events-none"
          style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
        />

        {/* Layer 3: Cursor spotlight reveal layer (z-30, alternate reveal image masked by canvas gradient) */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 bg-center bg-cover z-30 pointer-events-none transition-opacity duration-300"
          style={{
            backgroundImage: `url("${BG_IMAGE_2}")`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />

        {/* Layer 4: Stats on a fading circular arc (z-50, hidden below sm) */}
        <div className="absolute inset-y-0 right-0 pointer-events-none hidden sm:block z-50">
          <svg
            viewBox="0 0 450 700"
            preserveAspectRatio="xMaxYMid meet"
            className="h-full w-auto"
          >
            <defs>
              {ARC_DATA.map((arc, i) => {
                const start = polarToCartesian(cx, cy, arc.r, arc.startDeg);
                const end = polarToCartesian(cx, cy, arc.r, arc.endDeg);
                return (
                  <linearGradient
                    key={`grad-${i}`}
                    id={`arc-grad-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>

            {ARC_DATA.map((arc, i) => {
              const start = polarToCartesian(cx, cy, arc.r, arc.startDeg);
              const end = polarToCartesian(cx, cy, arc.r, arc.endDeg);
              const dot = polarToCartesian(cx, cy, arc.r, arc.dotDeg);

              const deltaAngleRad =
                ((arc.endDeg - arc.startDeg) * Math.PI) / 180;
              const arcLength = arc.r * deltaAngleRad;

              const lineDelay = 0.4 + i * 0.22;
              const markDelay = lineDelay + 0.9;
              const ringDelay = markDelay + 0.3;
              const numberDelay = markDelay + 0.15;
              const labelDelay = markDelay + 0.3;

              const pathData = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${arc.r} ${arc.r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;

              return (
                <g key={`arc-group-${i}`}>
                  {/* Arc Path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={`url(#arc-grad-${i})`}
                    strokeWidth="1.1"
                    className="arc-line"
                    style={
                      {
                        '--len': `${arcLength}px`,
                        animationDelay: `${lineDelay}s`,
                      } as React.CSSProperties
                    }
                  />

                  {/* Filled white center dot */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="3.4"
                    fill="white"
                    className="arc-dot"
                    style={{ animationDelay: `${markDelay}s` }}
                  />

                  {/* Pulsing ring around dot */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="7"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    className="arc-ring"
                    style={{ animationDelay: `${ringDelay}s` }}
                  />

                  {/* Number Stat */}
                  <text
                    x={dot.x + 16}
                    y={dot.y + 4}
                    fill="white"
                    fontSize="32"
                    fontWeight="700"
                    className="arc-text font-helvetica-neue"
                    style={{ animationDelay: `${numberDelay}s` }}
                  >
                    {arc.numMain}
                    <tspan dy="-10" letterSpacing="-1px" fontSize="19">
                      {arc.suffix}
                    </tspan>
                  </text>

                  {/* Stat uppercase label */}
                  <text
                    x={dot.x + 18}
                    y={dot.y + 22}
                    fill="white"
                    fillOpacity="0.8"
                    fontSize={arc.label.length > 15 ? '7.5' : '8.5'}
                    fontWeight="600"
                    letterSpacing={arc.label.length > 15 ? '1.5px' : '2px'}
                    className="arc-text font-helvetica-neue"
                    style={{ animationDelay: `${labelDelay}s` }}
                  >
                    {arc.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Layer 5: Hero text block (z-50) */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 max-w-[320px] sm:max-w-md md:max-w-xl z-50">
          {/* Eyebrow */}
          <div
            className="hero-rise text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-white/90 uppercase mb-3 sm:mb-4"
            style={{ animationDelay: '0.15s' }}
          >
            DATA ANALYST &amp; <span className="italic font-normal">Data Science</span>
          </div>

          {/* H1 */}
          <h1
            className="hero-rise text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.06em] text-white mb-3 sm:mb-4"
            style={{ animationDelay: '0.3s' }}
          >
            Alesandro Yoel
            <br />
            Deca Putranto
          </h1>

          {/* Paragraph */}
          <p
            className="hero-rise text-sm sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8 font-normal"
            style={{ animationDelay: '0.5s' }}
          >
            Turning data into meaningful insights to create real impact
          </p>

          {/* CTA "Projects" */}
          <div className="hero-rise" style={{ animationDelay: '0.7s' }}>
            <button
              type="button"
              onClick={() => handleNavClick('Projects')}
              className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-gray-950 font-semibold text-sm sm:text-base shadow-lg shadow-black/20 hover:scale-[1.04] active:scale-95 transition-transform duration-200 overflow-hidden cursor-pointer"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <span className="relative z-10">Projects</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Cinematic Text (full viewport height) */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="relative overflow-hidden w-full flex items-center justify-center bg-[#010103] min-h-[100dvh] py-20 sm:py-28"
        style={{ minHeight: '100dvh' }}
      >
        {/* Background: BG_IMAGE_2, object-cover */}
        <img
          src={BG_IMAGE_2}
          alt="Cinematic Armor Portrait"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-90"
        />

        {/* Ambient dark veil so text pops with high cinematic contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] pointer-events-none" />

        {/* Top gradient overlay: 180px height, linear-gradient from #010103 to transparent, z-10 */}
        <div
          className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, #010103 0%, rgba(1, 1, 3, 0) 100%)',
          }}
        />

        {/* Bottom subtle gradient to blend smoothly */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, #010103 0%, rgba(1, 1, 3, 0) 100%)',
          }}
        />

        {/* Content: Centered large paragraph in a max-w-5xl container with 3D perspective (500px) */}
        <div
          className="relative z-20 w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center px-6 sm:px-12"
          style={{ perspective: '500px' }}
        >
          <motion.div
            style={{
              transform: transform3D,
              opacity,
              transformStyle: 'preserve-3d',
            }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* HUD Section Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/90 uppercase mb-4 sm:mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Professional Summary</span>
            </div>

            <p className="font-helvetica-neue text-[15px] sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[27px] text-white/90 leading-[1.6] sm:leading-[1.5] tracking-[-0.015em] select-none text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Fresh graduate from <span className="text-white font-semibold">Business Statistics ITS</span> with hands-on experience in <span className="text-white font-semibold">Data Analytics and Business Intelligence</span>, supported by an internship as a <span className="text-white font-semibold">Junior Quality Analyst at Unilever</span>, BNSP Business Intelligence certification, and Data Analyst Associate Certification from DataCamp. Experienced in building automated data pipelines and Power BI dashboards, statistical analysis, forecasting, data validation, and root cause analysis. Proficient in <span className="text-white font-semibold">Excel, Power Query, VBA, Power BI, SQL, and Python</span>, with a strong ability to transform complex data into <span className="text-white font-semibold">actionable business insights</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Skills & Technologies */}
      <SkillsSection />

      {/* SECTION 4: Featured Projects */}
      <ProjectsSection />

      {/* SECTION 5: Contact */}
      <ContactSection />
    </div>
  );
}
