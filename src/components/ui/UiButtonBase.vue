<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: 'button',
    },
    to: {
        type: [String, Object] as PropType<string | Record<string, any>>,
    },
});

const component = computed(() => {
    return props.to
        ? resolveComponent('NuxtLink')
        : props.tag;
});
</script>

<template>
    <component
        :is="component"
        v-hide-magic-cursor
        :to
        class="
            before:-skew-x-45 before:transition-placement
            relative isolate overflow-hidden rounded-full border border-slate-800 text-white
            before:absolute before:inset-y-0 before:left-full before:w-12 before:origin-bottom-left before:bg-slate-200 before:mix-blend-difference before:duration-1000 before:ease-in-out
            disabled:cursor-not-allowed disabled:opacity-50
            [&:not([disabled])]:hover:before:-left-24
        "
    >
        <slot />
    </component>
</template>
