<template>
  <div class="mt-2 mb-2">
    <v-btn-toggle
      v-model="currentLocale"
      mandatory
      rounded="xl"
      color="primary"
      density="compact"
      class="border"
    >
      <v-btn value="fr" size="small" variant="text" class="font-weight-bold text-white">FR</v-btn>
      <v-btn value="en" size="small" variant="text" class="font-weight-bold text-white">EN</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = computed({
  get: () => locale.value,
  set: (val) => { locale.value = val; },
});
</script>
