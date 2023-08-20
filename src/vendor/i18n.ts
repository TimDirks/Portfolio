import {createI18n} from 'vue-i18n';
import enGB from '@/lang/en-GB';

const i18n = createI18n({
    locale: 'en-GB',
    messages: {
        'en-GB': enGB,
    },
});

export default i18n;
