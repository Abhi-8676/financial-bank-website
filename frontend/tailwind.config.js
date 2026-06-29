module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#0ea5e9',
        accent: '#f59e0b',
        dark: '#1f2937',
        light: '#f9fafb',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      }
    },
  },
  plugins: [],
}