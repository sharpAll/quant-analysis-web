import { defineConfig } from "vite-plugin-windicss";
export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0d9488",
        },
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
      },
    },
  },
  shortcuts: {
    "component-content": "bg-white shadow-lg rounded-sm",
  },
});
