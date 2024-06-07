<script lang="ts" setup>
import {filename} from 'pathe/utils';
import type {GuessWhoCard} from '@/components/guess-who/GuessWhoCard.vue';
import type {GuessWhoThemeCard} from '@/components/guess-who/GuessWhoThemeCard.vue';

const imageGlob = import.meta.glob(`@/assets/img/*/*.png`, {eager: true});

const {tm} = useI18n();

const selectedTheme = ref<string>();
const cards = ref<GuessWhoCard[]>([]);
const selectedCard = ref<GuessWhoCard>();
const selectionConfirmed = ref<boolean>(false);

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

function resetBoard() {
    selectedCard.value = undefined;
    selectionConfirmed.value = false;

    cards.value.forEach((card) => {
        card.flipped = false;
        card.selected = false;
    });
}

function resetGame() {
    selectedTheme.value = undefined;
    selectedCard.value = undefined;
    selectionConfirmed.value = false;
}

// Handle a card click.
function handleCardClick(card: GuessWhoCard) {
    const _card = cards.value.find(c => c.name === card.name);

    if (!_card) {
        return;
    }

    // If no card has been selected as the user's, save it as the selected card.
    if (!selectionConfirmed.value) {
        const oldCard = cards.value.find(c => c.name === selectedCard.value?.name);

        if (oldCard) {
            oldCard.selected = false;
        }

        selectedCard.value = card;

        _card.selected = true;

        return;
    }

    // Otherwise, the game is in play and a click should flip the card.
    _card.flipped = !_card.flipped;
}

function confirmChoice() {
    // If a card has been selected, confirm the choice.
    if (!selectedCard.value) {
        return;
    }

    selectionConfirmed.value = true;
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

            <div class="grid grid-cols-3 gap-4 md:grid-cols-6">
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
            <div class="flex items-center justify-between">
                <UiButtonIcon
                    icon="ph:caret-left"
                    @click="resetGame"
                />

                <h3 class="text-center">
                    {{ $t(selectionConfirmed ? 'guess_who.lets_play' : 'guess_who.select_card') }}
                </h3>

                <UiButtonIcon
                    :disabled="!selectedCard"
                    icon="ph:arrow-counter-clockwise"
                    @click="resetBoard"
                />
            </div>

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

            <div
                v-if="!selectionConfirmed"
                class="text-center"
            >
                <UiButton
                    :disabled="!selectedCard"
                    @click="confirmChoice"
                >
                    {{ $t('guess_who.actions.confirm_choice') }}
                </UiButton>
            </div>
        </div>
    </Transition>
</template>
