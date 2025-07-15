import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nowalt: ['Now Alt Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;