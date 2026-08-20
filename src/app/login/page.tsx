"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth, UserRole } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Lock,
  LogIn,
  ShieldCheck,
  ArrowLeft,
  UserCheck,
  Shield,
  KeyRound,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleStandardLogin(e: React.FormEvent) {
    e.preventDefault();
    login("contributor", {
      email: email || "contributor@resilandca.net",
      name: email ? email.split("@")[0] : "Dr. Anvar Rahimov",
    });
    router.push("/submit");
  }

  function handleRoleLogin(role: UserRole) {
    login(role);
    router.push(role === "contributor" || role === "admin" ? "/submit" : "/materials");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-md border-border">
          <CardHeader className="space-y-2 text-center pb-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <KeyRound className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold">{t("nav.login")} (Auth0 / SSO)</CardTitle>
            <CardDescription className="text-xs">
              RESILAND CA+ Contributor va Moderatorlar uchun kirish portali
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Quick One-Click Demo Role Logins */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Tezkor test rollari orqali kirish:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleRoleLogin("contributor")}
                  className="text-xs h-9 font-medium gap-1.5"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Contributor</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleRoleLogin("moderator")}
                  className="text-xs h-9 font-medium gap-1.5"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Moderator</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRoleLogin("admin")}
                  className="text-xs h-9 font-medium gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>Admin</span>
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center text-xs uppercase">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-3 text-muted-foreground text-[10px] tracking-wider font-semibold">
                Yoki Auth0 hisobi bilan
              </span>
              <div className="border-t border-border w-full" />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Elektron pochta (Email)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nomi@muassasa.org"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold">
                  Parol
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full font-semibold gap-2 rounded-xl h-10 shadow-xs">
                <LogIn className="h-4 w-4" />
                <span>{t("nav.login")}</span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 pt-2 text-center text-xs text-muted-foreground border-t border-border">
            <div className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>JWT session & Auth0 custom claims himoyasi</span>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Bosh sahifaga qaytish
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
