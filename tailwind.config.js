/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  content: [],
  theme: {
    extend: {
      colors: {
        "primary-item-color": "var(--primary-item-color)",
        "hover-primary-item-color": "var(--hover-item-color)",
        "secondary-text-color": "var(--secondary-text-color)",
      },
    }
  },
  plugins: []
}
