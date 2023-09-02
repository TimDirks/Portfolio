<template>
    <Intro
        class="mb-2"
        @scroll-down="scrollTo(contentSection)"
    />

    <div
        ref="contentSection"
        class="flex scroll-mt-8 flex-col gap-y-12 md:gap-y-24"
    >
        <About />

        <Work />
    </div>
</template>

<script lang="ts" setup>
import About from '@/components/About.vue';
import Intro from '@/components/Intro.vue';
import Work from '@/components/Work.vue';
import {ref} from 'vue';

const contentSection = ref<HTMLDivElement>();

const scrollTo = (section: HTMLDivElement) => {
    if (!section) return;

    section.scrollIntoView({
        behavior: 'smooth',
    });
};
</script>
