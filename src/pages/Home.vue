<template>
    <Intro @scroll-down="scrollToContact" />

    <About />

    <Contact />
</template>

<script lang="ts" setup>
import About from '@/components/About.vue';
import Contact from '@/components/Contact.vue';
import Intro from '@/components/Intro.vue';

const scrollToContact = () => {
    console.log('Scrolling to next section');
};
</script>
