import { getContrastRatio } from "../src/lib/color-utils";

/**
 * Automated WCAG 2.1 AA Contrast Auditor
 * Checks critical text / background pairs in both Light and Dark modes.
 * Standard requirement: >= 4.5:1 for normal text (AA level)
 */

interface ThemeColorDefinition {
  primary: { h: number; s: number; l: number };
  primaryForeground: { h: number; s: number; l: number };
  background: { h: number; s: number; l: number };
  foreground: { h: number; s: number; l: number };
  mutedForeground: { h: number; s: number; l: number };
}

const PALETTES: Record<"light" | "dark", ThemeColorDefinition> = {
  light: {
    primary: { h: 142, s: 71, l: 29 }, // Forest green
    primaryForeground: { h: 0, s: 0, l: 100 }, // White
    background: { h: 0, s: 0, l: 100 }, // White
    foreground: { h: 222, s: 47, l: 11 }, // Dark navy text
    mutedForeground: { h: 215, s: 16, l: 40 }, // Muted text
  },
  dark: {
    primary: { h: 142, s: 60, l: 45 }, // Bright emerald for dark
    primaryForeground: { h: 0, s: 0, l: 100 }, // White
    background: { h: 222, s: 47, l: 8 }, // Dark slate background
    foreground: { h: 210, s: 40, l: 98 }, // Pure light text
    mutedForeground: { h: 215, s: 20, l: 68 }, // Muted light text
  },
};

export function runContrastAudit() {
  const results: { theme: string; pair: string; ratio: number; pass: boolean }[] = [];

  for (const [theme, colors] of Object.entries(PALETTES)) {
    const checks = [
      { name: "foreground vs background", fg: colors.foreground, bg: colors.background },
      { name: "primaryForeground vs primary", fg: colors.primaryForeground, bg: colors.primary },
      { name: "mutedForeground vs background", fg: colors.mutedForeground, bg: colors.background },
    ];

    for (const check of checks) {
      const ratio = getContrastRatio(check.fg, check.bg);
      const pass = ratio >= 4.5;
      results.push({
        theme,
        pair: check.name,
        ratio: Number(ratio.toFixed(2)),
        pass,
      });

      if (!pass) {
        console.warn(`[WCAG Alert] ${theme}: ${check.name} ratio is ${ratio.toFixed(2)} (Requirement: >= 4.5)`);
      }
    }
  }

  return results;
}

// Execute directly if run as script
const auditResults = runContrastAudit();
console.log("WCAG 2.1 AA Contrast Audit Results:", auditResults);
