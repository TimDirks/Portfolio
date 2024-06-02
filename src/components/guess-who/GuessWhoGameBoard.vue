<script lang="ts" setup>
import {filename} from 'pathe/utils';

const props = defineProps({
    theme: {
        type: String,
    },
});

const imageGlob = import.meta.glob(`@/assets/img/*/*.png`, {eager: true});

const cards = computed(() => {
    if (!props.theme) {
        return [];
    }

    const directoryRegex = new RegExp(`/assets/img/${props.theme}/.*`);

    return Object.entries(imageGlob)
        .filter(([key]) => key.match(directoryRegex) !== null)
        .map(([key, value]) => ({
            name: filename(key),
            image: value.default,
        }));
});
</script>

<template>
    <div
        v-if="theme"
        class="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-4"
    >
        <GuessWhoCard
            v-for="card in cards"
            :key="`theme-${theme}-card-${card.name}`"
            :card
        />
    </div>
</template>
