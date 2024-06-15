<script lang="ts" setup>
//
</script>

<template>
    <div class="bg-black shadow-t-md shadow-black">
        <div class="container mx-auto grid gap-4 px-4 md:grid-cols-2">
            <div class="text-center">
                <Contact />
            </div>

            <div class="text-center">
                <I18nT keypath="footer.body">
                    <template #url>
                        <NuxtLink
                            :to="$t('footer.codeBaseLink')"
                            class="text-slate-400 hover:underline"
                            target="_blank"
                            external
                        >
                            {{ $t('footer.codeBaseLinkText') }}
                        </NuxtLink>
                    </template>
                </I18nT>
            </div>
        </div>
    </div>
</template>
