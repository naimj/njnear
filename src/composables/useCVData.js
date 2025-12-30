import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import cvDataEn from '@/data/fullCVData.json';
import cvDataFr from '@/data/fullCVData_fr.json';

export function useCVData() {
    const { locale } = useI18n();

    const cvData = computed(() => {
        return locale.value === 'fr' ? cvDataFr : cvDataEn;
    });

    return {
        cvData
    };
}
