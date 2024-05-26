import {useModal as useFinalModal} from 'vue-final-modal';
import type {Component} from 'vue';

export function useModal(component: Component, options: Record<string, any> = {}) {
    if (!component) {
        throw new Error('Component not found');
    }

    const modal = markRaw(component);

    const {open, close} = useFinalModal({
        component: modal,
        attrs: {
            name: modal.__name,
            ...options,
            onClose: () => close(),
        },
    });

    open();

    return {
        open,
        close,
    };
}
