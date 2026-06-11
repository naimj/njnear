<template>
  <div>
    <v-btn
      icon="mdi-message-text-outline"
      color="primary"
      size="large"
      class="chatbot__bubble chatbot__bubble--bounce"
      elevation="8"
      @click="toggle"
      v-if="!isOpen"
    ></v-btn>

    <transition name="slide-fade">
      <v-card
        v-if="isOpen"
        class="chatbot__widget rounded-xl border-thin"
        elevation="12"
      >
        <!-- Header -->
        <v-toolbar color="primary" density="compact" class="rounded-t-xl">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold d-flex align-center">
            <v-icon icon="mdi-robot-outline" start class="mr-2"></v-icon>
            {{ $t('chatbot.title') }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-delete-outline"
            variant="text"
            density="comfortable"
            @click="clearHistory"
            :title="$t('chatbot.clear')"
            class="mr-1"
          ></v-btn>
          <v-btn
            icon="mdi-close"
            variant="text"
            density="comfortable"
            @click="close"
            :title="$t('chatbot.close')"
          ></v-btn>
        </v-toolbar>

        <!-- Messages -->
        <v-card-text class="pa-3 chatbot__content bg-grey-lighten-5" ref="chatContent">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['d-flex mb-3', msg.isUser ? 'justify-end' : 'justify-start']"
          >
            <!-- Bot avatar -->
            <v-avatar
              v-if="!msg.isUser"
              size="28"
              color="primary"
              class="mr-2 mt-1 flex-shrink-0"
            >
              <v-icon icon="mdi-robot-outline" size="16" color="white"></v-icon>
            </v-avatar>

            <v-sheet
              :color="msg.isUser ? 'primary' : 'white'"
              :class="[
                'pa-3 rounded-lg elevation-1 chatbot__bubble-msg',
                msg.isUser ? 'rounded-br-0 text-white' : 'rounded-bl-0 text-grey-darken-3'
              ]"
              max-width="82%"
            >
              <div
                v-if="!msg.isUser"
                class="chatbot__msg-content"
                v-html="msg.text"
              ></div>
              <div v-else style="white-space: pre-wrap;">{{ msg.text }}</div>

              <!-- Timestamp -->
              <div
                class="chatbot__timestamp"
                :class="msg.isUser ? 'text-blue-lighten-4' : 'text-grey-lighten-1'"
              >
                {{ msg.time }}
              </div>
            </v-sheet>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="d-flex mb-3 justify-start align-center">
            <v-avatar size="28" color="primary" class="mr-2 flex-shrink-0">
              <v-icon icon="mdi-robot-outline" size="16" color="white"></v-icon>
            </v-avatar>
            <v-sheet color="white" class="pa-3 rounded-lg rounded-bl-0 elevation-1">
              <span class="chatbot__typing">
                <span></span><span></span><span></span>
              </span>
            </v-sheet>
          </div>

          <div ref="bottomRef"></div>
        </v-card-text>

        <!-- Input -->
        <v-sheet class="pa-3 bg-white border-t" elevation="2">
          <v-text-field
            ref="inputRef"
            v-model="input"
            :placeholder="$t('chatbot.placeholder')"
            variant="outlined"
            density="compact"
            hide-details
            rounded="xl"
            color="primary"
            bg-color="grey-lighten-5"
            @keyup.enter="sendMessage"
            :disabled="isTyping"
          >
            <template v-slot:append-inner>
              <v-btn
                icon="mdi-send"
                variant="text"
                size="small"
                color="primary"
                class="ml-1"
                @click="sendMessage"
                :disabled="!input.trim() || isTyping"
              ></v-btn>
            </template>
          </v-text-field>
        </v-sheet>
      </v-card>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { useCVData } from '@/composables/useCVData';
import { useChat } from '@/composables/useChat';
import { useI18n } from 'vue-i18n';
import { aiService } from '@/services/aiService';

const { isOpen, toggle, close } = useChat();
const { cvData } = useCVData();
const { t, locale } = useI18n();

const input = ref('');
const isTyping = ref(false);
const bottomRef = ref(null);
const inputRef = ref(null);

const focusInput = () => {
  nextTick(() => inputRef.value?.focus());
};

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const messages = ref([
  { text: t('chatbot.initial_msg'), isUser: false, time: getTime() }
]);

// Track conversation history for multi-turn context
const conversationHistory = ref([]);

// Reset on locale change
watch(locale, () => {
  messages.value = [{ text: t('chatbot.initial_msg'), isUser: false, time: getTime() }];
  conversationHistory.value = [];
});

