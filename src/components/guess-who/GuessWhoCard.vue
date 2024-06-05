<script lang="ts" setup>
export interface GuessWhoCard {
    name: string;
    image: string;
    flipped: boolean;
    selected?: boolean;
}

defineProps({
    card: {
        type: Object as PropType<GuessWhoCard>,
        required: true,
    },
});
</script>

<template>
    <div class="relative transition-transform md:hover:scale-105">
        <div class="relative flex aspect-[8/9] flex-col overflow-hidden rounded before:absolute before:inset-0 before:rounded before:border before:border-red-400 md:rounded-2xl before:md:rounded-2xl before:md:border-2">
            <img
                :alt="card.name"
                :src="card.image"
                class="size-full object-cover"
            >

            <div
                :class="card.flipped ? 'opacity-100' : 'opacity-0'"
                class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-700 transition-opacity duration-300 md:gap-4"
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

        <div
            v-if="card.selected"
            class="absolute right-0 top-0 flex size-8 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-white shadow"
        >
            <Icon
                class="text-yellow-400"
                name="ph:star-fill"
                size="24"
            />
        </div>
    </div>
</template>
