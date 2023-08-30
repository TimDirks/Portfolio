<template>
    <div class="flex min-h-screen flex-col bg-gray-950 bg-cover bg-center font-body text-white">
        <div class="absolute left-1/4 top-1/4 aspect-square w-64 -translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-r from-emerald-300 to-purple-600 opacity-70" />
        <div class="absolute h-full w-full backdrop-blur-[96px]" />

        <div class="z-10">
            <div class="container mx-auto flex grow flex-col justify-center px-4">
                <RouterView />
            </div>

            <Footer class="my-4 text-center" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
</script>
