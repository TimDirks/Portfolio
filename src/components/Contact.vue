<template>
    <div class="relative overflow-y-hidden pb-2">
        <button
            class="absolute h-10 rounded-full border border-slate-800 px-4 transition-placing duration-1000 ease-in-over-out"
            :class="[socialsShown ? '-top-16' : 'top-0']"
            @click="toggleSocials"
        >
            {{ $t('socials.actions.getInTouch') }}
        </button>

        <div class="space-x-4">
            <a
                v-for="social in socials"
                :key="`social-link-${social.name}`"
                class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 transition-placing duration-1000 ease-in-over-out"
                :class="[socialsShown ? 'top-0' : '-top-16', social.delay]"
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
        delay: 'delay-300',
        icon: ['fab', 'linkedin'],
        name: 'linkedIn',
    },
    {
        delay: 'delay-500',
        icon: ['fab', 'github'],
        name: 'github',
    },
    {
        delay: 'delay-700',
        icon: ['fab', 'instagram'],
        name: 'instagram',
    },
    {
        delay: 'delay-900',
        icon: ['far', 'envelope'],
        name: 'email',
    },
];
</script>
