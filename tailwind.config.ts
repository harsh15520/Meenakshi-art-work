import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#2b2422", wine: "#563a36", gold: "#b4763d", ivory: "#f8f3eb", blush: "#eadbd0" } } },
  plugins: []
};
export default config;
