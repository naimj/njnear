<template>
  <v-container class="about-page py-10">
    <!-- Hero Section -->
    <v-row class="mb-12 align-center">

      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('about.hero_title') }}</h1>
        <h2 class="text-h5 text-primary mb-6">{{ cvData.personal_information.title }}</h2>
        <p class="text-body-1 text-grey-lighten-2 bio-text font-weight-light">
          {{ cvData.personal_information.profile }}
        </p>
      </v-col>
    </v-row>

    <!-- What I Do Section -->
    <div class="mb-16">
      <h3 class="text-h4 font-weight-bold text-center mb-10 text-white position-relative title-decoration">
        {{ $t('about.what_i_do') }}
      </h3>
      
      <v-row>
        <v-col cols="12" md="6" v-for="(service, i) in services" :key="i">
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              :elevation="isHovering ? 12 : 2"
              class="service-card rounded-xl h-100 pa-4"
              :class="{ 'on-hover': isHovering }"
            >
              <div class="d-flex align-start">
                <v-sheet 
                  color="transparent" 
                  class="rounded-lg mr-4 d-flex align-center justify-center" 
                  height="60" 
                  width="60"
                  border
                >
                  <v-icon :icon="service.icon" size="32" color="primary"></v-icon>
                </v-sheet>
                <div>
                  <v-card-title class="text-h6 font-weight-bold pt-0 pl-0 text-white">
                    {{ service.title }}
                  </v-card-title>
                  <v-card-text class="pl-0 text-grey-lighten-1">
                    {{ service.description }}
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>

    <!-- Testimonials Section -->
    <div>
      <h3 class="text-h4 font-weight-bold text-center mb-10 text-white">
        {{ $t('about.testimonials') }}
      </h3>
      <v-carousel 
        cycle 
        height="auto" 
        hide-delimiter-background 
        show-arrows="hover" 
        class="testimonial-carousel rounded-xl elevation-5 bg-grey-darken-4 pa-6"
      >
        <v-carousel-item v-for="(testimonial, index) in testimonials" :key="index">
          <div class="d-flex flex-column align-center justify-center fill-height text-center pa-4">
             <v-icon icon="mdi-format-quote-open" size="48" color="primary" class="mb-4 opacity-50"></v-icon>
             <p class="text-h6 font-italic font-weight-light mb-6 text-grey-lighten-3" style="max-width: 800px;">
               "{{ testimonial.text }}"
             </p>
             <div class="d-flex align-center mt-2">
               <v-avatar color="primary" size="40" class="mr-3">
                 <span class="text-h6 text-white">{{ testimonial.author.charAt(0) }}</span>
               </v-avatar>
               <span class="text-subtitle-1 font-weight-bold text-white">{{ testimonial.author }}</span>
             </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCVData } from '@/composables/useCVData';
import { useI18n } from 'vue-i18n';
import testimonialsData from '@/data/testimonials.json';

const { cvData } = useCVData();
const { t } = useI18n();
const testimonials = ref(testimonialsData);

const services = computed(() => [
  {
    title: t('about.services.fullstack.title'),
    description: t('about.services.fullstack.desc'),
    icon: "mdi-layers-triple"
  },
  {
    title: t('about.services.frontend.title'),
    description: t('about.services.frontend.desc'),
    icon: "mdi-monitor-dashboard"
  },
  {
    title: t('about.services.api.title'),
    description: t('about.services.api.desc'),
    icon: "mdi-api"
  },
  {
    title: t('about.services.agile.title'),
    description: t('about.services.agile.desc'),
    icon: "mdi-account-group"
  }
]);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils/_variables.scss';

// Local overrides if needed, but primary is now global in Vuetify theme
.profile-glow {
  box-shadow: 0 0 30px rgba(4, 180, 224, 0.3) !important;
  border: 3px solid $hover-color;
}

.bio-text {
  line-height: 1.8;
  font-size: 1.1rem;
}

.service-card {
  background-color: #2e2e2e; /* Darker card bg */
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &.on-hover {
    transform: translateY(-8px);
    background-color: #383838;
    border-color: $hover-color;
    box-shadow: 0 10px 30px -10px rgba(4, 180, 224, 0.2) !important;
  }
}

.title-decoration {
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: $hover-color;
    margin: auto 0;
    border-radius: 2px;
  }
}

.testimonial-carousel {
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
