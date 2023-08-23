<template>
    <div class="grid grid-cols-2">
        <div>
            <Intro class="mb-4" />

            <Contact />
        </div>

        <Portrait />
    </div>
</template>

<script lang="ts" setup>
import Contact from '@/components/Contact.vue';
import Intro from '@/components/Intro.vue';
import Portrait from '@/components/common/Portrait.vue';
</script>
