<script lang="ts" setup>
import {gsap} from 'gsap';

const cursor = ref<HTMLDivElement>();
const cursorHidden = ref<boolean>(true);

const quickToOptions = {
    duration: .2,
    ease: 'power3',
};

const showCursor = () => {
    cursorHidden.value = false;

    window.removeEventListener('mousemove', showCursor);
};

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
        class="pointer-events-none fixed hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-opacity duration-300 lg:block"
        :class="{'opacity-0': cursorHidden}"
    />
</template>
