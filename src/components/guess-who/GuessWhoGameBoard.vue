<script lang="ts" setup>
import {filename} from 'pathe/utils';
import type {GuessWhoCard} from '@/components/guess-who/GuessWhoCard.vue';
import type {GuessWhoThemeCard} from '@/components/guess-who/GuessWhoThemeCard.vue';

const imageGlob = import.meta.glob(`@/assets/img/*/*.png`, {eager: true});

const {tm} = useI18n();

const selectedTheme = ref<string>();
const cards = ref<GuessWhoCard[]>([]);
const selectedCard = ref<GuessWhoCard>();

const themes = tm('guess_who.themes') || [];
const themeCards: GuessWhoThemeCard[] = themes.map((theme: Record<string, any>) => {
    const directoryRegex = new RegExp(`/assets/img/${theme.key}/.*`);

    const [_path, imageModule] = Object.entries(imageGlob)
        .find(([key]) => key.match(directoryRegex) !== null);

    return {
        name: theme.label,
        key: theme.key,
        image: imageModule?.default,
    };
});

watch(
    selectedTheme,
    () => {
        if (!selectedTheme.value) {
            cards.value = [];

            return;
        }

        const directoryRegex = new RegExp(`/assets/img/${selectedTheme.value}/.*`);

        cards.value = Object.entries(imageGlob)
            .filter(([key]) => key.match(directoryRegex) !== null)
            .map(([key, value]) => ({
                name: filename(key),
                image: value.default,
                flipped: false,
                selected: false,
            }));
    },
    {immediate: true},
);

function resetGame() {
    selectedTheme.value = undefined;
    selectedCard.value = undefined;
}

// Handle a card click.
function handleCardClick(card: GuessWhoCard) {
    const _card = cards.value.find(c => c.name === card.name);

    if (!_card) {
        return;
    }

    // If no card has been selected as the user's, save it as the selected card.
    if (!selectedCard.value) {
        selectedCard.value = card;

        _card.selected = true;

        return;
    }

    // Otherwise, the game is in play and a click should flip the card.
    _card.flipped = !_card.flipped;
}
</script>

<template>
    <Transition
        mode="out-in"
        name="fade"
    >
        <div
            v-if="!selectedTheme"
            class="space-y-4 md:space-y-8"
        >
            <h3 class="text-center">
                {{ $t('guess_who.select_theme') }}
            </h3>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-6">
                <GuessWhoThemeCard
                    v-for="themeCard in themeCards"
                    :key="`theme-${themeCard.key}`"
                    v-hide-magic-cursor
                    :theme-card
                    class="cursor-pointer"
                    @click="selectedTheme = themeCard.key"
                />
            </div>
        </div>

        <div
            v-else
            class="space-y-4"
        >
            <h3
                v-if="!selectedCard"
                class="text-center"
            >
                {{ $t('guess_who.select_card') }}
            </h3>

            <div class="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-4">
                <GuessWhoCard
                    v-for="card in cards"
                    :key="`theme-${selectedTheme}-card-${card.name}`"
                    v-hide-magic-cursor
                    :card
                    class="cursor-pointer"
                    @click="handleCardClick(card)"
                />
            </div>

            <div class="text-center">
                <UiButton @click="resetGame">
                    {{ $t('guess_who.actions.reset') }}
                </UiButton>
            </div>
        </div>
    </Transition>
</template>
