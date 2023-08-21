<template>
    <component
        :is="tag"
        ref="button"
        class="isolate overflow-hidden rounded-full border border-slate-800 bg-slate-950 text-white before:absolute before:inset-y-0 before:left-full before:w-12 before:origin-bottom-left before:-skew-x-45 before:bg-slate-200 before:mix-blend-difference before:transition-placement before:duration-1000 before:ease-in-out hover:before:-left-24"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';

defineProps({
    tag: {
        type: String,
        default: 'button',
    },
});

const button = ref<HTMLElement>();
const magicCursor = ref<HTMLElement>();

const hideMagicCursor = () => {
    if (!magicCursor.value) return;

    magicCursor.value.classList.toggle('opacity-0', true);
};

const showMagicCursor = () => {
    if (!magicCursor.value) return;

    magicCursor.value.classList.toggle('opacity-0', false);
};

onBeforeUnmount(() => {
    button.value.removeEventListener('mouseenter', hideMagicCursor);
    button.value.removeEventListener('mouseleave', showMagicCursor);
});

onMounted(() => {
    magicCursor.value = document.getElementById('magic-cursor');

    if (!magicCursor.value) return;

    button.value.addEventListener('mouseenter', hideMagicCursor);
    button.value.addEventListener('mouseleave', showMagicCursor);
});
</script>
