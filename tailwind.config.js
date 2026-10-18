/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EF",
        linen: "#EDE7DC",
        ink: "#1E1B16",
        stone: "#5A554C",
        matcha: "#6B7A5E",
        clay: "#8C5A3C",
        bamboo: "#B8A588",
        seal: "#A13D2E",
        "ink-dark": "#15130F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide: "0.08em",
        widest: "0.16em",
      },
      spacing: {
        section: "clamp(3rem, 0.5rem + 5vw, 6rem)",
        "section-lg": "clamp(3.5rem, 0.75rem + 6vw, 7.5rem)",
        "section-sm": "clamp(2.5rem, 0.5rem + 3vw, 4.5rem)",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontSize: {
        "display-lg": ["clamp(2.25rem, 1.25rem + 3vw, 3.75rem)", { lineHeight: "1.08" }],
        "display-md": ["clamp(1.875rem, 1.1rem + 2.2vw, 3rem)", { lineHeight: "1.12" }],
        "display-sm": ["clamp(1.5rem, 1rem + 1.2vw, 2.25rem)", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
};
