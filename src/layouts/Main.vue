<template>
    <div class="flex min-h-screen flex-col bg-gray-900 font-body text-white">
        <div class="absolute left-1/4 top-1/4 aspect-square w-64 -translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-r from-emerald-300 to-purple-600 opacity-70 blur-3xl" />

        <div class="container mx-auto flex grow flex-col justify-center px-4">
            <RouterView />
        </div>

        <Footer class="my-4 text-center" />
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
</script>
