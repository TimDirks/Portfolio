<script lang="ts" setup>
import {filename} from 'pathe/utils';
import GuessWhoCard from '~/components/guess-who/GuessWhoCard.vue';

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
        class="grid grid-cols-8 gap-4"
    >
        <GuessWhoCard
            v-for="card in cards"
            :key="`theme-${theme}-card-${card.name}`"
            :card
        />
    </div>
</template>
