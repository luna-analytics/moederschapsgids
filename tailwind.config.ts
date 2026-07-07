import type { Config } from "tailwindcss";
import { kleuren, radius, fontVars } from "./src/config/tokens";

/**
 * Tailwind leest de tokens uit src/config/tokens.ts (de enige hexbron) en maakt er
 * semantische utilities van. Bewust GEEN default box-shadow-schaal die "witte
 * schaduwkaarten" uitnodigt; structuurtaal met haarlijnen (border-zand) is de norm.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linnen: kleuren.linnen,
        sage: kleuren.sage,
        terracotta: {
          DEFAULT: kleuren.terracotta,
          donker: kleuren.terracottaDonker,
        },
        antraciet: kleuren.antraciet,
        zand: kleuren.zand,
      },
      borderRadius: {
        control: radius.control,
      },
      fontFamily: {
        display: [`var(${fontVars.display})`, "Georgia", "serif"],
        body: [`var(${fontVars.body})`, "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
