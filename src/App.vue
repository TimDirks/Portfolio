<template>
    <div class="lg:cursor-none">
        <MagicCursor class="z-50" />

        <RouterView />

        <PopUpSprite />
    </div>
</template>

<script lang="ts" setup>
import MagicCursor from '@/components/common/MagicCursor.vue';
import PopUpSprite from '@/components/common/PopUpSprite.vue';
</script>
