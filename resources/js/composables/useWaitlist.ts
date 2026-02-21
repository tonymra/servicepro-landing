import { reactive, ref } from 'vue';

interface WaitlistForm {
    first_name: string;
    last_name: string;
    email: string;
    business_type: string;
    staff_count: string;
    website: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
}

export function useWaitlist() {
    const loading = ref(false);
    const success = ref(false);
    const alreadyExisted = ref(false);
    const error = ref('');
    const submittedEmail = ref('');

    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

    const form = reactive<WaitlistForm>({
        first_name: '',
        last_name: '',
        email: '',
        business_type: '',
        staff_count: '',
        website: '',
        utm_source: urlParams.get('utm_source') ?? '',
        utm_medium: urlParams.get('utm_medium') ?? '',
        utm_campaign: urlParams.get('utm_campaign') ?? '',
    });

    async function submit(): Promise<void> {
        loading.value = true;
        error.value = '';

        try {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
            const response = await fetch('/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfMeta?.content ?? '',
                    Accept: 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    error.value = 'Too many attempts. Please try again in an hour.';
                } else {
                    error.value = 'Something went wrong. Please try again or email hello@getservicepro.com';
                }
                return;
            }

            submittedEmail.value = data.email;
            alreadyExisted.value = data.already_existed;
            success.value = true;
        } catch {
            error.value = 'Something went wrong. Please try again or email hello@getservicepro.com';
        } finally {
            loading.value = false;
        }
    }

    function reset(): void {
        success.value = false;
        alreadyExisted.value = false;
        error.value = '';
        submittedEmail.value = '';
        form.first_name = '';
        form.last_name = '';
        form.email = '';
        form.business_type = '';
        form.staff_count = '';
        form.website = '';
    }

    return { loading, success, alreadyExisted, error, submittedEmail, form, submit, reset };
}
