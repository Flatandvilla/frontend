// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class-based toggling
  theme: {
    extend: {
      colors: {
        'blue': '#ba9934',
        'darkblue': '#172554',
        'lightgray': 'rgb(245 246 250)',
        'cyan': '#22d3ee',
        "slate":"#020617"
      },
      boxShadow: {
        custom: 'var(--custom-box-shadow)',
      },
      screens: {
        '3xl': '2000px',
        'lg-plus': '1044px',

      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [],
};
