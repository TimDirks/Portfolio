<script setup lang="ts">
//
</script>

<template>
    <div class="garden-lawn relative h-52 max-w-4xl bg-emerald-600">
        <GardenGrass class="absolute left-[12%] top-[70%] w-8" />
        <GardenGrass class="absolute left-[35%] top-[20%] w-8" />
        <GardenGrass class="absolute left-[58%] top-[40%] w-8" />
        <GardenGrass class="absolute left-[87%] top-[60%] w-8" />

        <GardenStones class="absolute left-[17%] top-[30%] w-8" />
        <GardenStones class="absolute left-[45%] top-[65%] w-8 rotate-45" />
        <GardenStones class="absolute left-[73%] top-1/4 w-8 -rotate-45" />

        <slot />

        <div class="garden-bunny absolute left-[60%] top-[67%] z-10 h-12 w-20 origin-bottom bg-rose-50 lg:left-[71%]">
            <div class="absolute -left-1 top-2 size-4 rounded-full bg-rose-50" />
            <div class="bunny-ears absolute -top-4 right-4 h-8 w-3 rotate-[-30deg] border-l border-t border-slate-200 bg-rose-50" />
            <div class="absolute right-3 top-5 size-2 rounded-full bg-slate-950" />
            <div class="bunny-nose absolute right-0 top-6 h-[.5rem] w-1 bg-pink-300" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.garden-lawn {
    border-radius: 50% / 50% 50% 0 0;
}

.garden-bunny {
    border-radius: 70% 90% 60% 50%;
    animation: bunny-hop-mobile 3s infinite;

    .bunny-ears {
        border-radius: 50% 100% 0 0;
        box-shadow: -.5rem 0 0 -.1rem #fff1f2;
    }

    .bunny-nose {
        border-radius: 50% 50% 35% 90%/35% 45% 25% 90%;
        animation: nose-wiggle 1s infinite;
    }
}

@media (min-width: 1024px) {
    .garden-bunny {
        animation: bunny-hop 3s infinite;
    }
}

@keyframes bunny-hop-mobile {
    0%, 20%, 100% {
        transform: translateY(0) rotateZ(-6deg) scale(.75);
    }
    10% {
        transform: translateY(-.25rem) rotateZ(-9deg) scale(.75);
    }
}

@keyframes bunny-hop {
    0%, 20%, 100% {
        transform: translateY(0) rotateZ(-6deg);
    }
    10% {
        transform: translateY(-.25rem) rotateZ(-9deg);
    }
}

@keyframes nose-wiggle {
    0%, 24%, 36%, 60% {
        transform: translateY(0) rotateZ(0);
    }
    12%, 48% {
        transform: translateY(-.05rem) rotateZ(-5deg);
    }
}
</style>
