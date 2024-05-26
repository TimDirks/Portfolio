/**
 * i18n configuration
 */
export default defineI18nConfig(() => ({
    legacy: false,
    defaultLocale: 'en',
    fallbackLocale: 'en',
    locales: [
        {
            code: 'en',
            iso: 'en-GB',
            file: 'en-GB.ts',
        },
    ],
}));
