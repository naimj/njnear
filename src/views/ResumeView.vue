<template>
  <v-container class="resume-page py-10">
    <v-row class="mb-12 align-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('resume.hero_title') }}</h1>
        <h2 class="text-h5 mb-6 resume-page__subtitle">{{ $t('resume.hero_subtitle') }}</h2>
      </v-col>
    </v-row>

    <div class="mb-16">
      <h3 class="text-h4 font-weight-bold tmb-12 text-white resume-page__title-decoration">
        {{ $t('resume.exp_title') }}
      </h3>

      <v-timeline density="compact" align="start" side="end" line-color="white">
        <v-timeline-item
          v-for="(job, i) in cvData.work_experience"
          :key="i"
          dot-color="primary"
          size="small"
          fill-dot
          class="resume-page__animate-slide-in"
          :style="{ 'animation-delay': `${i * 0.1}s` }"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              class="resume-page__card rounded-xl mb-4" 
              :class="{ 'on-hover': isHovering }"
              elevation="2"
            >
              <v-card-item class="pa-5">
                <div class="d-flex justify-space-between flex-wrap align-start mb-2">
                  <div>
                      <h4 class="text-h6 text-white font-weight-bold mb-1">{{ job.position }}</h4>
                      <div class="text-subtitle-1 text-primary">{{ job.client }}</div>
                  </div>
                  <v-chip size="small" color="primary" variant="flat" class="mt-1 font-weight-bold elevation-4">
                    {{ job.period }}
                  </v-chip>
                </div>

                <div class="mt-4 mb-4 text-body-2 text-grey-lighten-2 environment-text">
                  {{ job.environment }}
                </div>
                
                <div class="d-flex flex-wrap resume-page__gap mb-4">
                    <v-chip v-for="t in job.tools.slice(0, 8)" :key="t" size="x-small" variant="outlined" color="grey" class="skill-pill">
                      {{ t }}
                    </v-chip>
                </div>

                <div class="mt-4 pt-4 border-t border-opacity-25" style="border-color: rgba(255,255,255,0.1);">
                    <div v-if="job.objective" class="mb-3 pl-3 border-l-4 border-primary pa-2 rounded-r">
                      <strong class="text-white">{{ $t('resume.objective') }}</strong> <span class="text-grey-lighten-1">{{ job.objective }}</span>
                    </div>

                    <div v-if="job.links && job.links.length" class="mt-4 pt-3 action-buttons">
                      <v-btn
                        v-for="link in job.links" 
                        :key="link" 
                        :href="link" 
                        target="_blank" 
                        variant="tonal" 
                        size="x-small"
                        color="primary"
                        prepend-icon="mdi-open-in-new"
                        class="mr-2 rounded-pill"
                      >
                        {{ $t('resume.view_project') }}
                      </v-btn>
                    </div>
                </div>
              </v-card-item>
            </v-card>
          </v-hover>
        </v-timeline-item>
      </v-timeline>
    </div>

    <v-row>
      <v-col cols="12" md="6">
        <h3 class="text-h4 font-weight-bold mb-10 text-white resume-page__title-decoration">
          {{ $t('resume.skills_title') }}
        </h3>
        
        <v-card class="resume-page__card mb-6 pa-5 rounded-xl" elevation="2">
           <v-card-title class="text-h6 font-weight-bold mb-4 d-flex align-center text-white">
            <v-icon icon="mdi-code-json" color="primary" class="mr-3"></v-icon>
            {{ $t('resume.stack_tech') }}
          </v-card-title>
          
          <div class="mb-6">
            <div class="text-subtitle-2 text-grey font-weight-bold uppercase mb-3 ml-1">{{ $t('resume.tech_label') }}</div>
            <div class="d-flex flex-wrap resume-page__gap">
              <v-chip
                v-for="skill in cvData.skills.technical"
                :key="skill"
                color="primary"
                variant="outlined"
                class="font-weight-medium"
              >
                {{ skill }}
              </v-chip>
            </div>
          </div>

          <div>
             <div class="text-subtitle-2 text-grey font-weight-bold uppercase mb-3 ml-1">{{ $t('resume.domains_label') }}</div>
             <div class="d-flex flex-wrap resume-page__gap">
               <v-chip
                 v-for="domain in cvData.skills.domains"
                 :key="domain"
                 color="info"
                 variant="tonal"
                 size="small"
               >
                 {{ domain }}
               </v-chip>
             </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <h3 class="text-h4 font-weight-bold mb-10 text-white resume-page__title-decoration">
          {{ $t('resume.education_title') }}
        </h3>

        <v-card class="resume-page__card mb-6 pa-5 rounded-xl" elevation="2">
           <v-card-title class="text-h6 font-weight-bold mb-4 d-flex align-center text-white">
            <v-icon icon="mdi-school-outline" color="primary" class="mr-3"></v-icon>
            {{ $t('resume.academic_bg') }}
          </v-card-title>
          
          <div class="education-item pl-4 border-l-4 border-primary mb-6">
             <div class="text-h6 text-white font-weight-bold mb-1">{{ $t('resume.degree_label') }}</div>
             <p class="text-body-1 text-grey-lighten-1">{{ cvData.education_and_languages.education }}</p>
          </div>
          
          <v-divider class="my-6 border-opacity-25"></v-divider>

          <div>
            <div class="text-h6 text-white font-weight-bold mb-4 d-flex align-center">
              <v-icon icon="mdi-translate" color="primary" class="mr-3"></v-icon>
              {{ $t('resume.languages_title') }}
            </div>
            <v-list bg-color="transparent" density="compact">
               <v-list-item v-for="lang in cvData.education_and_languages.languages" :key="lang" class="px-0">
                 <template v-slot:prepend>
                   <v-icon icon="mdi-check-circle" color="secondary" size="small" class="mr-3"></v-icon>
                 </template>
                 <v-list-item-title class="text-body-1 text-grey-lighten-1">{{ lang }}</v-list-item-title>
               </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCVData } from '@/composables/useCVData';

const { cvData } = useCVData();
</script>