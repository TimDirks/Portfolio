<template>
    <div class="relative overflow-hidden rounded-2xl bg-black px-16 pt-8">
        <img
            class="relative -bottom-4 w-48"
            src="@/assets/img/tim-transparent.png"
        >

        <div class="custom-shadow absolute inset-0" />
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="css" scoped>
.custom-shadow {
    box-shadow: inset 0 -20px 20px -10px black;
}
</style>
