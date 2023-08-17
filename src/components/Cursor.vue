<template>
    <div
        ref="cursor"
        class="pointer-events-none fixed h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
    />
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {gsap} from 'gsap';

const cursor = ref<HTMLDivElement>();

const quickToOptions = {
    duration: .2,
    ease: 'power3',
};

onMounted(() => {
    const quickToX = gsap.quickTo(cursor.value, 'x', quickToOptions);
    const quickToY = gsap.quickTo(cursor.value, 'y', quickToOptions);

    const followMouse = (event: MouseEvent) => {
        quickToX(event.clientX);
        quickToY(event.clientY);
    };

    window.addEventListener('mousemove', followMouse);
});
</script>
