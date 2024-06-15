<script lang="ts" setup>
defineProps({
    label: {
        type: String,
    },
});
</script>

<template>
    <UiButtonBase class="px-4 py-2 transition-colors duration-300 hover:bg-slate-950">
        <slot>
            {{ label }}
        </slot>
    </UiButtonBase>
</template>
