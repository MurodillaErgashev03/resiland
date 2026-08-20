"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "visitor" | "contributor" | "moderator" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  organization: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role?: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_USERS: Record<UserRole, AuthUser> = {
  visitor: {
    id: "usr-guest",
    name: "Mehmon / Guest",
    email: "visitor@resilandca.net",
    roles: ["visitor"],
    organization: "Public Visitor",
  },
  contributor: {
    id: "usr-contrib-01",
    name: "Dr. Anvar Rahimov",
    email: "a.rahimov@forestry.uz",
    roles: ["contributor"],
    organization: "O'rmon xo'jaligi davlat qo'mitasi",
  },
  moderator: {
    id: "usr-mod-01",
    name: "Elena Kassymova",
    email: "e.kassymova@resilandca.net",
    roles: ["contributor", "moderator"],
    organization: "RESILAND CA+ Ilmiy Kengashi",
  },
  admin: {
    id: "usr-admin-01",
    name: "Tizim Administratori",
    email: "admin@resilandca.net",
    roles: ["contributor", "moderator", "admin"],
    organization: "RESILAND CA+ Regional Center",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("resiland_auth_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, []);

  function login(role: UserRole = "contributor", customUser?: Partial<AuthUser>) {
    const base = PRESET_USERS[role];
    const newUser: AuthUser = {
      ...base,
      ...customUser,
    };
    setUser(newUser);
    localStorage.setItem("resiland_auth_user", JSON.stringify(newUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("resiland_auth_user");
  }

  function hasRole(role: UserRole): boolean {
    if (!user) return role === "visitor";
    if (user.roles.includes("admin")) return true;
    return user.roles.includes(role);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !user.roles.includes("visitor"),
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
