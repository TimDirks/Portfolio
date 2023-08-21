<template>
    <div
        class="fixed"
        :style="randomPosition"
    >
        <img
            class="h-24"
            src="@/assets/img/sprite-tim.png"
        >
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const randomPosition = ref<string>('');

const generateNewPosition = () => {
    randomPosition.value = 'top: 50%; right: 50%';
};

onMounted(generateNewPosition);
</script>
