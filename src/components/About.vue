<template>
    <div>
        <h1 class="mb-6 text-center font-title text-3xl font-semibold uppercase">
            {{ $t('about.title') }}
        </h1>

        <div class="grid grid-cols-3 gap-4">
            <div
                v-for="section in aboutSections"
                :key="`about-section-${section.title}`"
                class="rounded-xl border border-slate-800 bg-gray-950 p-4 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500"
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
