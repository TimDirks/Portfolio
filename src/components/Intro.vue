<template>
    <div class="relative flex min-h-screen items-center justify-center">
        <div class="mb-4 inline-block uppercase tracking-wider">
            <div class="mb-2 overflow-hidden border-b border-white">
                <div
                    class="transition-transform duration-1000"
                    :class="{'translate-y-full': hideIntro}"
                >
                    <p class="text-xl text-red-800">
                        {{ $t('introduction.titlePrefix') }}
                    </p>

                    <h1 class="font-title text-10xl font-semibold shadow-black/30 text-shadow">
                        {{ $t('introduction.title') }}
                    </h1>
                </div>
            </div>

            <div class="overflow-hidden pb-2">
                <div
                    class="text-center transition-transform delay-900 duration-1000"
                    :class="{'-translate-y-full': hideIntro}"
                >
                    <p class="text-xl">
                        {{ $t('introduction.subtitle') }}
                    </p>

                    <img
                        class="mt-4 inline-block w-40 hover:animate-wiggle"
                        src="@/assets/img/sprite-tim-head.png"
                    >
                </div>
            </div>
        </div>

        <Btn
            class="absolute bottom-16 inline-flex h-10 w-10 animate-bounce items-center justify-center transition-opacity delay-1500 duration-1000"
            :class="{'opacity-0': hideIntro}"
            @click="emit('scrollDown')"
        >
            <FaIcon
                :icon="['fas', 'chevron-down']"
                size="xl"
            />
        </Btn>
    </div>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref} from 'vue';

const emit = defineEmits<{
    (event: 'scrollDown'): void,
}>();

const hideIntro = ref<boolean>(true);

onMounted(() => {
    setTimeout(() => {
        hideIntro.value = false;
    }, 500);
});
</script>
