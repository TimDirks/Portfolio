<template>
    <div class="container mx-auto flex min-h-screen flex-col justify-center px-4 text-white">
        <Intro class="mb-4" />

        <Contact />
    </div>
</template>

<script lang="ts" setup>
import Contact from '@/components/Contact.vue';
import Intro from '@/components/Intro.vue';
</script>
