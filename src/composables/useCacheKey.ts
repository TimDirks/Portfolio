import {hash} from 'ohash';

export function useCacheKey(type: string, identifier: Record<string, any> | string = {}, options: Record<string, any> = {}): string {
    const {locale} = useI18n();

    let key = `${locale.value}:${type}`;

    key += typeof identifier === 'string'
        ? `:${identifier}::${hash(options)}`
        : `::${hash(identifier)}`;

    return key;
}
