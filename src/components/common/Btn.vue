<template>
    <component
        :is="tag"
        class="isolate overflow-hidden rounded-full border border-slate-800 before:absolute before:inset-y-0 before:left-full before:w-12 before:origin-bottom-left before:-skew-x-45 before:bg-slate-200 before:mix-blend-difference before:transition-placement before:duration-1000 before:ease-in-out hover:before:-left-24"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
defineProps({
    tag: {
        type: String,
        default: 'button',
    },
});
</script>
