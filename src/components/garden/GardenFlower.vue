<script lang="ts" setup>
defineProps({
    canvasSize: {
        type: Number,
        default: 200,
    },
    color: {
        type: String,
        required: true,
    },
    petalPath: {
        type: String,
        required: true,
    },
});

const flippedStem = Boolean(Date.now() % 2);
</script>

<template>
    <div class="animate-sway relative origin-[50%_140%]">
        <svg
            :viewBox="`0 0 ${canvasSize} ${canvasSize}`"
            class="relative z-10"
        >
            <path
                :d="petalPath"
                :fill="color"
                stroke="black"
                stroke-linejoin="bevel"
                stroke-width="4"
            />

            <circle
                :cx="canvasSize / 2"
                :cy="canvasSize / 2"
                fill="blue"
                r="20"
            />
        </svg>

        <div
            :class="{ '-scale-x-100': flippedStem }"
            class="flower-stem absolute left-1/2 top-1/2 h-5/6 w-8 -translate-x-1/2 border-[5px] border-transparent border-r-green-800"
        >
            <div class="flower-leaf -translate-y-4/6 absolute left-full top-1/2 size-6 origin-top-left rotate-[-30deg] bg-green-500" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flower-stem {
    border-radius: 0 100% 100% 0/0 50% 65% 0;
}

.flower-leaf {
    border-radius: 0 999px;
}
</style>
