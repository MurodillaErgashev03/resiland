"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { UserMenu } from "./user-menu";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Database,
  PlusCircle,
  Menu,
  X,
  Layers,
  ChevronDown,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const programsDropdown = [
  { href: "/programs/kyrgyzstan", label: "Qirg'iziston Respublikasi", flag: "🇰🇬" },
  { href: "/programs/tajikistan", label: "Tojikiston", flag: "🇹🇯" },
  { href: "/programs/uzbekistan", label: "O'zbekiston", flag: "🇺🇿" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/about", label: "RESILAND haqida", exact: true },
    { href: "/news", label: "Yangiliklar", exact: false },
    { href: "/publications", label: "Nashrlar", exact: false },
    { href: "/events", label: "Tadbirlar", exact: false },
    { href: "/contact", label: "Bog'lanish", exact: false },
    { href: "/materials", label: t("nav.materials"), exact: false },
  ];

  const mobileNavLinks = [
    { href: "/about", label: "RESILAND haqida" },
    { href: "/programs/kyrgyzstan", label: "Qirg'iziston Respublikasi", indent: true },
    { href: "/programs/tajikistan", label: "Tojikiston", indent: true },
    { href: "/programs/uzbekistan", label: "O'zbekiston", indent: true },
    { href: "/news", label: "Yangiliklar" },
    { href: "/publications", label: "Nashrlar" },
    { href: "/events", label: "Tadbirlar" },
    { href: "/contact", label: "Bog'lanish" },
    { href: "/materials", label: t("nav.materials"), icon: Database },
    { href: "/submit", label: t("nav.submit"), icon: PlusCircle },
  ];

  const isProgramsActive = programsDropdown.some((p) => pathname.startsWith(p.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/15 bg-black/40 backdrop-blur-xl text-white transition-all shadow-md">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">

        {/* Brand Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-emerald-400 backdrop-blur-md group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-black text-sm tracking-tight text-white drop-shadow-sm">RESILAND CA+</span>
          </Link>

          {/* Desktop Nav — frosted dark pill container with animated emerald droplet */}
          <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-xs">
            {/* RESILAND haqida */}
            {navLinks.slice(0, 1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative h-8 inline-flex items-center px-3.5 rounded-full text-xs font-semibold transition-colors duration-300 select-none",
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDroplet"
                      className="absolute inset-0 bg-emerald-600 rounded-full shadow-md shadow-emerald-700/30"
                      transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.7 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Dastur Komponentlari dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProgramsOpen(!programsOpen)}
                className={cn(
                  "relative h-8 flex items-center gap-1 px-3.5 rounded-full text-xs font-semibold transition-colors duration-300 select-none",
                  isProgramsActive ? "text-white" : "text-white/80 hover:text-white"
                )}
              >
                {isProgramsActive && (
                  <motion.div
                    layoutId="activeNavDroplet"
                    className="absolute inset-0 bg-emerald-600 rounded-full shadow-md shadow-emerald-700/30"
                    transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.7 }}
                  />
                )}
                <span className="relative z-10">Dastur Komponentlari</span>
                <ChevronDown className={cn("relative z-10 h-3.5 w-3.5 transition-transform duration-200", programsOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-56 bg-slate-900/95 border border-white/20 rounded-2xl shadow-xl shadow-black/40 overflow-hidden z-50 backdrop-blur-xl"
                  >
                    {programsDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProgramsOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors",
                          pathname.startsWith(item.href)
                            ? "text-emerald-400 bg-white/10 font-bold"
                            : "text-slate-200 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span className="text-base">{item.flag}</span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining nav links */}
            {navLinks.slice(1).map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative h-8 inline-flex items-center px-3.5 rounded-full text-xs font-semibold transition-colors duration-300 select-none",
                    isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDroplet"
                      className="absolute inset-0 bg-emerald-600 rounded-full shadow-md shadow-emerald-700/30"
                      transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.7 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <UserMenu />

          {/* Submit CTA — faqat tizimga kirganlar uchun */}
          {isAuthenticated && (
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex h-8 px-3.5 rounded-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 text-xs gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Link href="/submit">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>{t("nav.submit")}</span>
              </Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-white hover:bg-white/20 rounded-full h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menyuni ochish"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {mobileNavLinks.map((link) => {
                const isActive = pathname === link.href || (!link.href.endsWith("/") && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      "indent" in link && link.indent ? "ml-4" : "",
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    )}
                  >
                    {"icon" in link && link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
