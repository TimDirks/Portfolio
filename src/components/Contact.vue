<template>
    <div>
        <div class="mb-4">
            {{ $t('contact.body') }}
        </div>

        <div class="space-x-4">
            <Btn
                v-for="social in socials"
                :key="`social-link-${social.name}`"
                class="relative inline-flex h-10 w-10 items-center justify-center"
                :href="$t(`socials.${social.name}.link`)"
                tag="a"
                target="_blank"
            >
                <FaIcon
                    :icon="social.icon"
                    size="xl"
                />
            </Btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
const socials = [
    {
        icon: ['fab', 'linkedin'],
        name: 'linkedIn',
    },
    {
        icon: ['fab', 'github'],
        name: 'github',
    },
    {
        icon: ['fab', 'instagram'],
        name: 'instagram',
    },
    {
        icon: ['far', 'envelope'],
        name: 'email',
    },
];
</script>
