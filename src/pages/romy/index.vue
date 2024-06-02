<script lang="ts" setup>
definePageMeta({
    name: 'romy.index',
});

const selectedTheme = ref<string>();
</script>

<template>
    <div>
        <h2 class="text-center">
            Guess Who?
        </h2>

        <div>
            <UiButton @click="selectedTheme = 'bekende_gezichten'">
                Bekende Gezichten
            </UiButton>

            <UiButton @click="selectedTheme = 'dieren'">
                Dieren
            </UiButton>
        </div>

        <div>
            Selected: {{ selectedTheme }}
        </div>

        <GuessWhoGameBoard :theme="selectedTheme" />
    </div>
</template>
