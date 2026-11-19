import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        timber: {
          50: "#FAF6F0",
          100: "#F4ECDF",
          200: "#E6D7BD",
          300: "#D3BD96",
          400: "#B89664",
          500: "#9C763C", // Primary warm wood brown
          600: "#7E5B29",
          700: "#62441E",
          800: "#483115",
          900: "#2F1E0C",
        },
        forest: {
          50: "#F2F7F3",
          100: "#E1EDE3",
          200: "#C3DBC7",
          300: "#96C09D",
          400: "#5D9E67",
          500: "#377C42",
          600: "#276230",
          700: "#1D4B24", // Deep forest green
          800: "#15381B",
          900: "#0D2512",
        },
        cream: {
          50: "#FCFBF8",
          100: "#F8F5EE", // Off-white/cream page background
          200: "#F0EADB",
          300: "#E4DCC6",
          400: "#CFC3A5",
        },
        charcoal: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827", // Primary dark text
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "\"Times New Roman\"", "Times", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "\"Helvetica Neue\"",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(47, 30, 12, 0.08)",
        elevated: "0 10px 30px -5px rgba(29, 75, 36, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
