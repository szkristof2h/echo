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
          dark: "#dafbea",
        },
        secondary: {
          light: "#1b914f",
          dark: "#177d44",
        },
        tertiary: {
          light: "#eacd05",
          dark: "#dcc313",
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
