<template>
  <v-container class="portfolio-page py-10">
    
    <!-- Header -->
    <v-row class="mb-8 align-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('portfolio.hero_title') }}</h1>
        <h2 class="text-h5 text-primary mb-6">{{ $t('portfolio.hero_subtitle') }}</h2>
        <div class="title-decoration"></div>
      </v-col>
    </v-row>

    <!-- Projects Grid -->
    <v-row>
      <v-col 
        v-for="(project, i) in projects" 
        :key="i"
        cols="12" 
        md="6" 
        lg="4"
        class="animate-slide-in"
        :style="{ 'animation-delay': `${i * 0.1}s` }"
      >
        <v-card class="project-card h-100 d-flex flex-column rounded-xl" elevation="2">
            
            <!-- Card Header -->
            <div class="pa-6 pb-2">
                <div class="d-flex justify-space-between align-start mb-2">
                    <v-icon icon="mdi-folder-network-outline" color="primary" size="large"></v-icon>
                    <v-chip size="small" variant="outlined" color="primary" class="font-weight-bold">
                        {{ project.period.split('—')[0].trim() }}
                    </v-chip>
                </div>
                
                <h3 class="text-h5 font-weight-bold text-white mb-1">{{ project.client }}</h3>
                <div class="text-subtitle-2 text-grey-lighten-1 mb-4">{{ project.project }}</div>
            </div>

            <v-divider color="white" class="opacity-10"></v-divider>

            <!-- Card Body -->
            <div class="pa-6 pt-4 flex-grow-1">
                <p class="text-body-2 text-grey-lighten-2 mb-4 line-clamp-3">
                    {{ project.objective }}
                </p>

                <!-- Tech Stack Chips -->
                <div class="d-flex flex-wrap gap-2 mb-4">
                    <v-chip 
                        v-for="tool in project.tools.slice(0, 5)" 
                        :key="tool" 
                        size="x-small" 
                        variant="tonal" 
                        color="secondary"
                        class="text-white bg-white-opacity-05"
                    >
                        {{ tool }}
                    </v-chip>
                    <v-chip v-if="project.tools.length > 5" size="x-small" variant="text" color="grey">
                        +{{ project.tools.length - 5 }}
                    </v-chip>
                </div>
            </div>

            <!-- Card Footer (Actions) -->
            <div class="pa-6 pt-0 mt-auto">
                <div v-if="project.links && project.links.length" class="d-flex flex-wrap gap-2">
                    <v-btn 
                        v-for="link in project.links"
                        :key="link"
                        :href="link"
                        target="_blank"
                        variant="outlined"
                        size="small"
                        color="primary"
                        rounded="pill"
                        class="text-none"
                        prepend-icon="mdi-open-in-new"
                    >
                        {{ $t('portfolio.view_project') }}
                    </v-btn>
                </div>
                <div v-else class="text-caption text-grey-darken-1 font-italic">
                    {{ $t('portfolio.internal_project') }}
                </div>
            </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useCVData } from '@/composables/useCVData';

const { cvData } = useCVData();

// Use Work Experience as Projects
const projects = computed(() => cvData.value?.work_experience || []);

</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils/_variables.scss';

.portfolio-page {
  --v-theme-primary: #{$hover-color}; 
}

.text-primary {
  color: $hover-color !important;
}

// Reuse Solid Dark Card Style
.project-card {
  background-color: #2e2e2e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
     transform: translateY(-8px);
     box-shadow: 0 15px 35px -10px rgba(4, 180, 224, 0.25) !important;
     border-color: $hover-color;
  }
}

.title-decoration {
  display: block;
  width: 60px;
  height: 4px;
  background-color: $hover-color;
  border-radius: 2px;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
}

.gap-2 { gap: 8px; }

.bg-white-opacity-05 {
  background: rgba(255, 255, 255, 0.05) !important;
}

// Fade In Animation
.animate-slide-in {
  opacity: 0;
  animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>