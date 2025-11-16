/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0a2540',
        'primary-blue': '#00d4ff',
        'accent-orange': '#ff6b35',
        'light-gray': '#f6f9fc',
        'medium-gray': '#e6ebf1',
        'dark-gray': '#425466',
        'cream': '#faf3e0',
        'color-1': '#E8F8F8',
        'color-2': '#E8F0F8',
        'color-3': '#E8E8F8'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.8s ease',
        'fade-in-up': 'fadeInUp 0.8s ease',
        'fade-in': 'fadeIn 1s ease 0.6s both',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
