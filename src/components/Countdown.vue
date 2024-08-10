<script setup lang="ts">
const props = defineProps({
    endDate: {
        type: Date as PropType<Date>,
        required: true,
    },
    endDateTitle: String,
    interval: {
        type: Number,
        default: 100,
    },
    startDate: {
        type: Date as PropType<Date>,
        required: true,
    },
    startDateTitle: String,
});

const {localeProperties} = useI18n();

// Get the difference between the start/end date and now.
const startDateTimeDiff = ref<number>(Math.max(0, new Date().getTime() - props.startDate.getTime()));
const endDateTimeDiff = ref<number>(Math.max(0, props.endDate.getTime() - new Date().getTime()));

const diffBetweenDates = props.endDate.getTime() - props.startDate.getTime();
const percentageFormatter = new Intl.NumberFormat(localeProperties.value?.iso, {
    style: 'percent',
    minimumFractionDigits: 2,
});

const progressPercentage = computed(() => {
    const progress = startDateTimeDiff.value / diffBetweenDates;
    const progressFraction = Math.min(1, Math.max(0, progress));

    return percentageFormatter.format(progressFraction);
});

const MILLISECS_PER_SEC = 1000;
const MILLISECS_PER_MIN = MILLISECS_PER_SEC * 60;
const MILLISECS_PER_HOUR = MILLISECS_PER_MIN * 60;
const MILLISECS_PER_DAY = MILLISECS_PER_HOUR * 24;

const startDateCountdown = computed(() => ({
    days: startDateTimeDiff.value / MILLISECS_PER_DAY | 0,
    hours: startDateTimeDiff.value % MILLISECS_PER_DAY / MILLISECS_PER_HOUR | 0,
    minutes: startDateTimeDiff.value % MILLISECS_PER_HOUR / MILLISECS_PER_MIN | 0,
    seconds: startDateTimeDiff.value % MILLISECS_PER_MIN / MILLISECS_PER_SEC | 0,
}));

const endDateCountdown = computed(() => ({
    days: endDateTimeDiff.value / MILLISECS_PER_DAY | 0,
    hours: endDateTimeDiff.value % MILLISECS_PER_DAY / MILLISECS_PER_HOUR | 0,
    minutes: endDateTimeDiff.value % MILLISECS_PER_HOUR / MILLISECS_PER_MIN | 0,
    seconds: endDateTimeDiff.value % MILLISECS_PER_MIN / MILLISECS_PER_SEC | 0,
}));

const isCountingDown = ref(false);
const intervalId = ref<NodeJS.Timeout | null>(null);

function startCountdown() {
    isCountingDown.value = true;

    intervalId.value = setInterval(updateTimeDiff, props.interval);
}

function stopCountdown() {
    isCountingDown.value = false;

    if (intervalId.value) {
        clearInterval(intervalId.value);

        intervalId.value = null;
    }
}

function updateTimeDiff() {
    if (isCountingDown.value) {
        startDateTimeDiff.value = Math.max(0, new Date().getTime() - props.startDate.getTime());
        endDateTimeDiff.value = Math.max(0, props.endDate.getTime() - new Date().getTime());
    }
}

onMounted(() => {
    startCountdown();
});

onBeforeUnmount(() => {
    stopCountdown();
});

const countdowns = computed(() => ([
    {
        key: 'start-date',
        title: props.startDateTitle,
        segments: startDateCountdown.value,
    },
    {
        key: 'end-date',
        title: props.endDateTitle,
        segments: endDateCountdown.value,
    },
]));
</script>

<template>
    <ClientOnly>
        <div
            v-bind="$attrs"
            class="space-y-16"
        >
            <div
                v-for="countdown in countdowns"
                :key="`countdown-${countdown.key}`"
                class="flex flex-col items-center gap-y-3 md:gap-y-6"
            >
                <h2
                    v-if="countdown.title"
                    class="text-center"
                >
                    {{ countdown.title }}
                </h2>

                <div class="grid grid-cols-4 gap-x-4 md:gap-x-8">
                    <div
                        v-for="([timeSegment, value]) in Object.entries(countdown.segments)"
                        :key="`countdown-${countdown.key}-${timeSegment}`"
                        class="flex flex-col items-center gap-y-2"
                    >
                        <h3>
                            {{ value <= 9 ? `0${value}` : value }}
                        </h3>

                        {{ $t(`countdown.${timeSegment}`, value) }}
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center gap-y-3 md:gap-y-6">
                <h2 class="text-center">
                    {{ $t('countdown.progress_title') }}
                </h2>

                <div class="relative h-8 w-full max-w-2xl overflow-hidden rounded-full border border-gray-200 bg-gray-800">
                    <div
                        :style="{ width: `calc(${progressPercentage} / 2)` }"
                        class="absolute left-0 h-full"
                    >
                        <div class="repeating-linear-gradient size-full opacity-90" />
                    </div>

                    <div
                        :style="{ width: `calc(${progressPercentage} / 2)` }"
                        class="absolute right-0 h-full"
                    >
                        <div class="repeating-linear-gradient size-full -scale-x-100 opacity-90" />
                    </div>

                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                        {{ progressPercentage }}
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="scss" scoped>
.repeating-linear-gradient {
    background-image: repeating-linear-gradient(-45deg, #ffcb28, #ffcb28 25%, #ffb701 25%, #ffb701 50%, #ffcb28 50%, #ffcb28 75%, #ffb701 75%, #ffb701);
    background-size: 2rem 2rem;
    animation: moving-gradient 4s linear infinite;
}

@keyframes moving-gradient {
    100% {
        background-position: 4rem 2rem;
    }
}
</style>
