<script lang="ts" setup>
//
</script>

<template>
    <div class="shadow-t-md bg-black shadow-black">
        <div class="container mx-auto grid gap-4 px-4 md:grid-cols-2">
            <div class="text-center">
                <Contact />
            </div>

            <div class="text-center">
                <I18nT keypath="footer.body">
                    <template #url>
                        <UiLink
                            :to="$t('footer.codeBaseLink')"
                            target="_blank"
                            external
                        >
                            {{ $t('footer.codeBaseLinkText') }}
                        </UiLink>
                    </template>
                </I18nT>
            </div>
        </div>
    </div>
</template>
