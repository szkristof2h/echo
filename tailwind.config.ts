import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      spacing: {
        "128": "32rem",
      },
      colors: {
        primary: {
          light: "rgba(255, 255, 255, 0.7)",
          dark: "rgba(240, 240, 240, 0.7)",
        },
        secondary: {
          light: "#0f6c6c",
          dark: "#0c5656",
        },
        tertiary: {
          light: "rgba(220, 255, 175, 0.9)",
          dark: "rgba(210, 242, 167, 0.9)",
        },
        danger: {
          light: "rgba(238,17,17,1)",
          dark: "rgba(185,29,71,1)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config
