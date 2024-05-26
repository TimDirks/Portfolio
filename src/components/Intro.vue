<script lang="ts" setup>
const emit = defineEmits<{
    (event: 'scrollDown'): void;
}>();

const hideIntro = ref<boolean>(true);

onMounted(() => {
    setTimeout(() => {
        hideIntro.value = false;
    }, 500);
});
</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center">
        <div class="mb-4 inline-block uppercase tracking-wider">
            <div class="mb-2 overflow-hidden border-b border-white">
                <div
                    :class="{ 'translate-y-full': hideIntro }"
                    class="transition-transform duration-1000"
                >
                    <p class="text-red-700 xl:text-xl">
                        {{ $t('introduction.titlePrefix') }}
                    </p>

                    <h1 class="font-title text-6xl font-semibold shadow-black/30 text-shadow md:text-8xl xl:text-10xl">
                        {{ $t('introduction.title') }}
                    </h1>
                </div>
            </div>

            <div class="overflow-hidden pb-2">
                <div
                    :class="{ '-translate-y-full': hideIntro }"
                    class="pb-2 text-center transition-transform delay-900 duration-1000"
                >
                    <p class="xl:text-xl">
                        {{ $t('introduction.subtitle') }}
                    </p>

                    <NuxtImg
                        class="mt-4 inline-block w-24 hover:animate-wiggle md:w-40"
                        src="/img/sprite-tim-head.png"
                    />
                </div>
            </div>
        </div>

        <UiButton
            :class="{ 'opacity-0': hideIntro }"
            class="absolute bottom-1/8 inline-flex size-10 animate-bounce items-center justify-center transition-opacity delay-1500 duration-1000"
            @click="emit('scrollDown')"
        >
            <Icon
                name="ph:caret-down"
                size="24"
            />
        </UiButton>
    </div>
</template>
