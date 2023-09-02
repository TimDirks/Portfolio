<template>
    <div>
        <h1 class="mb-6 text-center font-title text-2xl font-semibold uppercase xl:text-3xl">
            {{ $t('about.title') }}
        </h1>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="(section, index) in aboutSections"
                :key="`about-section-${section.title}`"
                class="rounded-xl border border-slate-800 bg-gray-950 p-4 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500"
                :class="{'md:col-span-2 md:mx-auto md:w-1/2 xl:col-auto xl:mx-0 xl:w-full': !(index % 2) && index + 1 === aboutSections.length}"
            >
                <div class="mb-4 text-center uppercase">
                    <div class="inline-block border-b px-2 pb-2 text-center">
                        <FaIcon
                            :icon="section.icon"
                            size="xl"
                        />

                        {{ $t(section.title) }}
                    </div>
                </div>

                <div class="whitespace-pre-line">
                    {{ $t(section.body) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const aboutSections = [
    {
        body: 'about.knowledge.body',
        icon: ['fas', 'brain'],
        title: 'about.knowledge.title',
    },
    {
        body: 'about.skills.body',
        icon: ['fas', 'laptop-code'],
        title: 'about.skills.title',
    },
    {
        body: 'about.contact.body',
        icon: ['far', 'address-card'],
        title: 'about.contact.title',
    },
];
</script>
