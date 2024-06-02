<script lang="ts" setup>
definePageMeta({
    name: 'romy.index',
});

const selectedTheme = ref<string>();
</script>

<template>
    <div>
        <h2 class="text-center">
            {{ $t('guess_who.title') }}
        </h2>

        <div>
            <UiButton
                v-for="theme in $tm('guess_who.themes')"
                :key="`theme-${theme.key}`"
                @click="selectedTheme = theme.key"
            >
                {{ theme.label }}
            </UiButton>
        </div>

        <div>
            Selected: {{ selectedTheme }}
        </div>

        <GuessWhoGameBoard :theme="selectedTheme" />
    </div>
</template>
