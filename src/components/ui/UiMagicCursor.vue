<script lang="ts" setup>
import {gsap} from 'gsap';

const cursor = ref<HTMLDivElement>();
const cursorHidden = ref<boolean>(true);

const quickToOptions = {
    duration: 0.2,
    ease: 'power3',
};

function showCursor() {
    cursorHidden.value = false;

    window.removeEventListener('mousemove', showCursor);
}

onMounted(() => {
    const quickToX = gsap.quickTo(cursor.value, 'x', quickToOptions);
    const quickToY = gsap.quickTo(cursor.value, 'y', quickToOptions);

    const followMouse = (event: MouseEvent) => {
        quickToX(event.clientX);
        quickToY(event.clientY);
    };

    window.addEventListener('mousemove', showCursor);
    window.addEventListener('mousemove', followMouse);
});
</script>

<template>
    <div
        id="magic-cursor"
        ref="cursor"
        :class="{ 'opacity-0': cursorHidden }"
        class="pointer-events-none fixed hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-300 lg:block"
    />
</template>
