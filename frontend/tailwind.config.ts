import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2937",
        mist: "#fcfaf4",
        sand: "#f2ebdc",
        ember: "#b2402e",
        emberSoft: "#f8d9d2",
        jade: "#1f6b5f",
        jadeSoft: "#d7efe9",
        borderSoft: "#d7cfbf",
      },
      boxShadow: {
        panel: "0 24px 60px rgba(44, 32, 20, 0.12)",
        float: "0 16px 40px rgba(178, 64, 46, 0.16)",
      },
      fontFamily: {
        sans: ["Aptos", "\"Segoe UI Variable\"", "\"Segoe UI\"", "sans-serif"],
        display: ["\"Iowan Old Style\"", "\"Palatino Linotype\"", "\"Book Antiqua\"", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
