<template>
    <div class="flex min-h-screen flex-col bg-gray-950 bg-cover bg-center font-body text-white">
        <div class="container mx-auto flex grow flex-col justify-center px-4">
            <RouterView />
        </div>

        <Footer class="my-4 text-center" />
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
</script>
