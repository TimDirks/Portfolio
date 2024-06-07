<script lang="ts" setup>
defineProps({
    tag: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <component
        :is="tag"
        v-hide-magic-cursor
        class="
            relative isolate overflow-hidden rounded-full border border-slate-800 text-white
            before:absolute before:inset-y-0 before:left-full before:w-12 before:origin-bottom-left before:-skew-x-45 before:bg-slate-200 before:mix-blend-difference before:transition-placement before:duration-1000 before:ease-in-out
            enabled:hover:before:-left-24
            disabled:cursor-not-allowed disabled:opacity-50
        "
    >
        <slot />
    </component>
</template>
