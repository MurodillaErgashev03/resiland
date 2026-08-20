"use client";

import React from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogIn,
  LogOut,
  PlusCircle,
  Shield,
  ShieldCheck,
  Building2,
  ChevronDown,
  UserCheck,
} from "lucide-react";

export function UserMenu() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated || !user) {
    return (
      <Button
        asChild
        variant="outline"
        size="sm"
        className="h-9 px-3 gap-1.5 rounded-full border-white/20 bg-black/35 backdrop-blur-md text-white hover:bg-white/20 text-xs font-semibold shadow-xs cursor-pointer"
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-2 rounded-full border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs shadow-xs cursor-pointer"
          aria-label="Foydalanuvchi menyusi"
        >
          <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold text-[10px]">
            {user.name.charAt(0)}
          </div>
          <span className="font-semibold text-slate-800 hidden sm:inline max-w-[110px] truncate">
            {user.name}
          </span>
          <Badge variant={roleVariant as any} className="text-[10px] h-4 px-2 hidden md:inline-flex bg-emerald-100 text-emerald-800 border-emerald-300 font-bold rounded-full">
            {primaryRole}
          </Badge>
          <ChevronDown className="h-3 w-3 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 p-2 space-y-1 bg-white border border-slate-200 shadow-xl rounded-2xl text-slate-900 z-50"
      >
        {/* User Info Header */}
        <div className="px-2 py-1.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">{user.name}</span>
            <Badge variant={roleVariant as any} className="text-[10px] h-4 px-1.5 bg-emerald-100 text-emerald-800 border-emerald-300 font-bold">
              {primaryRole}
            </Badge>
          </div>
          <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-0.5">
            <Building2 className="h-3 w-3 text-emerald-600 shrink-0" />
            <span className="truncate">{user.organization}</span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-100" />

        {/* Quick Links */}
        <DropdownMenuItem asChild className="cursor-pointer px-2.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900">
          <Link href="/submit" className="flex items-center gap-2">
            <PlusCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t("nav.submit")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100" />

        {/* Role Switcher Test Options */}
        <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2">
          Rolni sinab ko&apos;rish (Test)
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => login("contributor")}
          className="flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Contributor roli</span>
          </span>
          {user.roles.includes("contributor") && !user.roles.includes("admin") && !user.roles.includes("moderator") && (
            <span className="text-[10px] text-emerald-600 font-bold">Faol</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => login("moderator")}
          className="flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-blue-600" />
            <span>Moderator roli</span>
          </span>
          {user.roles.includes("moderator") && !user.roles.includes("admin") && (
            <span className="text-[10px] text-blue-600 font-bold">Faol</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => login("admin")}
          className="flex items-center justify-between text-xs px-2.5 py-2 rounded-xl cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            <span>Admin roli</span>
          </span>
          {user.roles.includes("admin") && (
            <span className="text-[10px] text-amber-600 font-bold">Faol</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Tizimdan chiqish</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
