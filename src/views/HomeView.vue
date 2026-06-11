<template>
  <v-container class="fill-height home py-16" fluid>
    <v-row align="center" justify="center" class="text-center fill-height">
      <v-col cols="12" md="8" lg="6">
        <h1 class="text-h2 font-weight-bold mb-4 text-white home__title">
          {{ cvData.personal_information.name }}
        </h1>
        <h2 class="text-h4 font-weight-light mb-8 home__subtitle">
          {{ cvData.personal_information.title }}
        </h2>
        
        <v-btn
          color="primary"
          size="x-large"
          rounded="pill"
          elevation="6"
          prepend-icon="mdi-robot"
          class="home__btn"
          @click="openChat"
        >
          {{ $t('home.chat_btn') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCVData } from '@/composables/useCVData';
import { useChat } from '@/composables/useChat';

const { cvData } = useCVData();
const { open } = useChat();

const openChat = () => {
  open();
};
</script>