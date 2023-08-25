<template>
    <div class="grid grid-cols-2 items-center">
        <div>
            <Intro class="mb-4" />

            <Contact />
        </div>

        <div class="text-center">
            <Portrait class="inline-block" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Contact from '@/components/Contact.vue';
import Intro from '@/components/Intro.vue';
import Portrait from '@/components/common/Portrait.vue';
</script>
