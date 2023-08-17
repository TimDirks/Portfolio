import {RouteRecordRaw} from 'vue-router';
import appRoutes from '@/router/routes/app';

const children: RouteRecordRaw[] = [
    ...appRoutes,
];

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('@/layouts/Main.vue'),
        children,
    },
];

export default routes;
