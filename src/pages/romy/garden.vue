<script lang="ts" setup>
import type {Drawing} from '@/components/garden/GardenCanvas.vue';

interface Flower extends Drawing {
    animationDelay: number;
}

definePageMeta({
    name: 'romy.garden',
});

const CANVAS_SIZE = 200;

const FLOWER_POSITIONS = [
    'left-[7%] top-[75%] z-[5]',
    'left-[25%] top-[45%] z-[3]',
    'left-[42%] top-[90%] z-[7]',
    'left-[52%] top-[22%] z-[1]',
    'left-[64%] top-[58%] z-[4]',
    'left-[81%] top-[82%] z-[6]',
    'left-[93%] top-[42%] z-[2]',
];

const MAX_FLOWERS = 3;

const showGarden = ref<boolean>(false);
const flowers = ref<Array<Flower>>([]);

const allFlowersDrawn = computed(() => flowers.value.length >= MAX_FLOWERS);

function createFlower(drawing: Drawing) {
    if (!drawing.path || allFlowersDrawn.value) {
        return;
    }

    // Generate a random delay (in seconds) between 0 and 3s.
    const delay = Math.round(Math.random() * 30) / 10;

    flowers.value.push({
        ...drawing,
        animationDelay: delay,
    });
}

function resetGarden() {
    // Clear all flowers.
    flowers.value.splice(0, flowers.value.length);

    // Hide the garden and show the canvas.
    showGarden.value = false;
}
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col overflow-hidden px-4 md:my-16">
        <div class="relative mb-4 px-12">
            <UiButtonIcon
                :to="{ name: 'romy.index' }"
                class="!absolute left-0 top-1/2 shrink-0 -translate-y-1/2"
                icon="ph:caret-left"
            />

            <h1 class="text-center">
                {{ $t('garden.title') }}
            </h1>
        </div>

        <div class="flex h-full flex-col items-center justify-center">
            <template v-if="!showGarden">
                <div class="mb-8 lg:mb-12">
                    <h3 class="mb-4 text-center lg:mb-6">
                        {{ $t('garden.subtitle') }}
                    </h3>

                    <GardenCanvas
                        :canvas-size="CANVAS_SIZE"
                        :disabled="allFlowersDrawn"
                        @artwork-created="createFlower"
                    />
                </div>

                <div class="flex flex-col items-center gap-4">
                    <div class="flex gap-4">
                        <div
                            v-for="(_, index) in MAX_FLOWERS"
                            :key="`preview-flower-${index}`"
                            :class="{ 'border-dashed': !flowers[index] }"
                            class="rounded-xl border-2 border-slate-600 bg-gray-700"
                        >
                            <GardenFlower
                                v-if="flowers[index]"
                                :canvas-size="CANVAS_SIZE"
                                :color="flowers[index].color"
                                :petal-path="flowers[index].path"
                                preview
                            />

                            <div
                                v-else
                                class="flex size-24 items-center justify-center text-gray-300 lg:size-32"
                            >
                                <Icon
                                    name="ph:flower-tulip"
                                    size="24"
                                />
                            </div>
                        </div>
                    </div>

                    <UiButton
                        :disabled="!allFlowersDrawn"
                        :label="$t('garden.actions.see_garden')"
                        @click="showGarden = true"
                    />
                </div>
            </template>

            <div
                v-else
                class="my-8 flex w-full flex-col items-center gap-8"
            >
                <GardenLawn class="flex w-full flex-wrap">
                    <div
                        v-for="(position, index) in FLOWER_POSITIONS"
                        :key="`flower-${position}`"
                        :class="position"
                        class="absolute -translate-x-1/2 -translate-y-full"
                    >
                        <GardenFlower
                            v-if="flowers[index % MAX_FLOWERS]"
                            :canvas-size="CANVAS_SIZE"
                            :color="flowers[index % MAX_FLOWERS].color"
                            :petal-path="flowers[index % MAX_FLOWERS].path"
                            :style="`animation-delay: -${flowers[index % MAX_FLOWERS].animationDelay * index}s`"
                        />
                    </div>
                </GardenLawn>

                <UiButton
                    :label="$t('garden.actions.reset')"
                    @click="resetGarden"
                />
            </div>
        </div>
    </div>
</template>
