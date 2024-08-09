<script lang="ts" setup>
definePageMeta({
    name: 'romy.countdown',
});

const timeUntilBrisbane = new Date('2024-12-01 16:55 GMT+10:00'); // Brisbane time.
</script>

<template>
    <div class="container mx-auto my-4 flex grow flex-col px-4 md:my-16">
        <h2 class="mb-4 text-center">
            {{ $t('countdown.title') }}
        </h2>

        <div class="flex h-full items-center justify-center">
            <Countdown
                v-slot="countdownParts"
                :end-date="timeUntilBrisbane"
                class="grid grid-cols-4 gap-x-8"
            >
                <div
                    v-for="([timeSegment, value]) in Object.entries(countdownParts)"
                    :key="`countdown-${timeSegment}`"
                    class="flex flex-col items-center gap-y-2"
                >
                    <h3>
                        {{ value <= 9 ? `0${value}` : value }}
                    </h3>

                    {{ $t(`countdown.${timeSegment}`, value) }}
                </div>
            </Countdown>
        </div>
    </div>
</template>
