<template>
    <component
        :is="tag"
        class="isolate overflow-hidden rounded-full border border-slate-800 bg-slate-950 text-white before:absolute before:inset-y-0 before:left-full before:w-12 before:origin-bottom-left before:-skew-x-45 before:bg-slate-200 before:mix-blend-difference before:transition-placement before:duration-1000 before:ease-in-out hover:before:-left-24"
        @mouseenter="hideMagicCursor"
        @mouseleave="showMagicCursor"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

defineProps({
    tag: {
        type: String,
        default: 'button',
    },
});

const magicCursor = ref<HTMLElement>();

const hideMagicCursor = () => {
    if (!magicCursor.value) return;

    magicCursor.value.classList.toggle('opacity-0', true);
};

const showMagicCursor = () => {
    if (!magicCursor.value) return;

    magicCursor.value.classList.toggle('opacity-0', false);
};

onMounted(() => {
    magicCursor.value = document.getElementById('magic-cursor');
});
</script>
