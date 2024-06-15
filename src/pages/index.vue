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
    <div class="container mx-auto mb-4 flex grow flex-col justify-center px-4 md:mb-12">
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
    </div>
</template>
