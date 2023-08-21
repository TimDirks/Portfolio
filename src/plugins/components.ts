import {App} from 'vue';
import Btn from '@/components/common/Btn.vue';

export default {
    install(app: App): void {
        app
            .component('Btn', Btn);
    },
};
