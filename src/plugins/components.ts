import {App} from 'vue';
import Btn from '@/components/common/Btn.vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';


export default {
    install(app: App): void {
        app
            .component('Btn', Btn)
            .component('FaIcon', FontAwesomeIcon);
    },
};
