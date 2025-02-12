<script lang="ts" setup>
const props = defineProps({
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

const flippedStem = !!Math.round(Math.random());

// A quick, easy but not 100% accurate (but close enough) way to get a
// complementary color.
// See: https://stackoverflow.com/a/21924155/5793873
const centerColor = computed(() => {
    // Convert the HEX color to a number.
    const decColor = Number(`0x${props.color.slice(1)}`);
    // XOR the number from a central, neutral color.
    const compColor = 0x808080 ^ decColor;

    // Parse the number back to a HEX color string
    return `#${compColor.toString(16)}`;
});

const centerRadius = ((Math.random() * 10) + 15) | 0;
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
                :fill="centerColor"
                :r="centerRadius"
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
