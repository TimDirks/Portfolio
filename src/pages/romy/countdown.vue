<script lang="ts" setup>
definePageMeta({
    name: 'romy.countdown',
});

const timeOfLastKiss = new Date('Mon, 04 Mar 2024 04:30:00 GMT'); // 05:30 in CET.
const timeOfNextKiss = new Date('Sun, 01 Dec 2024 06:55:00 GMT'); // 16:55 in AEST.
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
                {{ $t('countdown.title') }}
            </h1>
        </div>

        <div class="flex h-full items-center justify-center">
            <Countdown
                :end-date="timeOfNextKiss"
                :end-date-title="$t('countdown.end_date_title')"
                :start-date="timeOfLastKiss"
                :start-date-title="$t('countdown.start_date_title')"
                class="w-full"
            />
        </div>
    </div>
</template>
