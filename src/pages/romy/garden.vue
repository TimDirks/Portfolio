<script lang="ts" setup>
import type {Drawing} from '@/components/garden/GardenCanvas.vue';

definePageMeta({
    name: 'romy.garden',
});

const CANVAS_SIZE = 200;

const petalDrawing = ref<Drawing | null>(null);

function createFlower(drawing: Drawing) {
    if (!drawing.path) {
        return;
    }

    petalDrawing.value = drawing;
}
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
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

        <div class="flex h-full flex-col items-center justify-center gap-8">
            <GardenCanvas
                :canvas-size="CANVAS_SIZE"
                @artwork-created="createFlower"
            />

            <div class="min-h-[400px] w-full bg-lime-400">
                <svg
                    :height="CANVAS_SIZE"
                    :viewBox="`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`"
                    :width="CANVAS_SIZE"
                >
                    <template v-if="petalDrawing">
                        <path
                            :d="petalDrawing.path"
                            :fill="petalDrawing.color"
                            stroke="black"
                            stroke-linejoin="bevel"
                            stroke-width="4"
                        />

                        <circle
                            :cx="CANVAS_SIZE / 2"
                            :cy="CANVAS_SIZE / 2"
                            fill="blue"
                            r="20"
                        />
                    </template>
                </svg>
            </div>
        </div>
    </div>
</template>
