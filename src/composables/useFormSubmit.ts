import {setErrors} from '@formkit/core';
import type {AsyncDataRequestStatus} from '#app/composables/asyncData';

export function useFormSubmit(
    form: string,
    submitHandler: (data: Record<string, any>) => Promise<any>,
    options: Record<string, any> = {},
) {
    const validationErrors = ref({});
    const error = ref<any>(null);
    const status = ref<AsyncDataRequestStatus>('idle');

    async function submit(formData: Record<string, any>) {
        validationErrors.value = {};
        error.value = null;
        status.value = 'pending';

        try {
            const data = await submitHandler(formData);

            status.value = 'success';
            options.onSuccess?.(data, formData);

            return data;
        } catch (e: any) {
            // In case of local requests (ones by sidebase for example) error data travels through 2 requests.
            // To get the original external API error data we need to look for a nested data property to set errors.
            const errorData = e.data?.data || e.data;

            error.value = e;

            status.value = 'error';
            options.onError?.(e);

            validationErrors.value = errorData?.errors || {};

            // Check if there is an error that isn't in the message array (thus an error not on a specific form field).
            // These will be shown as a global error on the form.
            const hasUniqueFormMessage = !Object.values(validationErrors.value)
                .some(v => errorData?.message.includes(v));

            const messageArr = hasUniqueFormMessage ? [errorData?.message] : [];

            setErrors(
                form,
                messageArr, // Add the global form errors.
                validationErrors.value,
            );

            if (e.response?.status !== 422) {
                throw e;
            }
        }
    }

    return {
        submit,
        validationErrors,
        error,
        status,
    };
}
