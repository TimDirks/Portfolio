<script lang="ts" setup>
let popUpTimer = 0;

const randomPosition = ref<string[]>(['bottom: 0']);
const spriteAngle = ref<number>(0);
const spriteAnimationClass = ref<string>('translate-y-full');
const spriteImage = ref();

const spriteAngleOffsets: Record<string, any> = {
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

function generateNewPosition() {
    const leftOrRight = Math.random() < 0.5 ? 'left' : 'right';
    const topOrBottom = Math.random() < 0.5 ? 'top' : 'bottom';

    const placementOrder = Math.random() < 0.5 ? [leftOrRight, topOrBottom] : [topOrBottom, leftOrRight];

    // Generate a random percentage with 1 decimal point between 10.0 and 90.0.
    const edgeOffset = ~~(Math.random() * 800) / 10 + 10;

    // If the sprite is on the top or bottom edge, the negative offset needs to be bigger
    // to hide the sprite legs.
    const huggingEdgeOffset = placementOrder[1] === topOrBottom ? -1 : -0.5;

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
}

// At the end of an animation, hide the sprite offscreen.
function onAnimationEnd() {
    if (!spriteImage.value?.$el) {
        return;
    }

    spriteAnimationClass.value = 'translate-y-full';
}

function pickNewAnimation() {
    const randomAnimationIndex = ~~(Math.random() * spriteAnimationClasses.length);

    spriteAnimationClass.value = spriteAnimationClasses[randomAnimationIndex];
}

function randomizeNewPopUp() {
    clearTimeout(popUpTimer);

    // Generate a random delay between 1m and 3m for the pop-up animations.
    const randomDelay = (~~(Math.random() * (60 * 2)) + 60) * 1000;

    popUpTimer = setTimeout(generateNewPosition, randomDelay);
}

onMounted(() => {
    randomizeNewPopUp();

    if (!spriteImage.value?.$el) {
        return;
    }

    spriteImage.value.$el.addEventListener('animationend', onAnimationEnd);
});

onBeforeUnmount(() => {
    clearTimeout(popUpTimer);

    if (!spriteImage.value?.$el) {
        return;
    }

    spriteImage.value.$el.removeEventListener('animationend', onAnimationEnd);
});
</script>

<template>
    <div
        :style="randomPosition"
        class="fixed"
    >
        <NuxtImg
            ref="spriteImage"
            :class="spriteAnimationClass"
            class="h-16 md:h-24"
            src="/img/sprite-tim.png"
        />
    </div>
</template>
