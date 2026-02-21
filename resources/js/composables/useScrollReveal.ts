import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export function useScrollReveal(threshold = 0.15) {
    const elements: Ref<Element[]> = ref([]);
    let observer: IntersectionObserver | null = null;

    const observe = (el: Element) => {
        if (observer) {
            observer.observe(el);
        }
    };

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold },
        );

        elements.value.forEach((el) => observer?.observe(el));
    });

    onUnmounted(() => {
        observer?.disconnect();
    });

    return { observe };
}
