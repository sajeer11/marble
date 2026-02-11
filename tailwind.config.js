module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#B88E2F',
        'primary-dark': '#9A7626',
        'background-light': '#FCF8F3',
        'background-dark': '#1F1F1F',
        'surface-dark': '#2A2A2A',
        'text-dark': '#E8E8E8',
        'text-light': '#333333',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
