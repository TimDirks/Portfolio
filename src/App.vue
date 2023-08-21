<template>
    <div class="cursor-none bg-white">
        <MagicCursor class="z-50" />

        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import MagicCursor from '@/components/common/MagicCursor.vue';
</script>
