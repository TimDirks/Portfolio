import antfu from '@antfu/eslint-config';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat();

/**
 * @file ESLint configuration
 * @description extendable ESLint configuration based on @antfu/eslint-config
 * @see https://github.com/antfu/eslint-config
 */

export default antfu(
    {
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
    },
    // Legacy config - see https://github.com/antfu/eslint-config?tab=readme-ov-file#usage
    ...compat.config({
        extends: ['plugin:tailwindcss/recommended'],
        rules: {
            'tailwindcss/no-custom-classname': 'off',
            'tailwindcss/migration-from-tailwind-2': 'off',
        },
    }),
    {
        rules: {
            curly: ['error', 'all'],
            'import/order': ['error', {
                groups: [
                    'index',
                    'sibling',
                    'parent',
                    'internal',
                    'external',
                    'builtin',
                    'object',
                    'type',
                ],
                'newlines-between': 'never',
                alphabetize: {
                    order: 'asc',
                },
            }],
            'node/prefer-global/process': 0,
            'style/block-spacing': ['error', 'never'],
            'style/brace-style': ['error', '1tbs'],
            'style/object-curly-spacing': ['error', 'never'],
            'style/quote-props': ['error', 'as-needed'],
            'vue/attributes-order': ['error', {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    'UNIQUE',
                    'SLOT',
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'ATTR_DYNAMIC',
                    'ATTR_STATIC',
                    'ATTR_SHORTHAND_BOOL',
                    'EVENTS',
                    'CONTENT',
                ],
                alphabetical: true,
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: 1,
                multiline: 1,
            }],
        },
    },
);
