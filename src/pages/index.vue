<script lang="ts" setup>
definePageMeta({
    name: 'index',
});

const contentSection = ref<HTMLDivElement>();

function scrollTo(section: HTMLDivElement) {
    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: 'smooth',
    });
}
</script>

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
