<template>
    <div class="cursor-none bg-white">
        <Cursor />

        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import Cursor from '@/components/Cursor.vue';
</script>
