<template>
    <div
        class="fixed"
        :style="randomPosition"
    >
        <img
            class="h-24"
            src="@/assets/img/sprite-tim.png"
            @click="generateNewPosition"
        >
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const randomPosition = ref<string[]>([]);
const spriteAngle = ref<number>(0);

const spriteAngleOffsets = {
    bottom: 0,
    left: 90,
    top: 180,
    right: 270,
};

const generateNewPosition = () => {
    const leftOrRight = Math.random() < .5 ? 'left' : 'right';
    const topOrBottom = Math.random() < .5 ? 'top' : 'bottom';

    const placementOrder = Math.random() < .5 ? [leftOrRight, topOrBottom] : [topOrBottom, leftOrRight];

    // Generate a random percentage with 1 decimal point between 10.0 and 90.0.
    const edgeOffset = ~~(Math.random() * 800) / 10 + 10;

    // If the sprite is on the top or bottom edge, the negative offset needs to be bigger
    // to hide the sprite legs.
    const huggingEdgeOffset = placementOrder[1] === topOrBottom ? -1.25 : -.5;

    // Generate a random degree with 1 decimal point between -5.0 and 5.0 for sprite rotation.
    const angle = ~~(Math.random() * 100) / 10 - 5;
    const angleOffset = spriteAngleOffsets[placementOrder[1]];

    spriteAngle.value = angle + angleOffset;

    randomPosition.value = [
        `${placementOrder[0]}: ${edgeOffset}%`,
        `${placementOrder[1]}: ${huggingEdgeOffset}rem`,
        `transform: rotate(${spriteAngle.value}deg)`,
    ];
};

onMounted(generateNewPosition);
</script>
