/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-img1': "url('/home-img1.jpeg')",
        'home-img2': "url('/home-img2.jpeg')",
        'home-img3': "url('/home-img3.jpeg')",
      }
    },
  },
  plugins: [],
}

