<template>
    <div class="bg-black shadow-t-md shadow-black">
        <div class="container mx-auto grid grid-cols-2 gap-4 px-4">
            <div>
                <Contact />
            </div>

            <div>
                <i18n-t keypath="footer.body">
                    <template #url>
                        <a
                            class="text-slate-300 hover:underline"
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
