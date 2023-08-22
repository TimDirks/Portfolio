<template>
    <div
        class="fixed"
        :style="randomPosition"
    >
        <img
            ref="spriteImage"
            class="h-24"
            :class="spriteAnimationClass"
            src="@/assets/img/sprite-tim.png"
            @click="generateNewPosition"
        >
    </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';

let popUpTimer = 0;

const randomPosition = ref<string[]>([]);
const spriteAngle = ref<number>(0);
const spriteAnimationClass = ref<string>('translate-y-full');
const spriteImage = ref<HTMLImageElement>();

const spriteAngleOffsets = {
    bottom: 0,
    left: 90,
    top: 180,
    right: 270,
};

const spriteAnimationClasses = [
    'animate-look-left-right',
    'animate-look-right-left',
    'animate-walk-left',
    'animate-walk-right',
    'animate-wiggle-left',
    'animate-wiggle-right',
];

const generateNewPosition = () => {
    const leftOrRight = Math.random() < .5 ? 'left' : 'right';
    const topOrBottom = Math.random() < .5 ? 'top' : 'bottom';

    const placementOrder = Math.random() < .5 ? [leftOrRight, topOrBottom] : [topOrBottom, leftOrRight];

    // Generate a random percentage with 1 decimal point between 10.0 and 90.0.
    const edgeOffset = ~~(Math.random() * 800) / 10 + 10;

    // If the sprite is on the top or bottom edge, the negative offset needs to be bigger
    // to hide the sprite legs.
    const huggingEdgeOffset = placementOrder[1] === topOrBottom ? -1 : -.5;

    // Generate a random degree with 1 decimal point between -5.0 and 5.0 for sprite rotation.
    const angle = ~~(Math.random() * 100) / 10 - 5;
    const angleOffset = spriteAngleOffsets[placementOrder[1]];

    spriteAngle.value = angle + angleOffset;

    randomPosition.value = [
        `${placementOrder[0]}: ${edgeOffset}%`,
        `${placementOrder[1]}: ${huggingEdgeOffset}rem`,
        `transform: rotateZ(${spriteAngle.value}deg)`,
    ];

    pickNewAnimation();
    randomizeNewPopUp();
};

// At the end of an animation, hide the sprite offscreen.
const onAnimationEnd = () => {
    if (!spriteImage.value) return;

    spriteAnimationClass.value = 'translate-y-full';
};

const pickNewAnimation = () => {
    const randomAnimationIndex = ~~(Math.random() * spriteAnimationClasses.length);

    spriteAnimationClass.value = spriteAnimationClasses[randomAnimationIndex];
};

const randomizeNewPopUp = () => {
    clearTimeout(popUpTimer);

    // Generate a random delay between 15s and 2m 15s for the pop-up animations.
    const randomDelay = (~~(Math.random() * (60 * 2)) + 15) * 1000;

    popUpTimer = setTimeout(generateNewPosition, randomDelay);
};

onMounted(() => {
    randomizeNewPopUp();

    if (!spriteImage.value) return;

    spriteImage.value.addEventListener('animationend', onAnimationEnd);
});

onBeforeUnmount(() => {
    clearTimeout(popUpTimer);

    if (!spriteImage.value) return;

    spriteImage.value.removeEventListener('animationend', onAnimationEnd);
});
</script>
