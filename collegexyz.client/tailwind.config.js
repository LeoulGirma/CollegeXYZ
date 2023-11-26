export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            primary: '#009A6A',
            secondary: '#111827',
            // Other colors...
          },
          fontSize: {
            '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
            'xl': ['1.25rem', { lineHeight: '1.75' }], // 20px
            // Other font sizes...
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
            // Other font families...
          },
          // Other extensions...
        },
      },
    plugins: [],
}

