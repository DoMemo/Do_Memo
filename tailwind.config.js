/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.3s ease-in-out",
        "slide-right": "slide-right 0.3s ease-in-out",
        "slide-down": "slide-down 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

