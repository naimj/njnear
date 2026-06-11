<template>
  <v-container class="portfolio-page py-10">
    <v-row class="mb-8 align-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('portfolio.hero_title') }}</h1>
        <h2 class="text-h5 mb-6 portfolio-page__subtitle">{{ $t('portfolio.hero_subtitle') }}</h2>
        <div class="portfolio-page__title-decoration"></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        v-for="(project, i) in projects" 
        :key="i"
        cols="12" 
        md="6" 
        lg="4"
        class="portfolio-page__animate-slide-in"
        :style="{ 'animation-delay': `${i * 0.1}s` }"
      >
        <v-card class="portfolio-page__project-card h-100 d-flex flex-column rounded-xl" elevation="2">
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

            <div class="pa-6 pt-4 flex-grow-1">
                <p class="text-body-2 text-grey-lighten-2 mb-4 portfolio-page__line-clamp">
                    {{ project.objective }}
                </p>

                <div class="d-flex flex-wrap portfolio-page__gap mb-4">
                    <v-chip 
                        v-for="tool in project.tools.slice(0, 5)" 
                        :key="tool" 
                        size="x-small" 
                        variant="tonal" 
                        color="secondary"
                        class="text-white portfolio-page__chip-bg"
                    >
                        {{ tool }}
                    </v-chip>
                    <v-chip v-if="project.tools.length > 5" size="x-small" variant="text" color="grey">
                        +{{ project.tools.length - 5 }}
                    </v-chip>
                </div>
            </div>

            <div class="pa-6 pt-0 mt-auto">
                <div v-if="project.links && project.links.length" class="d-flex flex-wrap portfolio-page__gap">
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

const projects = computed(() => cvData.value?.work_experience || []);
</script>