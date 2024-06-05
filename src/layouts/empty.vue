<template>
    <UiMagicCursor class="z-50" />

    <div class="flex min-h-screen flex-col bg-gray-900 text-white lg:cursor-none">
        <main class="z-10 flex grow">
            <slot />
        </main>
    </div>
</template>
