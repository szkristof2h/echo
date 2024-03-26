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
          light: "#ecfdf5",
          dark: "#C6F3DD",
        },
        secondary: {
          light: "rgba(0, 163, 0, 1)",
          dark: "rgba(30, 113, 69, 1)",
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
