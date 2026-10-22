import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6E35A5",
          "purple-hover": "#5A288C",
          "purple-light": "#8E51C9",
          plum: "#30213A",
          "plum-dark": "#211628",
          pink: "#D84F91",
          "pink-hover": "#C23E7E",
          "soft-lavender": "#F5EAFB",
          "blush-pink": "#FFF0F5",
          "warm-white": "#FFFCF8",
          "warm-gray": "#F8F6F4",
          "warm-border": "#EAE5DF",
          gold: "#C5A059",
          "gold-light": "#E5CF92",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 12px 0 rgba(48, 33, 58, 0.04)",
        elevated: "0 8px 30px 0 rgba(48, 33, 58, 0.08)",
        modal: "0 20px 60px -15px rgba(48, 33, 58, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
