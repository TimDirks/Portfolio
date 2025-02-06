<script lang="ts" setup>
definePageMeta({
    name: 'romy.index',
});
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
        <h1 class="mb-4 text-center">
            {{ $t('romy.title') }}
        </h1>

        <div class="flex h-full flex-col items-center justify-center gap-4">
            <UiButton
                :label="$t('romy.actions.to_guess_who')"
                :to="{ name: 'romy.guess-who' }"
            />

            <UiButton
                :label="$t('romy.actions.to_countdown')"
                :to="{ name: 'romy.countdown' }"
            />

            <UiButton
                :label="$t('romy.actions.to_garden')"
                :to="{ name: 'romy.garden' }"
            />
        </div>
    </div>
</template>
