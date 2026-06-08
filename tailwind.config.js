/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        platinum: '#E5E5E5',
        titanium: '#A1A1AA',
        'accent-blue': '#4B599D',
        'plum-dark': '#0A0A0B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
      },
    },
  },
  plugins: [],
};
