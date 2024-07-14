/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
        "16/9": "16 / 9",
      },
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
