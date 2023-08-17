<template>
    <div>
        <button
            v-if="!socialsShown"
            class="rounded-full border border-slate-800 px-4 py-2"
            @click="toggleSocials"
        >
            Show others
        </button>

        <div
            v-else
            class="space-x-4"
        >
            <a
                v-for="social in socials"
                :key="`social-link-${social.name}`"
                class="inline-block rounded-full border border-slate-800 px-4 py-2"
                :href="social.link"
                target="_blank"
            >
                {{ social.name }}
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const socialsShown = ref<boolean>(false);

const toggleSocials = () => socialsShown.value = !socialsShown.value;

const socials = [
    {
        link: 'https://www.linkedin.com/in/tim-dirks-3125a0139/',
        name: 'LinkedIn',
    },
    {
        link: 'https://github.com/TimDirks',
        name: 'Github',
    },
    {
        link: 'https://www.instagram.com/tim.dirks',
        name: 'Instragram',
    },
    {
        link: 'mailto:tim.dirks@hotmail.com',
        name: 'Mail',
    },
];
</script>
