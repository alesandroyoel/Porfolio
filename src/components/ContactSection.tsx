/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ContactInfo {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Custom brand SVGs for the 5 platforms
const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <path
      d="M7.05 9H4.6V17.5H7.05V9ZM5.82 5.5C5.03 5.5 4.5 6.02 4.5 6.7C4.5 7.37 5.01 7.9 5.79 7.9C6.6 7.9 7.11 7.37 7.11 6.7C7.09 6.02 6.59 5.5 5.82 5.5ZM19.5 12.82C19.5 10.37 18.2 9.23 16.45 9.23C15.04 9.23 14.41 10.01 14.06 10.55V9H11.61C11.64 9.69 11.61 17.5 11.61 17.5H14.06V12.76C14.06 12.5 14.08 12.25 14.15 12.07C14.36 11.55 14.83 11.01 15.63 11.01C16.67 11.01 17.09 11.8 17.09 12.96V17.5H19.5V12.82Z"
      fill="white"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#24292F" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C7.58 4 4 7.67 4 12.2C4 15.82 6.29 18.89 9.47 19.98C9.87 20.06 10.01 19.8 10.01 19.59C10.01 19.4 10 18.75 10 17.94C7.77 18.44 7.31 17.01 7.31 17.01C6.95 16.07 6.42 15.82 6.42 15.82C5.69 15.31 6.48 15.32 6.48 15.32C7.29 15.38 7.71 16.17 7.71 16.17C8.43 17.44 9.6 17.07 10.06 16.86C10.13 16.32 10.34 15.96 10.57 15.75C8.79 15.54 6.92 14.84 6.92 11.69C6.92 10.79 7.23 10.06 7.75 9.49C7.67 9.28 7.39 8.44 7.83 7.32C7.83 7.32 8.5 7.1 10.03 8.17C10.67 7.99 11.34 7.9 12.01 7.9C12.68 7.9 13.35 7.99 13.99 8.17C15.52 7.1 16.19 7.32 16.19 7.32C16.63 8.44 16.35 9.28 16.27 9.49C16.79 10.06 17.1 10.79 17.1 11.69C17.1 14.85 15.22 15.54 13.43 15.74C13.72 15.99 13.99 16.5 13.99 17.27C13.99 18.37 13.98 19.26 13.98 19.53C13.98 19.74 14.12 20.01 14.53 19.92C17.7 18.84 20 15.78 20 12.2C20 7.67 16.42 4 12 4Z"
      fill="white"
    />
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#EA4335" />
    <path
      d="M5 8.2L12 13.2L19 8.2V16.5C19 17.05 18.55 17.5 18 17.5H6C5.45 17.5 5 17.05 5 16.5V8.2Z"
      fill="white"
    />
    <path
      d="M19 7.5C19 6.95 18.55 6.5 18 6.5H6C5.45 6.5 5 6.95 5 7.5L12 12.5L19 7.5Z"
      fill="#FFE5E2"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#25D366" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.01 4C7.59 4 4 7.59 4 12.01C4 13.53 4.43 14.99 5.23 16.26L4.35 19.54L7.75 18.66C8.98 19.41 10.45 19.82 12.01 19.82C16.43 19.82 20.02 16.23 20.02 11.81C20.02 7.39 16.43 4 12.01 4ZM16.02 15.11C15.86 15.56 15.19 15.96 14.7 16.03C14.36 16.08 13.92 16.11 12.4 15.48C10.45 14.67 9.2 12.69 9.1 12.56C9.01 12.43 8.28 11.45 8.28 10.44C8.28 9.43 8.8 8.94 8.99 8.74C9.15 8.57 9.4 8.5 9.61 8.5C9.68 8.5 9.74 8.5 9.8 8.5C10 8.5 10.1 8.52 10.23 8.83C10.39 9.22 10.78 10.17 10.82 10.27C10.87 10.37 10.9 10.5 10.83 10.63C10.77 10.76 10.71 10.84 10.61 10.95C10.51 11.06 10.42 11.15 10.32 11.27C10.21 11.39 10.1 11.52 10.22 11.73C10.34 11.94 10.77 12.64 11.41 13.21C12.24 13.95 12.92 14.19 13.16 14.29C13.4 14.39 13.54 14.37 13.68 14.21C13.82 14.05 14.28 13.51 14.44 13.28C14.6 13.05 14.76 13.08 14.97 13.16C15.18 13.24 16.32 13.8 16.55 13.92C16.78 14.04 16.94 14.09 16.99 14.19C17.05 14.29 17.05 14.74 16.89 15.19L16.02 15.11Z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig-grad" cx="20%" cy="100%" r="130%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="20%" stopColor="#FCAF45" />
        <stop offset="40%" stopColor="#F77737" />
        <stop offset="60%" stopColor="#F56040" />
        <stop offset="80%" stopColor="#FD1D1D" />
        <stop offset="100%" stopColor="#833AB4" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#ig-grad)" />
    <rect x="6.5" y="6.5" width="11" height="11" rx="3.2" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.8" stroke="white" strokeWidth="1.5" />
    <circle cx="15.5" cy="8.5" r="0.9" fill="white" />
  </svg>
);

