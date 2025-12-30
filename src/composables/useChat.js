import { ref } from 'vue';

const isOpen = ref(false);

export function useChat() {
    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    const open = () => {
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    return {
        isOpen,
        toggle,
        open,
        close,
    };
}