// ── Local fallback knowledge base ──────────────────────────────────────────
const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const knowledgeBase = [
  {
    keywords: ['bonjour', 'salut', 'cc', 'hello', 'hi', 'hey', 'yo', 'morning', 'evening'],
    answer: () => t('chatbot.answers.greetings')
  },
  {
    keywords: ['merci', 'thanks', 'thx', 'remercie', 'cool', 'super', 'genial', 'top'],
    answer: () => t('chatbot.answers.thanks')
  },
  {
    keywords: ['va', 'allez', 'comment', 'how', 'are', 'you', 'doing', 'bien', 'forme', 'ca va'],
    answer: () => t('chatbot.answers.sentiments')
  },
  {
    keywords: ['qui', 'who', 'bot', 'assistant', 'ia', 'nom', 'prenom', 'identite'],
    answer: () => t('chatbot.answers.identity', {
      name: cvData.value.personal_information.name,
      title: cvData.value.personal_information.title
    })
  },
  {
    keywords: ['contact', 'email', 'mail', 'telephone', 'phone', 'joindre', 'linkedin', 'github'],
    answer: () => t('chatbot.answers.contact', {
      email: cvData.value.personal_information.email,
      phone: cvData.value.personal_information.phone,
      linkedin: cvData.value.personal_information.linkedin
    })
  },
  {
    keywords: ['competence', 'skill', 'techno', 'technique', 'langage', 'framework', 'stack'],
    answer: () => t('chatbot.answers.skills', {
      tech: cvData.value.skills.technical.slice(0, 12).join(', '),
      func: cvData.value.skills.functional.slice(0, 3).join(', ')
    })
  },
  {
    keywords: ['experience', 'travail', 'job', 'poste', 'mission', 'career', 'parcours', 'entreprise'],
    answer: () => {
      const last = cvData.value.work_experience[0];
      return t('chatbot.answers.experience', {
        exp: cvData.value.personal_information.experience,
        role: last.position,
        client: last.client,
        period: last.period,
        tools: last.tools.slice(0, 4).join(', ')
      });
    }
  },
  {
    keywords: ['formation', 'ecole', 'diplome', 'etude', 'education', 'degree', 'master'],
    answer: () => t('chatbot.answers.education', {
      edu: cvData.value.education_and_languages.education,
      langs: cvData.value.education_and_languages.languages.join(', ')
    })
  },
  {
    keywords: ['profil', 'resume', 'qui est', 'parle moi', 'bio', 'description', 'about'],
    answer: () => t('chatbot.answers.profile_summary', { profile: cvData.value.personal_information.profile })
  }
];

const getLocalResponse = (query) => {
  const clean = normalize(query);

  const allSkills = [...cvData.value.skills.technical, ...cvData.value.skills.functional];
  const foundSkill = allSkills.find(s => {
    const ns = normalize(s);
    return clean.includes(ns) || (ns.length > 4 && clean.includes(ns.substring(0, ns.length - 1)));
  });
  if (foundSkill) return t('chatbot.answers.skill_match', { skill: foundSkill });

  const domain = cvData.value.skills.domains?.find(d => clean.includes(normalize(d)));
  if (domain) return t('chatbot.answers.domain_match', { domain });

  let best = null, maxScore = 0;
  knowledgeBase.forEach(intent => {
    let score = 0;
    intent.keywords.forEach(k => {
      if (new RegExp(`\\b${k}\\b`, 'i').test(clean)) score += 5;
      else if (clean.includes(k)) score += 2;
    });
    if (score > maxScore) { maxScore = score; best = intent; }
  });

  if (maxScore >= 2 && best) return best.answer();

  const lastClient = cvData.value.work_experience[0].client;
  return t('chatbot.answers.unknown', { client: lastClient });
};

// ── Send message ────────────────────────────────────────────────────────────
const sendMessage = async () => {
  if (!input.value.trim() || isTyping.value) return;

  const userQuery = input.value.trim();
  input.value = '';
  isTyping.value = true;

  messages.value.push({ text: userQuery, isUser: true, time: getTime() });

  try {
    const historyToSend = conversationHistory.value.map(h => ({ role: h.role, text: h.text }));

    const aiResponse = await aiService.getAiResponse(
      cvData.value,
      userQuery,
      locale.value,
      historyToSend
    );

    const responseText = aiResponse || getLocalResponse(userQuery);

    messages.value.push({ text: responseText, isUser: false, time: getTime() });

    // Save to conversation history (keep last 10 exchanges)
    conversationHistory.value.push({ role: 'user', text: userQuery });
    conversationHistory.value.push({ role: 'model', text: responseText });
    if (conversationHistory.value.length > 20) {
      conversationHistory.value = conversationHistory.value.slice(-20);
    }
  } catch (error) {
    console.error('Chatbot error:', error);
    messages.value.push({ text: getLocalResponse(userQuery), isUser: false, time: getTime() });
  } finally {
    isTyping.value = false;
    focusInput();
  }
};

// ── Clear history ───────────────────────────────────────────────────────────
const clearHistory = () => {
  messages.value = [{ text: t('chatbot.initial_msg'), isUser: false, time: getTime() }];
  conversationHistory.value = [];
  focusInput();
};

// ── Scroll helpers ──────────────────────────────────────────────────────────
const scrollToBottom = () => {
  nextTick(() => { bottomRef.value?.scrollIntoView({ behavior: 'smooth' }); });
};

watch(messages, scrollToBottom, { deep: true });
watch(isTyping, scrollToBottom);
watch(isOpen, (val) => {
  if (val) nextTick(() => {
    bottomRef.value?.scrollIntoView({ behavior: 'auto' });
    focusInput();
  });
});
</script>
