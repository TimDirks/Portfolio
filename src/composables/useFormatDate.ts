import {format} from '@formkit/tempo';

export function useFormatDate() {
    const {locale} = useI18n();

    function formatDate(date?: Date | string): string {
        if (!date) {
            return '-';
        }

        return format(date, 'DD-MM-YYYY', locale.value);
    }

    return {
        formatDate,
    };
}
