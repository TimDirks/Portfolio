<script lang="ts" setup>
defineProps({
    card: {
        type: Object as PropType<Record<string, any>>,
        required: true,
    },
    flipped: {
        type: Boolean,
    },
});
</script>

<template>
    <div
        v-hide-magic-cursor
        class="relative flex aspect-[8/9] cursor-pointer flex-col overflow-hidden rounded-2xl before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-red-400"
    >
        <img
            :alt="card.name"
            :src="card.image"
            class="size-full object-cover"
        >

        <!-- <div class="absolute left-0 top-0 aspect-[8/9] w-full bg-black/40" /> -->
    </div>
</template>
