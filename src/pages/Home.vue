<template>
    <Intro
        class="mb-2"
        @scroll-down="scrollToAbout"
    />

    <About ref="aboutSection" />

    <Contact />
</template>

<script lang="ts" setup>
import About from '@/components/About.vue';
import Contact from '@/components/Contact.vue';
import Intro from '@/components/Intro.vue';
import {ref} from 'vue';

const aboutSection = ref<HTMLElement>();

const scrollToAbout = () => {
    if (!aboutSection.value || !aboutSection.value.$el) return;

    aboutSection.value.$el.scrollIntoView({
        behavior: 'smooth',
    });
};
</script>
