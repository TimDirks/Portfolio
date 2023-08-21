<template>
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
</template>
