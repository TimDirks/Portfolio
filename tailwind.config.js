/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                'look-left-right': 'look-left-right 2s ease-in-out 1',
                'look-right-left': 'look-right-left 2s ease-in-out 1',
                'walk-left': 'walk-left 2s ease-in-out 1',
                'walk-right': 'walk-right 2s ease-in-out 1',
                'wiggle-left': 'wiggle-left 2s ease-in-out 1',
                'wiggle-right': 'wiggle-right 2s ease-in-out 1',
            },
            backgroundImage: {
                'dark-backdrop': 'url(\'/src/assets/img/dark-backdrop.jpg\')',
                'gradient-rad-dark': 'radial-gradient(#24242E 0%, #22222A 20%, #19191F 40%, #111116 60%, #08080C 80%, #030305 100%)',
            },
            colors: {
                'gray-800': '#1a1a1a',
            },
            skew: {
                45: '45deg',
            },
            transitionDelay: {
                900: '900ms',
            },
            transitionProperty: {
                placement: 'top, right, bottom, left',
            },
            transitionTimingFunction: {
                'in-over-out': 'cubic-bezier(.45, -.35, .55, 1.35)',
            },
        },
    },
    plugins: [],
};

