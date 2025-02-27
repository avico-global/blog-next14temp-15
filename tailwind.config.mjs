import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#292726",
        secondary: "#F7F4EE",
        text: "#8F887B",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        ivy: ["IvyOraDisplayLightItalic", ...defaultTheme.fontFamily.sans],
        ivyMedium: ["IvyOraDisplayMedium", ...defaultTheme.fontFamily.sans],
        hanken: ["Hanken Grotesk", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
