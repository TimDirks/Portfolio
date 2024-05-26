<template>
    <UiMagicCursor class="z-50" />

    <div class="flex flex-col bg-gray-900 font-body text-white lg:cursor-none">
        <div class="container z-10 mx-auto flex grow flex-col justify-center px-4">
            <slot />
        </div>
    </div>
</template>
