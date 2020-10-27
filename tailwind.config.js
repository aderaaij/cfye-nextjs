var colors = require('./material-colors.tailwind.js');
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        cfye: '#ec008c',
        ...colors,
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '3.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      maxWidth: {
        paragraph: '65ch',
      },
    },
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont'],
      serif: ['maecenas', 'Cambria'],
      mono: ['SFMono-Regular', 'Menlo'],
      header: ['protipo-narrow', 'sans-serif'],
      body: ['maecenas', 'serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      hd: '1920px',
      qhd: '2560px',
      '4k': '3840px',
    },
  },
  variants: {
    scrollSnapType: ['responsive'],
  },
  plugins: [require('tailwindcss-scroll-snap')],
};
