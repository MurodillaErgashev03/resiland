"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  LogOut,
  PlusCircle,
  Shield,
  ShieldCheck,
  Building2,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <Button
        asChild
        variant="outline"
        size="sm"
        className="h-8 px-3.5 gap-1.5 rounded-full border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white hover:text-white text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-black/40 cursor-pointer transition-all select-none"
      >
        <Link href="/login">
          <LogIn className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-white">{t("nav.login")}</span>
        </Link>
      </Button>
    );
  }

  const primaryRole = user.roles.includes("admin")
    ? "Admin"
    : user.roles.includes("moderator")
    ? "Moderator"
    : "Contributor";

  const roleVariant = user.roles.includes("admin")
    ? "accent"
    : user.roles.includes("moderator")
    ? "secondary"
    : "default";

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-8 px-3 gap-2 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white hover:text-white text-xs shadow-xs hover:shadow-md hover:shadow-black/40 cursor-pointer backdrop-blur-md transition-all select-none"
        aria-label="Foydalanuvchi menyusi"
      >
        <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shadow-xs shadow-black/30">
          {user.name.charAt(0)}
        </div>
        <span className="font-semibold text-white hidden sm:inline max-w-[110px] truncate">
          {user.name}
        </span>
        <Badge variant={roleVariant as any} className="text-[10px] h-4 px-2 hidden md:inline-flex bg-emerald-600/30 text-emerald-300 border-emerald-400/40 font-bold rounded-full">
          {primaryRole}
        </Badge>
        <ChevronDown className={cn("h-3 w-3 text-white/70 transition-transform duration-200", open && "rotate-180")} />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-64 p-2 space-y-1 bg-slate-950/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl text-white z-50 backdrop-blur-2xl ring-1 ring-black/30"
          >
            {/* User Info Header */}
            <div className="px-2.5 py-2 space-y-1 bg-white/5 rounded-xl border border-white/10 shadow-xs shadow-black/20">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{user.name}</span>
                <Badge variant={roleVariant as any} className="text-[10px] h-4 px-1.5 bg-emerald-600/30 text-emerald-300 border-emerald-400/40 font-bold">
                  {primaryRole}
                </Badge>
              </div>
              <div className="text-[11px] text-slate-300 truncate">{user.email}</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-0.5">
                <Building2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="truncate">{user.organization}</span>
              </div>
            </div>

            <div className="h-px bg-white/10 my-1" />

            {/* Quick Links */}
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-black/40 transition-all cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t("nav.submit")}</span>
            </Link>

            <div className="h-px bg-white/10 my-1" />

            {/* Role Switcher Test Options */}
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 pt-1">
              Rolni sinab ko&apos;rish (Test)
            </div>

            <button
              type="button"
              onClick={() => { login("contributor"); setOpen(false); }}
              className="w-full flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-black/40 transition-all"
            >
              <span className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Contributor roli</span>
              </span>
              {user.roles.includes("contributor") && !user.roles.includes("admin") && !user.roles.includes("moderator") && (
                <span className="text-[10px] text-emerald-400 font-bold">Faol</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => { login("moderator"); setOpen(false); }}
              className="w-full flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-black/40 transition-all"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-sky-400" />
                <span>Moderator roli</span>
              </span>
              {user.roles.includes("moderator") && !user.roles.includes("admin") && (
                <span className="text-[10px] text-sky-400 font-bold">Faol</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => { login("admin"); setOpen(false); }}
              className="w-full flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-200 hover:bg-white/10 hover:text-white hover:shadow-md hover:shadow-black/40 transition-all"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Admin roli</span>
              </span>
              {user.roles.includes("admin") && (
                <span className="text-[10px] text-amber-400 font-bold">Faol</span>
              )}
            </button>

            <div className="h-px bg-white/10 my-1" />

            {/* Logout */}
            <button
              type="button"
              onClick={() => { logout(); setOpen(false); }}
              className="w-full text-red-400 hover:bg-red-500/15 hover:shadow-md hover:shadow-black/40 cursor-pointer flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Tizimdan chiqish</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
