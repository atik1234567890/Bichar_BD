/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0d0f",
        surface: "#0f1317",
        surface2: "#141a20",
        border: "#1e2830",
        "border-light": "#253040",
        text: "#c5cdd8",
        "text-dim": "#546878",
        "text-faint": "#2a3d50",
        blood: "#cc1f1f",
        gold: "#c8930a",
        teal: "#0a9e8a",
        sky: "#1a7acc",
        orange: "#d45a1a",
        purple: "#7a3acc",
        green: "#1a9e5a",
      },
      fontFamily: {
        bangla: ["Tiro Bangla", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
        serif: ["Fraunces", "serif"],
      },
    },
  },
  plugins: [],
};
