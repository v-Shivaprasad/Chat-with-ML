/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'primary-97': 'rgba(var(--color-primary), 0.97)',
        'primary-95': 'rgba(var(--color-primary), 0.95)',
          'chatMsg': 'radial-gradient(circle at 11% 38%, #030715F0 27%, #030715ED 64%, #010A30 100%)',
     },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@material-tailwind/react/utils/withMT'),
  ],
}

