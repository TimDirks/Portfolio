<script lang="ts" setup>
const socials = [
    {
        icon: 'ph:linkedin-logo',
        name: 'linkedIn',
    },
    {
        icon: 'ph:github-logo',
        name: 'github',
    },
    {
        icon: 'ph:codepen-logo',
        name: 'codepen',
    },
    {
        icon: 'ph:instagram-logo',
        name: 'instagram',
    },
    {
        icon: 'ph:envelope',
        name: 'email',
    },
];
</script>

<template>
    <div>
        <div class="mb-4">
            {{ $t('contact.body') }}
        </div>

        <div class="space-x-4">
            <UiButton
                v-for="social in socials"
                :key="`social-link-${social.name}`"
                :href="$t(`socials.${social.name}.link`)"
                class="relative inline-flex size-10 items-center justify-center"
                tag="a"
                target="_blank"
            >
                <Icon
                    :name="social.icon"
                    size="24"
                />
            </UiButton>
        </div>
    </div>
</template>
