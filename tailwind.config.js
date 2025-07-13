/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#6f42c1", // Custom color, replace with the desired color
      },
    },
  },
  plugins: [],
};