const CONTACT_LINKS: ContactInfo[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alesandro-yoel',
    icon: <LinkedInIcon />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/alesandroyoel',
    icon: <GitHubIcon />,
  },
  {
    name: 'Email',
    href: 'mailto:alesandroyoel16@gmail.com',
    icon: <EmailIcon />,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6288801739760',
    icon: <WhatsAppIcon />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yoelputra18',
    icon: <InstagramIcon />,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white select-none"
      style={{
        background: 'linear-gradient(180deg, #05060b 0%, #080a13 22%, #0a0d18 50%, #06070c 80%, #010103 100%)',
      }}
    >
      {/* Top seamless transition veil from Section 4 */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, #05060b 0%, transparent 100%)',
        }}
      />

      {/* Subtle tactile grid layer echoing Sections 1, 3, and 4 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="contact-grid"
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
        <rect width="100%" height="100%" fill="url(#contact-grid)" />
      </svg>

      {/* Ambient Lighting & Layered Radial Glows */}
      {/* Top header subtle warm illumination */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 pointer-events-none blur-[100px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
        }}
      />
      {/* Left flank glow behind social cards */}
      <div
        className="absolute top-1/3 -left-28 w-[420px] h-[420px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(30, 41, 59, 0.20) 0%, rgba(249, 115, 22, 0.05) 45%, transparent 75%)',
        }}
      />
      {/* Right flank glow behind contact message form */}
      <div
        className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.085) 0%, rgba(234, 88, 12, 0.05) 40%, transparent 70%)',
        }}
      />
      {/* Bottom atmospheric glow framing the page conclusion */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 pointer-events-none blur-[110px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.045) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-orange-500 font-bold text-xs sm:text-sm tracking-[0.28em] uppercase mb-2 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">Contact </span>
            <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.55)]">
              Me
            </span>
          </h2>

          {/* Orange underline matching theme */}
          <div className="w-16 sm:w-20 h-1 bg-orange-500 rounded-full mx-auto mt-3.5 shadow-[0_0_14px_rgba(249,115,22,0.7)]" />
        </div>

        {/* Two-Column Grid: Social/Contact Cards Left, Message Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Platforms & Connect Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            {CONTACT_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group relative bg-[#121216]/95 hover:bg-[#18181f] border border-white/5 hover:border-orange-500/50 rounded-2xl p-4 sm:p-4.5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(249,115,22,0.15)] cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Platform Logo Box */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-inner">
                    {item.icon}
                  </div>

                  {/* Platform Name */}
                  <span className="text-base sm:text-lg text-white font-semibold group-hover:text-orange-400 transition-colors duration-200">
                    {item.name}
                  </span>
                </div>

                {/* External link indicator arrow */}
                <div className="text-gray-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 p-1">
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#121216]/95 border border-white/5 rounded-3xl p-6 sm:p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle corner glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
              }}
            />

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-gray-300 max-w-sm">
                  Thank you for reaching out! I will review your message and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 relative z-10">
                {/* Name Field */}
                <div className="flex flex-col text-left gap-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[#18181f] border border-white/10 hover:border-white/20 focus:border-orange-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col text-left gap-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-[#18181f] border border-white/10 hover:border-white/20 focus:border-orange-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col text-left gap-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#18181f] border border-white/10 hover:border-white/20 focus:border-orange-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm sm:text-base transition-all duration-200 shadow-[0_0_24px_rgba(249,115,22,0.4)] hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Clean Footer Bar */}
        <div className="mt-20 sm:mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="tracking-wide">Available for Data Analytics &amp; Science Roles</span>
          </div>
          <p className="text-center sm:text-right text-gray-400 tracking-wide">
            &copy; {new Date().getFullYear()} Alesandro Yoel Deca Putranto. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
