/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      colors:{
        'primary':'#AD6A6C',
        
        'secondary':'#5D2E46',

        'cream':'#D0ADA7',
        'herit':'#5D2E46',
        'nave':'#E8D6CB',


      },
      keyframes: {
        'scroll-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(-90%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scroll-right': 'scroll-right 30s linear infinite',
        'scroll-left': 'scroll-left 30s linear infinite',
      },
    },
  },
  plugins: [],
}