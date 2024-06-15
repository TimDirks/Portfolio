<script lang="ts" setup>
defineProps({
    icon: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <UiButtonBase class="inline-flex size-10 items-center justify-center">
        <Icon
            :name="icon"
            size="24"
        />
    </UiButtonBase>
</template>
