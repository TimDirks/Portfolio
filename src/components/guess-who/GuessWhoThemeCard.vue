<script lang="ts" setup>
export interface GuessWhoThemeCard {
    key: string;
    name: string;
    image: string;
}

defineProps({
    themeCard: {
        type: Object as PropType<GuessWhoThemeCard>,
        required: true,
    },
});
</script>

<template>
    <div class="relative flex flex-col divide-y-2 divide-red-400 overflow-hidden rounded border-2 border-red-400 transition-transform md:rounded-2xl md:hover:scale-105">
        <div class="aspect-[8/9]">
            <img
                :alt="themeCard.name"
                :src="themeCard.image"
                class="size-full object-cover"
            >
        </div>

        <div class="p-2 text-center text-sm md:py-2 md:text-lg">
            {{ themeCard.name }}
        </div>
    </div>
</template>
