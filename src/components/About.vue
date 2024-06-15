<script lang="ts" setup>
const aboutSections = [
    {
        body: 'about.knowledge.body',
        icon: 'ph:brain',
        title: 'about.knowledge.title',
    },
    {
        body: 'about.skills.body',
        icon: 'ph:laptop',
        title: 'about.skills.title',
    },
    {
        body: 'about.contact.body',
        icon: 'ph:identification-card',
        title: 'about.contact.title',
    },
];
</script>

<template>
    <div>
        <h3 class="mb-6 text-center">
            {{ $t('about.title') }}
        </h3>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="(section, index) in aboutSections"
                :key="`about-section-${section.title}`"
                :class="{ 'md:col-span-2 md:mx-auto md:w-1/2 xl:col-auto xl:mx-0 xl:w-full': !(index % 2) && index + 1 === aboutSections.length }"
                class="rounded-xl border border-slate-800 bg-gray-950 p-4 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500"
            >
                <div class="mb-4 text-center uppercase">
                    <div class="inline-block border-b px-2 pb-2 text-center">
                        <Icon
                            :name="section.icon"
                            size="24"
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
