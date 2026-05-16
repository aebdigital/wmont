import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        muted: "#5f6368",
        line: "#e8e8e8",
        redline: "#d71920"
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(11, 11, 12, 0.08)"
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-reverse": "marquee 60s linear infinite reverse",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      }
    }
  },
  plugins: []
};

export default config;
