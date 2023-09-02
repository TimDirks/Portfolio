<template>
    <div class="flex flex-col bg-gray-900 font-body text-white">
        <div class="fixed left-1/4 top-1/4 aspect-square w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-purple-600 opacity-70 blur-3xl hover:blur-none" />

        <div class="container z-10 mx-auto mb-24 flex grow flex-col justify-center px-4">
            <RouterView />
        </div>

        <Footer class="mt-12 py-6" />
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
</script>
