<template>
  <v-container class="contact-page py-10">
    <v-row class="mb-12 align-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('contact.hero_title') }}</h1>
        <h2 class="text-h5 mb-6 contact-page__subtitle">{{ $t('contact.hero_subtitle') }}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="7" lg="8">
         <v-card class="contact-page__card pa-6 rounded-xl" elevation="2">
            <h3 class="text-h5 font-weight-bold text-white mb-6 d-flex align-center">
               <v-icon icon="mdi-message-text-outline" color="primary" class="mr-3"></v-icon>
               {{ $t('contact.send_msg_title') }}
            </h3>
            
            <v-form ref="form" v-model="valid">
               <v-row>
                  <v-col cols="12" md="6">
                     <v-text-field 
                        v-model="formData.name" 
                        :label="$t('contact.name_label')" 
                        variant="outlined" 
                        bg-color="rgba(255,255,255,0.05)"
                        color="primary"
                        :rules="[rules.required]"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                     <v-text-field 
                        v-model="formData.email" 
                        :label="$t('contact.email_label')" 
                        variant="outlined"
                        bg-color="rgba(255,255,255,0.05)" 
                        color="primary"
                        :rules="[rules.required, rules.email]"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field 
                        v-model="formData.subject" 
                        :label="$t('contact.subject_label')" 
                        variant="outlined"
                        bg-color="rgba(255,255,255,0.05)" 
                        color="primary"
                        :rules="[rules.required]"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-textarea 
                        v-model="formData.message" 
                        :label="$t('contact.message_label')" 
                        variant="outlined"
                        bg-color="rgba(255,255,255,0.05)" 
                        color="primary"
                        rows="5"
                        :rules="[rules.required]"
                     ></v-textarea>
                  </v-col>
               </v-row>
               
               <div class="d-flex justify-end mt-4">
                  <v-btn 
                     color="primary" 
                     size="large" 
                     rounded="pill" 
                     class="px-8 font-weight-bold contact-page__submit-btn"
                     @click="sendMessage"
                     :loading="loading"
                  >
                     {{ $t('contact.send_btn') }}
                     <v-icon icon="mdi-send" end class="ml-2"></v-icon>
                  </v-btn>
               </div>
            </v-form>
         </v-card>
      </v-col>

      <v-col cols="12" md="5" lg="4">
        <v-card class="contact-page__card mb-6 pa-5 rounded-xl" elevation="2">
            <div class="d-flex align-start mb-4">
               <v-avatar color="primary" variant="tonal" rounded="lg" size="large" class="mr-4">
                  <v-icon icon="mdi-email"></v-icon>
               </v-avatar>
               <div>
                  <div class="text-subtitle-2 text-primary font-weight-bold text-uppercase">Email</div>
                  <div class="text-body-1 text-white">{{ cvData.personal_information.email }}</div>
               </div>
            </div>
        </v-card>

        <v-card class="contact-page__card mb-6 pa-5 rounded-xl" elevation="2">
            <div class="d-flex align-start mb-4">
               <v-avatar color="primary" variant="tonal" rounded="lg" size="large" class="mr-4">
                  <v-icon icon="mdi-phone"></v-icon>
               </v-avatar>
               <div>
                  <div class="text-subtitle-2 text-primary font-weight-bold text-uppercase">{{ $t('contact.phone_label') }}</div>
                  <div class="text-body-1 text-white">{{ cvData.personal_information.phone }}</div>
               </div>
            </div>
        </v-card>

        <v-card class="contact-page__card mb-6 pa-5 rounded-xl" elevation="2" v-if="cvData.personal_information.linkedin">
            <div class="d-flex align-start mb-4">
               <v-avatar color="primary" variant="tonal" rounded="lg" size="large" class="mr-4">
                  <v-icon icon="mdi-linkedin"></v-icon>
               </v-avatar>
               <div>
                  <div class="text-subtitle-2 text-primary font-weight-bold text-uppercase">{{ $t('contact.linkedin_label') }}</div>
                  <a :href="'https://' + cvData.personal_information.linkedin" target="_blank" class="text-body-1 text-white contact-page__link">
                     {{ $t('contact.view_profile') }}
                  </a>
               </div>
            </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
       <v-col cols="12">
          <v-card class="rounded-xl overflow-hidden contact-page__map" elevation="4">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sen!2sfr!4v1716300000000!5m2!1sen!2sfr" 
               width="100%" 
               height="400" 
               style="border:0; filter: invert(90%) hue-rotate(180deg);" 
               allowfullscreen="" 
               loading="lazy" 
               referrerpolicy="no-referrer-when-downgrade">
             </iframe>
          </v-card>
       </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useCVData } from '@/composables/useCVData';
import { useI18n } from 'vue-i18n';

const { cvData } = useCVData();
const { t } = useI18n();

const valid = ref(false);
const loading = ref(false);

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const rules = {
  required: value => !!value || t('contact.required'),
  email: value => {
    const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(value) || t('contact.invalid_email');
  }
};

const sendMessage = () => {
   if (!valid.value) return;
   
   loading.value = true;
   setTimeout(() => {
     loading.value = false;
     alert(t('contact.msg_sent'));
   }, 1500);
};
</script>
