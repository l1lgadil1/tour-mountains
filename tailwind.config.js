/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mountain-blue': '#2563eb',
        'mountain-green': '#16a34a',
        'mountain-gray': '#64748b',
      },
    },
  },
  plugins: [],
}