<script lang="ts" setup>
definePageMeta({
    name: 'romy.guess-who',
});
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
        <div class="relative mb-4 px-12">
            <UiButtonIcon
                :to="{ name: 'romy.index' }"
                class="!absolute left-0 top-1/2 shrink-0 -translate-y-1/2"
                icon="ph:caret-left"
            />

            <h1 class="text-center">
                {{ $t('guess_who.title') }}
            </h1>
        </div>

        <div class="my-auto">
            <GuessWhoGameBoard />
        </div>
    </div>
</template>
