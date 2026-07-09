/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18202f",
        graphite: "#3b4356",
        limefit: "#b8f24b",
        coral: "#ff715b"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 45px rgba(24, 32, 47, 0.08)"
      }
    }
  },
  plugins: []
};

