<template>
    <div>
        <h1 class="mb-6 text-center font-title text-3xl font-semibold uppercase">
            {{ $t('about.title') }}
        </h1>

        <div class="grid grid-cols-3 gap-4">
            <div class="rounded-xl border border-slate-800 bg-gray-950 px-4 py-2 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500">
                <div class="mb-4 text-center uppercase">
                    <div class="inline-block border-b p-2 text-center">
                        <FaIcon
                            :icon="['fas', 'brain']"
                            size="xl"
                        />

                        {{ $t('about.knowledge.title') }}
                    </div>
                </div>

                <div class="whitespace-pre-line">
                    {{ $t('about.knowledge.body') }}
                </div>
            </div>

            <div class="rounded-xl border border-slate-800 bg-gray-950 px-4 py-2 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500">
                <div class="mb-4 text-center uppercase">
                    <div class="inline-block border-b p-2 text-center">
                        <FaIcon
                            :icon="['fas', 'laptop-code']"
                            size="xl"
                        />

                        {{ $t('about.skills.title') }}
                    </div>
                </div>

                <div class="whitespace-pre-line">
                    {{ $t('about.skills.body') }}
                </div>
            </div>

            <div class="rounded-xl border border-slate-800 bg-gray-950 px-4 py-2 transition hover:-translate-y-2 hover:shadow-md hover:shadow-gray-500">
                <div class="mb-4 text-center uppercase">
                    <div class="inline-block border-b p-2 text-center">
                        <FaIcon
                            :icon="['far', 'address-card']"
                            size="xl"
                        />

                        {{ $t('about.contact.title') }}
                    </div>
                </div>

                <div class="whitespace-pre-line">
                    {{ $t('about.contact.body') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>
