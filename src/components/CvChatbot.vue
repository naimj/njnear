<template>
  <div>
    <!-- Chat Bubble (FAB) -->
    <v-btn
      icon="mdi-message-text-outline"
      color="primary"
      size="large"
      class="chat-bubble animate-bounce"
      elevation="8"
      @click="toggle"
      v-if="!isOpen"
    ></v-btn>

    <!-- Chat Widget Card -->
    <transition name="slide-fade">
      <v-card
        v-if="isOpen"
        class="chat-widget rounded-xl border-thin"
        elevation="12"
      >
        <!-- Header -->
        <v-toolbar color="primary" density="compact" class="rounded-t-xl">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold d-flex align-center">
            <v-icon icon="mdi-face-agent" start class="mr-2"></v-icon>
            {{ $t('chatbot.title') }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" density="comfortable" @click="close" :title="$t('chatbot.close')"></v-btn>
        </v-toolbar>

        <!-- Message List -->
        <v-card-text class="pa-3 chat-content bg-grey-lighten-5" ref="chatContent">
           <div v-for="(msg, i) in messages" :key="i" :class="['d-flex mb-3', msg.isUser ? 'justify-end' : 'justify-start']">
             <v-sheet
               :color="msg.isUser ? 'primary' : 'white'"
               :class="['pa-3 rounded-lg text-body-2 elevation-1', msg.isUser ? 'rounded-br-0 text-white' : 'rounded-bl-0 text-grey-darken-3']"
               max-width="85%"
             >
               <div style="white-space: pre-wrap;" v-html="msg.text"></div>
             </v-sheet>
           </div>
           
           <!-- Typing Indicator -->
           <div v-if="isTyping" class="d-flex mb-3 justify-start">
             <v-sheet color="white" class="pa-3 rounded-lg rounded-bl-0 elevation-1">
                <span class="dot-typing">...</span>
             </v-sheet>
           </div>

           <div ref="bottomRef"></div>
        </v-card-text>

        <!-- Input Area -->
        <v-sheet class="pa-3 bg-white border-t" elevation="2">
          <v-text-field
            v-model="input"
            :placeholder="$t('chatbot.placeholder')"
            variant="outlined"
            density="compact"
            hide-details
            rounded="xl"
            color="primary"
            bg-color="grey-lighten-5"
            @keyup.enter="sendMessage"
          >
            <template v-slot:append-inner>
               <v-btn 
                 icon="mdi-send" 
                 variant="text" 
                 size="small" 
                 color="primary" 
                 class="ml-1"
                 @click="sendMessage" 
                 :disabled="!input.trim()"
               ></v-btn>
            </template>
          </v-text-field>
        </v-sheet>
      </v-card>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue';
import { useCVData } from '@/composables/useCVData';
import { useChat } from '@/composables/useChat';
import { useI18n } from 'vue-i18n';

const { isOpen, toggle, close } = useChat();
const { cvData } = useCVData();
const { t, locale } = useI18n();

const input = ref('');
const messages = ref([
  { text: t('chatbot.initial_msg'), isUser: false }
]);
const bottomRef = ref(null);
const isTyping = ref(false);

// Watch for locale changes to reset chat
watch(locale, () => {
  messages.value = [
    { text: t('chatbot.initial_msg'), isUser: false }
  ];
});

// --- KNOWLEDGE BASE ---
const knowledgeBase = computed(() => [
  {
    id: 'greetings',
    keywords: ['bonjour', 'salut', 'cc', 'hello', 'hi', 'hey', 'yo', 'morning', 'evening'],
    answer: () => t('chatbot.answers.greetings')
  },
  {
    id: 'thanks',
    keywords: ['merci', 'thanks', 'thx', 'remercie', 'cool', 'super', 'génial', 'top'],
    answer: () => t('chatbot.answers.thanks')
  },
  {
    id: 'sentiments',
    keywords: ['va', 'allez', 'allez-vous', 'vas-tu', 'ça va', 'comment', 'how', 'are', 'you', 'doing', 'bien', 'forme'],
    answer: () => t('chatbot.answers.sentiments')
  },
  {
    id: 'identity',
    keywords: ['qui', 'who', 't', 'es', 'bot', 'assistant', 'ia', 'nom', 'prenom', 'identite'],
    answer: () => t('chatbot.answers.identity', { name: cvData.value.personal_information.name, title: cvData.value.personal_information.title })
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'telephone', 'phone', 'tel', 'joindre', 'appeler', 'linkedin', 'github', 'message', 'ecrire'],
    answer: () => t('chatbot.answers.contact', { email: cvData.value.personal_information.email, phone: cvData.value.personal_information.phone, linkedin: cvData.value.personal_information.linkedin })
  },
  {
    id: 'skills',
    keywords: ['competence', 'skill', 'techno', 'technique', 'langage', 'framework', 'outil', 'stack', 'savoir', 'faire', 'maitrise', 'peux-tu', 'connais-tu'],
    answer: () => t('chatbot.answers.skills', { tech: cvData.value.skills.technical.slice(0, 12).join(', '), func: cvData.value.skills.functional.slice(0, 3).join(', ') })
  },
  {
    id: 'experience',
    keywords: ['experience', 'travail', 'job', 'poste', 'mission', 'career', 'parcours', 'entreprise', 'employeur', "c'est quoi ton dernier"],
    answer: () => {
      const last = cvData.value.work_experience[0];
      return t('chatbot.answers.experience', { exp: cvData.value.personal_information.experience, role: last.position, client: last.client, period: last.period, tools: last.tools.slice(0,4).join(', ') })
    }
  },
  {
    id: 'education',
    keywords: ['formation', 'ecole', 'diplome', 'etude', 'education', 'degree', 'master', 'ingenieur', 'universite', 'bac'],
    answer: () => t('chatbot.answers.education', { edu: cvData.value.education_and_languages.education, langs: cvData.value.education_and_languages.languages.join(', ') })
  },
  {
    id: 'profile',
    keywords: ['profil', 'resume', 'qui est', 'parle moi de', 'bio', 'description', 'about'],
    answer: () => t('chatbot.answers.profile_summary', { profile: cvData.value.personal_information.profile })
  }
]);

