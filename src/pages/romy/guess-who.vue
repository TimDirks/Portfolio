<script lang="ts" setup>
definePageMeta({
    name: 'romy.guess-who',
});
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
        <h2 class="mb-4 text-center">
            {{ $t('guess_who.title') }}
        </h2>

        <div class="my-auto">
            <GuessWhoGameBoard />
        </div>
    </div>
</template>
