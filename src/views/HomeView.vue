<template>
  <v-container class="fill-height home-container py-16" fluid>
    <v-row align="center" justify="center" class="text-center fill-height">
      <v-col cols="12" md="8" lg="6">
        <h1 class="text-h2 font-weight-bold mb-4 text-white animate-pop-in">
          {{ cvData.personal_information.name }}
        </h1>
        <h2 class="text-h4 font-weight-light text-primary mb-8 animate-slide-up">
          {{ cvData.personal_information.title }}
        </h2>
        
        <v-btn
          color="primary"
          size="x-large"
          rounded="pill"
          elevation="6"
          prepend-icon="mdi-robot"
          class="animate-fade-in home-btn"
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

<style lang="scss" scoped>
@import '@/assets/styles/utils/_variables.scss';

.home-container {
  // Override primary color locally to match About page accent
  --v-theme-primary: #{$hover-color};
}

.text-primary {
  color: $hover-color !important;
}

.home-btn {
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(4, 180, 224, 0.4) !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(4, 180, 224, 0.6) !important;
  }
}

/* Simple animations */
@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-pop-in {
  animation: popIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out 0.2s forwards;
  opacity: 0; /* Initial state hidden */
}

.animate-fade-in {
  animation: fadeIn 1s ease-out 0.5s forwards;
  opacity: 0; /* Initial state hidden */
}
</style>