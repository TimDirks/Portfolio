import '@/assets/css/style.css';
import '@/vendor/icons';
import App from '@/App.vue';
import components from '@/plugins/components';
import {createApp} from 'vue';
import i18n from '@/vendor/i18n';
import router from '@/router';

createApp(App)
    .use(components)
    .use(router)
    .use(i18n)
    .mount('#app');
