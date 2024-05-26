import plugin from 'tailwindcss/plugin';
import type {Config} from 'tailwindcss';

export default {
    theme: {
        extend: {
            animation: {
                'look-left-right': 'look-left-right 2s ease-in-out 1',
                'look-right-left': 'look-right-left 2s ease-in-out 1',
                'walk-left': 'walk-left 2s ease-in-out 1',
                'walk-right': 'walk-right 2s ease-in-out 1',
                'wiggle': 'wiggle .5s linear infinite',
                'wiggle-left': 'wiggle-left 2s ease-in-out 1',
                'wiggle-right': 'wiggle-right 2s ease-in-out 1',
            },
            backgroundImage: {
                'edition-one-homepage': 'url(\'@/assets/img/edition-one-homepage.png\')',
                'owow-homepage': 'url(\'@/assets/img/owow-homepage.png\')',
            },
            boxShadow: {
                't-md': '0 -5px 5px 0 var(--tw-shadow-color)',
            },
            colors: {
                'gray-900': '#1a1a1a',
                'gray-950': '#151515',
            },
            fontFamily: {
                body: ['Roboto Mono', 'sans-serif'],
                title: ['Poppins', 'sans-serif'],
            },
            fontSize: {
                '10xl': ['9.5rem', '9rem'],
            },
            inset: {
                '1/8': '12.5%',
            },
            skew: {
                45: '45deg',
            },
            textShadow: {
                DEFAULT: '2px 2px 10px var(--tw-shadow-color)',
            },
            transitionDelay: {
                900: '900ms',
                1500: '1500ms',
            },
            transitionProperty: {
                placement: 'top, right, bottom, left',
            },
            transitionTimingFunction: {
                'in-over-out': 'cubic-bezier(.45, -.35, .55, 1.35)',
            },
        },
    },
    plugins: [
        plugin(function({matchUtilities, theme}) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                {
                    values: theme('textShadow'),
                },
            );
        }),
    ],
} as Config;
