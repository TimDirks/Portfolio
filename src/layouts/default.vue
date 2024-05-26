<template>
    <UiMagicCursor class="z-50" />

    <div class="flex flex-col bg-gray-900 text-white lg:cursor-none">
        <div class="fixed left-1/4 top-1/4 aspect-square w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-purple-600 opacity-70 blur-2xl md:w-64 md:blur-3xl" />

        <div class="container z-10 mx-auto mb-4 flex grow flex-col justify-center px-4 md:mb-12">
            <slot />
        </div>

        <Footer class="mt-8 py-6 md:mt-12" />
    </div>

    <UiPopUpSprite class="z-10" />
</template>
