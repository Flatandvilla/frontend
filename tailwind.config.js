/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#ba9934',
        'darkblue':'#172554',
        'lightgray':'rgb(245 246 250)',
        'cyan':'#22d3ee'
      },
      
        boxShadow: {
          custom: 'var(--custom-box-shadow)',
        },
        screens: {
         
    
          '3xl': '2000px',
        }
      
    },
  },
  plugins: [],
}
