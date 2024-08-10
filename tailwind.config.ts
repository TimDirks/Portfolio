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
                wiggle: 'wiggle .5s linear infinite',
                'wiggle-left': 'wiggle-left 2s ease-in-out 1',
                'wiggle-right': 'wiggle-right 2s ease-in-out 1',
            },
            backgroundImage: {
                'edition-one-homepage': 'url(\'/img/edition-one-homepage.png\')',
                'owow-homepage': 'url(\'/img/owow-homepage.png\')',
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
        plugin(({addBase, matchUtilities, theme}) => {
            addBase({
                body: {
                    fontSize: theme('fontSize.base'),
                    fontFamily: theme('fontFamily.body'),
                    lineHeight: 1.5,
                    fontWeight: theme('fontWeight.regular'),
                },
                '.h0': {
                    fontSize: theme('fontSize.6xl'),
                    fontFamily: theme('fontFamily.title'),
                    lineHeight: 1,
                    fontWeight: theme('fontWeight.semibold'),
                    textTransform: 'uppercase',
                    '@screen md': {
                        fontSize: theme('fontSize.8xl'),
                    },
                    '@screen xl': {
                        fontSize: theme('fontSize.10xl'),
                    },
                },
                'h1,.h1': {
                    fontSize: theme('fontSize.4xl'),
                    fontFamily: theme('fontFamily.title'),
                    lineHeight: 1,
                    fontWeight: theme('fontWeight.semibold'),
                    textTransform: 'uppercase',
                    '@screen md': {
                        fontSize: theme('fontSize.5xl'),
                    },
                    '@screen xl': {
                        fontSize: theme('fontSize.6xl'),
                    },
                },
                'h2,.h2': {
                    fontSize: theme('fontSize.3xl'),
                    fontFamily: theme('fontFamily.title'),
                    lineHeight: 1.125,
                    fontWeight: theme('fontWeight.semibold'),
                    textTransform: 'uppercase',
                    '@screen xl': {
                        fontSize: theme('fontSize.4xl'),
                    },
                },
                'h3,.h3': {
                    fontSize: theme('fontSize.2xl'),
                    fontFamily: theme('fontFamily.title'),
                    lineHeight: 1.15,
                    fontWeight: theme('fontWeight.semibold'),
                    textTransform: 'uppercase',
                    '@screen xl': {
                        fontSize: theme('fontSize.3xl'),
                    },
                },
            });

            matchUtilities(
                {
                    'text-shadow': value => ({
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
