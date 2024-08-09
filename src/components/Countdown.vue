<script setup lang="ts">
const props = defineProps({
    endDate: {
        type: Date as PropType<Date>,
        required: true,
    },
    interval: {
        type: Number,
        default: 100,
    },
});

// Get the difference between the end date and now.
const timeDiff = ref<number>(props.endDate.getTime() - new Date().getTime());

const MILLISECS_PER_SEC = 1000;
const MILLISECS_PER_MIN = MILLISECS_PER_SEC * 60;
const MILLISECS_PER_HOUR = MILLISECS_PER_MIN * 60;
const MILLISECS_PER_DAY = MILLISECS_PER_HOUR * 24;

const formattedTimeDiff = computed(() => ({
    days: timeDiff.value / MILLISECS_PER_DAY | 0,
    hours: timeDiff.value % MILLISECS_PER_DAY / MILLISECS_PER_HOUR | 0,
    minutes: timeDiff.value % MILLISECS_PER_HOUR / MILLISECS_PER_MIN | 0,
    seconds: timeDiff.value % MILLISECS_PER_MIN / MILLISECS_PER_SEC | 0,
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
        timeDiff.value = Math.max(0, props.endDate.getTime() - new Date().getTime());
    }
}

onMounted(() => {
    startCountdown();
});

onBeforeUnmount(() => {
    stopCountdown();
});
</script>

<template>
    <ClientOnly>
        <div v-bind="$attrs">
            <slot v-bind="formattedTimeDiff" />
        </div>
    </ClientOnly>
</template>
