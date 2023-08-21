/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'dark-backdrop': 'url(\'/src/assets/img/dark-backdrop.jpg\')',
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
