<script lang="ts" setup>
defineProps({
    card: {
        type: Object as PropType<Record<string, any>>,
        required: true,
    },
});

const flipped = ref<boolean>(false);
</script>

<template>
    <div
        v-hide-magic-cursor
        class="relative flex aspect-[8/9] cursor-pointer flex-col overflow-hidden rounded transition-transform before:absolute before:inset-0 before:rounded before:border before:border-red-400 md:rounded-2xl before:md:rounded-2xl before:md:border-2 md:hover:scale-105"
        @click="flipped = !flipped"
    >
        <img
            :alt="card.name"
            :src="card.image"
            class="size-full object-cover"
        >

        <div
            :class="flipped ? 'opacity-100' : 'opacity-0'"
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-700 transition-opacity md:gap-4"
        >
            <Icon
                class="md:!hidden"
                name="ph:question"
                size="32"
            />
            <Icon
                class="max-md:!hidden"
                name="ph:question"
                size="96"
            />

            <span>
                {{ card.name }}
            </span>
        </div>
    </div>
</template>
