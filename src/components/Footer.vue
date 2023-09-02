<template>
    <div class="bg-black shadow-t-md shadow-black">
        <div class="container mx-auto grid gap-4 px-4 md:grid-cols-2">
            <div class="text-center">
                <Contact />
            </div>

            <div class="text-center">
                <i18n-t keypath="footer.body">
                    <template #url>
                        <a
                            class="text-slate-400 hover:underline"
                            :href="$t('footer.codeBaseLink')"
                            target="_blank"
                        >
                            {{ $t('footer.codeBaseLinkText') }}
                        </a>
                    </template>
                </i18n-t>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Contact from '@/components/Contact.vue';
</script>
