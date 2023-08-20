<template>
    <div>
        <button
            v-if="!socialsShown"
            class="h-10 rounded-full border border-slate-800 px-4"
            @click="toggleSocials"
        >
            {{ $t('socials.actions.getInTouch') }}
        </button>

        <div
            v-else
            class="space-x-4"
        >
            <a
                v-for="social in socials"
                :key="`social-link-${social.name}`"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800"
                :href="$t(`socials.${social.name}.link`)"
                target="_blank"
                :title="$t(`socials.${social.name}.title`)"
            >
                <FontAwesomeIcon
                    :icon="social.icon"
                    size="xl"
                />
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {ref} from 'vue';

const socialsShown = ref<boolean>(false);

const toggleSocials = () => socialsShown.value = !socialsShown.value;

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
