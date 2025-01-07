import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-primary": "#9CE3D6",
        "text": "#433F65",
        "color-secondary": "#6977D2",
        "color-skyBlue": "#083F7A",
        "color-placeholder": "#909BDD",
        "btn-blue": "#254FAB",
        "color-card": "#F5F5F5"
      },
    },
  },
  plugins: [],
} satisfies Config;
