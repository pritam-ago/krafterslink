/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cc-primary': 'var(--cc-primary)',
        'cc-background': 'var(--cc-background)',
        'cc-text': 'var(--cc-text)',
        'cc-card': 'var(--cc-card)',
      },
    },
  },
  plugins: [],
}