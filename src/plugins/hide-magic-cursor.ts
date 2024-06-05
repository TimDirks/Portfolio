const magicCursor = ref<HTMLElement>();

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive<HTMLElement>('hide-magic-cursor', {
        mounted(el) {
            magicCursor.value ||= document.getElementById('magic-cursor') || undefined;

            el.addEventListener('mouseenter', hideMagicCursor);
            el.addEventListener('mouseleave', showMagicCursor);
        },
        beforeUnmount(el) {
            el.removeEventListener('mouseenter', hideMagicCursor);
            el.removeEventListener('mouseleave', showMagicCursor);

            showMagicCursor();
        },
    });
});

function hideMagicCursor() {
    if (!magicCursor.value) {
        return;
    }

    magicCursor.value.classList.toggle('opacity-0', true);
}

function showMagicCursor() {
    if (!magicCursor.value) {
        return;
    }

    magicCursor.value.classList.toggle('opacity-0', false);
}
