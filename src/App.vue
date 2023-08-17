<template>
    <div class="min-h-screen cursor-none">
        <Cursor />

        <RouterView />
    </div>
</template>

<script lang="ts" setup>
import Cursor from '@/components/Cursor.vue';
</script>
