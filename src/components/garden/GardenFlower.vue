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
</script>

<template>
    <svg :viewBox="`0 0 ${canvasSize} ${canvasSize}`">
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
</template>
