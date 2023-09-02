<template>
    <div class="lg:cursor-none">
        <MagicCursor class="z-50" />

        <RouterView />

        <PopUpSprite class="z-10" />
    </div>
</template>

<script lang="ts" setup>
import MagicCursor from '@/components/common/MagicCursor.vue';
import PopUpSprite from '@/components/common/PopUpSprite.vue';
</script>