// Normalize text: lowercase, remove accents
const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// --- INTELLIGENT MATCHING ---
const getSmartResponse = (query) => {
  const cleanQuery = normalize(query);
  
  // 1. Specific Skills Search (Fuzzy-ish)
  const allSkills = [...cvData.value.skills.technical, ...cvData.value.skills.functional].map(s => normalize(s));
  const foundSkill = allSkills.find(s => cleanQuery.includes(s) || (s.length > 4 && cleanQuery.includes(s.substring(0, s.length - 1))));
  
  if (foundSkill) {
     const originalSkill = [...cvData.value.skills.technical, ...cvData.value.skills.functional].find(s => normalize(s) === foundSkill || (normalize(s).length > 4 && normalize(s).startsWith(foundSkill.substring(0, 4))));
     return t('chatbot.answers.skill_match', { skill: originalSkill || foundSkill });
  }

  // 2. Domain Match
  const domain = cvData.value.skills.domains.find(d => cleanQuery.includes(normalize(d)));
  if (domain) {
    return t('chatbot.answers.domain_match', { domain });
  }

  // 3. Intent Scoring
  let bestMatch = null;
  let maxScore = 0;

  knowledgeBase.value.forEach(intent => {
    let score = 0;
    intent.keywords.forEach(k => {
      // Bonus point for exact word match
      const regex = new RegExp(`\\b${k}\\b`, 'i');
      if (regex.test(cleanQuery)) {
        score += 5;
      } else if (cleanQuery.includes(k)) {
        score += 2;
      }
    });
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  });

  // Threshold for relevance
  if (maxScore >= 2 && bestMatch) {
    return bestMatch.answer();
  }

  // Fallback with context
  const lastExp = cvData.value.work_experience[0].client;
  return t('chatbot.answers.unknown', { client: lastExp });
};

const sendMessage = () => {
  if (!input.value.trim()) return;
  
  messages.value.push({ text: input.value, isUser: true });
  const userQuery = input.value;
  input.value = '';
  isTyping.value = true;

  // Simulate network delay
  setTimeout(() => {
    const response = getSmartResponse(userQuery);
    messages.value.push({ text: response, isUser: false });
    isTyping.value = false;
  }, 600 + Math.random() * 400); // Natural random delay
};

// Scroll watchers
watch(messages, () => {
  nextTick(() => {
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
  });
}, { deep: true });

watch(isTyping, () => {
  nextTick(() => {
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
  });
});

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => {
       bottomRef.value?.scrollIntoView({ behavior: 'auto' });
    });
  }
});
</script>

<style scoped>
.chat-bubble {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-widget {
  position: fixed;
  bottom: 90px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 550px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 120px);
}

@media (max-width: 600px) {
  .chat-bubble {
    bottom: 16px;
    right: 16px;
  }
  
  .chat-widget {
    bottom: 30px;
    right: 16px;
    width: calc(100vw - 32px);
    max-width: 100%;
    max-height: 100%;
  }
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
