<script lang="ts" setup>
defineProps({
    to: {
        type: [String, Object] as PropType<string | Record<string, any>>,
    },
});

const localePath = useLocalePath();
</script>

<template>
    <NuxtLink
        :to="to && localePath(to)"
        class="text-slate-400 hover:underline"
    >
        <slot />
    </NuxtLink>
</template>
