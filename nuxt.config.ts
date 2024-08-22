// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    /* <Nuxt root config> */
    app: {
        head: {
            title: 'Tim Dirks',
        },
    },

    site: {
        url: process.env.BASE_URL,
        defaultLocale: 'en',
    },

    srcDir: 'src/',

    components: [
        '~/components',
    ],

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxtjs/seo',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
        '@nuxt/image',
    ],

    devtools: {
        enabled: true,
    },

    routeRules: {
        // Don't add any /romy/** URLs to the sitemap.xml
        '/romy/**': {robots: false, sitemap: false},
    },

    css: [
        '~/assets/scss/animations.scss',
    ],
    /* </Nuxt root config> */

    /* <Module options> */
    // TailwindCSS (https://tailwindcss.nuxtjs.org)
    tailwindcss: {
        cssPath: '~/assets/scss/tailwind.scss',
    },

    // Nuxt i18n (https://i18n.nuxtjs.org)
    i18n: {
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        detectBrowserLanguage: false,
        langDir: './i18n/locales/',
        vueI18n: './src/i18n/config',
        locales: [
            {code: 'en', iso: 'en-GB', file: 'en-GB.ts', name: 'English'},
        ],
    },

    // Nuxt Google Fonts (https://google-fonts.nuxtjs.org/)
    googleFonts: {
        display: 'swap',
        families: {
            Poppins: {
                wght: '600',
            },
            'Roboto Mono': {
                wght: '100..700',
            },
        },
    },

    // Nuxt Image (https://image.nuxt.com)
    image: {
    },
    /* </Module options> */

    compatibilityDate: '2024-08-10',
});
