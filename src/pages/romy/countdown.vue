<script lang="ts" setup>
definePageMeta({
    name: 'romy.countdown',
});

const timeOfLastKiss = new Date('2024-03-04 05:30 GMT+1:00'); // CET.
const timeOfNextKiss = new Date('2024-12-01 16:55 GMT+10:00'); // AEST.
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
        <h1 class="mb-4 text-center">
            {{ $t('countdown.title') }}
        </h1>

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
