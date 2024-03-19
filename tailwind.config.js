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
        "slide-up-load-1th": {
          "0%": { transform: "translateY(-70%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up-load-2th": {
          "0%": { transform: "translateY(-80%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up-load-3th": {
          "0%": { transform: "translateY(-90%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.2s ease-in-out",
        "slide-right": "slide-right 0.2s ease-in-out",
        "slide-down": "slide-down 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
        "slide-up-load-1th": "slide-up-load-1th 0.4s cubic-bezier(0.42, 0, 0.33, 1.46)",
        "slide-up-load-2th": "slide-up-load-2th 0.5s cubic-bezier(0.42, 0, 0.33, 1.46)",
        "slide-up-load-3th": "slide-up-load-3th 0.6s cubic-bezier(0.42, 0, 0.33, 1.46)",
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

