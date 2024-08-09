<script setup lang="ts">
const props = defineProps({
    endDate: {
        type: Date as PropType<Date>,
        required: true,
    },
    interval: {
        type: Number,
        default: 1000,
    },
});

// Get the difference between the end date and now.
const timeDiff = ref<number>(props.endDate.getTime() - new Date().getTime());
const previousTimeDiff = ref<number>(timeDiff.value);

// Since the updateTimeDiff function won't be called exactly every 1000ms, there is a small margin of time drift (10ms/s).
// This slowly adds up over time resulting in a delay of a second every ±100 seconds making the formatted time diff
// seconds value jump by 2 seconds. To prevent this, we keep track of the time drift and subtract it from the delay in
// the next time progressCountdown gets called.
const timeDrift = ref<number>(0);

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
const requestFrameId = ref<number | null>(null);

function startCountdown() {
    isCountingDown.value = true;

    progressCountdown();
}

function stopCountdown() {
    isCountingDown.value = false;

    if (requestFrameId.value) {
        cancelAnimationFrame(requestFrameId.value);

        requestFrameId.value = null;
    }
}

function progressCountdown() {
    if (!isCountingDown.value) {
        return;
    }

    // TODO: FIX TIME DRIFT!
    const delay = Math.min(timeDiff.value, (props.interval - timeDrift.value));

    if (delay <= 0) {
        stopCountdown();

        return;
    }

    let initialTime: number;

    const step = (now: DOMHighResTimeStamp) => {
        if (!initialTime) {
            initialTime = now;
        }

        const deltaTime = now - initialTime;

        if (deltaTime >= delay) {
            updateTimeDiff();
            progressCountdown();
        } else {
            requestFrameId.value = requestAnimationFrame(step);
        }
    };

    requestFrameId.value = requestAnimationFrame(step);
}
const sum = ref(0);
function updateTimeDiff() {
    if (isCountingDown.value) {
        previousTimeDiff.value = timeDiff.value;
        timeDiff.value = Math.max(0, props.endDate.getTime() - new Date().getTime());

        sum.value += (previousTimeDiff.value - timeDiff.value - props.interval);
        timeDrift.value = previousTimeDiff.value - timeDiff.value - props.interval;
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

        <div>
            {{ previousTimeDiff - timeDiff }} -- {{ sum }} -- {{ timeDrift }}
        </div>
    </ClientOnly>
</template>
