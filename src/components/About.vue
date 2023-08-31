<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="rounded-xl bg-black p-4">
            What I work with

            <div class="mb-4 space-x-4">
                <Btn
                    v-for="(tech, index) in techs"
                    :key="`tech-stack-${tech.icon}`"
                    class="relative inline-flex h-10 w-10 items-center justify-center transition-colors"
                    :class="{'bg-gray-800': activeTechIndex === index}"
                    @click="toggleActiveTech(index)"
                >
                    <FaIcon
                        :icon="['fab', tech.icon]"
                        size="xl"
                    />
                </Btn>
            </div>

            <div>
                {{ $t(activeTechDescription) }}
            </div>
        </div>

        <div class="rounded-xl bg-green-600 p-4">
            Showcase
        </div>

        <div class="rounded-xl bg-black p-4">
            Get in touch
        </div>

        <div class="rounded-xl bg-green-600 p-4">
            Showcase
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';

const techs = [
    {
        description: 'about.techStack.vuejs',
        icon: 'vuejs',
    },
    {
        description: 'about.techStack.js',
        icon: 'js',
    },
    {
        description: 'about.techStack.sass',
        icon: 'sass',
    },
    {
        description: 'about.techStack.html5',
        icon: 'html5',
    },
    {
        description: 'about.techStack.gitAlt',
        icon: 'git-alt',
    },
];

const techDescriptionPlaceholder = 'about.techStack.placeholder';

const activeTechIndex = ref<number|undefined>(undefined);

const activeTechDescription = computed<string>(() => {
    if (activeTechIndex.value == null) {
        return techDescriptionPlaceholder;
    }

    return techs[activeTechIndex.value].description;
});

const toggleActiveTech = (index: number) => {
    activeTechIndex.value = activeTechIndex.value === index
        ? undefined
        : index;
};
</script>
