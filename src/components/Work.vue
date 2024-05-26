<script lang="ts" setup>
const workCases = [
    {
        backgroundImageClass: 'bg-owow-homepage',
        case: 'owow',
    },
    {
        backgroundImageClass: 'bg-edition-one-homepage',
        case: 'editionOne',
    },
];
</script>

<template>
    <div>
        <h1 class="mb-6 text-center font-title text-2xl font-semibold uppercase xl:text-3xl">
            {{ $t('work.title') }}
        </h1>

        <div class="grid gap-4 xl:grid-cols-2">
            <div
                v-for="workCase in workCases"
                :key="`work-case-${workCase.case}`"
                :class="workCase.backgroundImageClass"
                class="group relative overflow-hidden rounded-xl bg-center p-4"
            >
                <div class="absolute inset-0 bg-black opacity-80 transition-opacity group-hover:opacity-80 xl:opacity-0" />

                <div class="relative transition-opacity group-hover:opacity-100 xl:opacity-0">
                    <div class="mb-4 text-center uppercase">
                        <div class="inline-block border-b px-2 pb-2 text-center">
                            {{ $t(`work.${workCase.case}.title`) }}
                        </div>
                    </div>

                    <div class="mb-4 whitespace-pre-line">
                        {{ $t(`work.${workCase.case}.body`) }}
                    </div>

                    <NuxtLink
                        :to="$t(`work.${workCase.case}.link`)"
                        class="text-slate-400 hover:underline"
                        target="_blank"
                        external
                    >
                        {{ $t(`work.${workCase.case}.linkText`) }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
