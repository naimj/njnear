<template>
  <div class="infographic-container">
    <!-- BACK TO PORTAL BAR -->
    <v-container class="py-2 px-4 d-flex align-center back-bar">
      <v-btn
        variant="text"
        color="primary"
        prepend-icon="mdi-arrow-left"
        to="/devhub"
        class="font-weight-bold"
      >
        {{ locale === 'fr' ? 'Retour au DevHub' : 'Back to DevHub' }}
      </v-btn>
      <v-spacer></v-spacer>
      <span class="text-caption text-grey-lighten-1 font-family-mono hidden-xs-only">
        {{ locale === 'fr' ? 'Infographie Interactive v1.2' : 'Interactive Infographic v1.2' }}
      </span>
    </v-container>

    <!-- HERO HEADER -->
    <div class="hero-section text-center py-12 px-4">
      <div class="hero-label text-uppercase font-weight-bold text-primary mb-3">
        Senior Front-End — Interview Prep
      </div>
      <h1 class="text-h2 font-weight-black text-white mb-4">
        JavaScript <span class="highlight-text">Array Methods</span>
      </h1>
      <p class="text-h6 text-grey-lighten-1 font-weight-light max-w-800 mx-auto mb-8">
        {{ currentGeneral.heroSubtitle }}
        <br />
        <span class="text-body-1 text-grey-darken-1 font-family-mono">{{ currentGeneral.heroDesc }}</span>
      </p>

      <!-- STATS BAR -->
      <div class="stats-row d-flex flex-wrap justify-center gap-4 max-w-800 mx-auto mb-6">
        <div 
          v-for="(stat, idx) in currentGeneral.stats" 
          :key="idx" 
          class="stat-box pa-4 ml-4 rounded-xl d-flex flex-column align-center"
        >
          <span class="stat-num font-weight-black text-white">{{ stat.num }}</span>
          <span class="stat-label text-caption text-grey-lighten-1">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- CATEGORIES NAV BAR -->
    <nav class="nav-bar px-4 py-2 sticky-nav">
  <v-container class="nav-wrapper py-1">
    <span class="nav-cat-label text-caption text-grey-darken-1 font-family-mono">
      {{ locale === 'fr' ? 'Catégories :' : 'Categories :' }}
    </span>

    <div class="nav-scroll">
      <v-btn
        v-for="cat in categories"
        :key="cat.id"
        variant="tonal"
        size="small"
        class="nav-pill rounded-pill text-none px-3 font-weight-medium"
        :color="cat.color"
        @click="scrollToSection(cat.id)"
      >
        {{ currentGeneral.categories[cat.id] }}
      </v-btn>

      <v-btn
        variant="tonal"
        size="small"
        class="nav-pill rounded-pill text-none px-3 font-weight-medium"
        color="white"
        @click="scrollToSection('recap-table')"
      >
        {{ currentGeneral.tableTitle }}
      </v-btn>

      <v-btn
        variant="tonal"
        size="small"
        class="nav-pill rounded-pill text-none px-3 font-weight-medium"
        color="primary"
        @click="scrollToSection('live-coding')"
      >
        Live Coding
      </v-btn>

      <v-btn
        variant="tonal"
        size="small"
        class="nav-pill rounded-pill text-none px-3 font-weight-medium"
        color="yellow"
        @click="scrollToSection('must-know')"
      >
        {{ locale === 'fr' ? 'Essentiels' : 'Essentials' }}
      </v-btn>
    </div>
  </v-container>
</nav>

    <!-- CONTENT WRAPPER -->
    <v-container class="pb-16 px-4">
      
      <!-- METHODS SECTIONS -->
      <section 
        v-for="cat in categories" 
        :key="cat.id" 
        :id="cat.id" 
        class="section-wrap mb-16"
        :class="`sec-${cat.id}`"
      >
        <div class="section-header d-flex align-center mb-8 flex-wrap gap-3">
          <h2 class="text-h4 font-weight-bold text-white mb-0">
            {{ currentGeneral.categories[cat.id] }}
          </h2>
          <div class="section-line flex-grow-1 mx-4 hidden-xs-only"></div>
          <div class="section-badge px-3 py-1 rounded text-caption font-weight-medium" :style="`background: ${cat.dimBg}; color: ${cat.colorHex};`">
            {{ currentGeneral.categories[`${cat.id}Sub`] }}
          </div>
        </div>

        <v-row>
          <v-col 
            v-for="method in getMethodsByCat(cat.id)" 
            :key="method.id" 
            cols="12" 
            md="6"
            class="mb-6"
          >
            <div class="method-card rounded-xl pa-6" :id="method.id" :style="`border-top: 3px solid ${cat.colorHex};`">
              <!-- Method Header -->
              <div class="d-flex align-center justify-between mb-4">
                <span class="method-name font-weight-black text-h5" :style="`color: ${cat.colorHex}; font-family: monospace;`">
                  {{ method.name }}
                </span>
                <v-spacer></v-spacer>
                <span class="method-tag text-caption font-family-mono px-2 py-0.5 rounded" :style="`background: ${cat.dimBg}; color: ${cat.colorHex};`">
                  {{ method.tag }}
                </span>
              </div>

              <!-- Definition -->
              <p class="text-body-2 text-grey-lighten-2 mb-5 font-weight-light">
                {{ method.definition }}
              </p>

              <!-- Visual Block -->
              <div class="visual-block pa-4 rounded-lg mb-5" v-if="method.visual">
                <div class="visual-label text-overline text-grey-darken-1 mb-2">
                  {{ method.visualLabel }}
                </div>
                
                <!-- If standard visual display with cells -->
                <div class="d-flex align-center flex-wrap gap-2" v-if="!method.visualRawText">
                  <!-- Input -->
                  <div class="d-flex align-center gap-1 arr-container">
                    <div 
                      v-for="(cell, cIdx) in method.visual.input" 
                      :key="cIdx" 
                      class="cell cell-in font-weight-bold font-family-mono"
                      :class="{ 'cell-large': method.visual.isLargeCell }"
                    >
                      {{ cell }}
                    </div>
                  </div>

                  <!-- Arrow/Action -->
                  <span class="arr-arrow text-caption text-grey-darken-1 font-family-mono px-1">
                    {{ method.visual.process }}
                  </span>

                  <!-- Highlighted/Intermediate Cell if needed -->
                  <div class="d-flex align-center gap-1 arr-container" v-if="method.visual.highlight">
                    <div 
                      v-for="(cell, cIdx) in method.visual.highlight" 
                      :key="cIdx" 
                      class="cell cell-hl font-weight-bold font-family-mono"
                      :style="`border-color: ${method.visual.hasError ? '#ff5252' : cat.colorHex}; color: ${method.visual.hasError ? '#ff5252' : cat.colorHex};`"
                    >
                      {{ cell }}
                    </div>
                  </div>

                  <!-- Optional process step 2 -->
                  <span class="arr-arrow text-caption text-grey-darken-1 font-family-mono px-1" v-if="method.visual.process2">
                    {{ method.visual.process2 }}
                  </span>

                  <!-- Output -->
                  <div class="d-flex align-center gap-1 arr-container" v-if="method.visual.output">
                    <div 
                      v-for="(cell, cIdx) in method.visual.output" 
                      :key="cIdx" 
                      class="cell cell-out font-weight-bold font-family-mono"
                      :style="`border-color: ${cat.colorHex}; color: ${cat.colorHex};`"
                    >
                      {{ cell }}
                    </div>
                  </div>

                  <!-- Extra step (like removed elements) -->
                  <span class="arr-arrow text-caption text-grey-darken-1 font-family-mono px-1" v-if="method.visual.removed">
                    {{ locale === 'fr' ? 'écartés :' : 'removed :' }}
                  </span>

                  <div class="d-flex align-center gap-1 arr-container" v-if="method.visual.removed">
                    <div 
                      v-for="(cell, cIdx) in method.visual.removed" 
                      :key="cIdx" 
                      class="cell cell-removed font-weight-light font-family-mono text-grey-darken-2"
                    >
                      {{ cell }}
                    </div>
                  </div>
                </div>

                <!-- If raw text display -->
                <div v-else class="text-caption text-white font-family-mono">
                  {{ method.visualRawText }}
                </div>
              </div>

              <!-- Examples Section -->
              <div class="examples-section mb-5">
                <div v-for="(ex, exIdx) in method.examples" :key="exIdx" class="example-item mb-4">
                  <div class="code-label text-caption font-weight-bold mb-1" :style="`color: ${cat.colorHex};`">
                    {{ ex.label }}
                  </div>
                  <div class="code-pre-wrap rounded-lg">
                    <pre><code class="language-js">{{ ex.code }}</code></pre>
                  </div>
                  <div class="result-block pa-2 rounded-lg text-caption font-family-mono d-flex align-center">
                    <span class="text-grey-darken-1 mr-2">// =></span>
                    <span class="text-grey-lighten-2">{{ ex.result }}</span>
                  </div>
                </div>
              </div>

              <!-- Traps Section -->
              <div class="traps-block pa-4 rounded-lg mb-5">
                <div class="traps-title text-caption font-weight-bold mb-2 text-error">
                  {{ currentGeneral.commonTraps }}
                </div>
                <ul class="pl-4 text-caption text-grey-lighten-1 font-weight-light">
                  <li v-for="(trap, tIdx) in method.traps" :key="tIdx" class="mb-1">
                    {{ trap }}
                  </li>
                </ul>
              </div>

              <!-- Interview Q&A Section -->
              <div class="interview-block pa-4 rounded-lg">
                <div class="interview-q text-caption font-weight-bold text-primary mb-1">
                  Q: {{ method.interviewQ }}
                </div>
                <div class="interview-a text-caption text-grey-lighten-1 font-weight-light">
                  A: {{ method.interviewA }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- RECAP TABLE SECTION -->
      <section id="recap-table" class="section-wrap mb-16">
        <div class="section-header d-flex align-center mb-8">
          <h2 class="text-h4 font-weight-bold text-white mb-0">
            {{ currentGeneral.tableTitle }}
          </h2>
          <div class="section-line flex-grow-1 mx-4"></div>
        </div>

        <div class="recap-table-wrap rounded-xl overflow-hidden">
          <table class="w-100 font-weight-light text-grey-lighten-2">
            <thead>
              <tr class="text-left">
                <th v-for="(head, hIdx) in currentGeneral.tableHeaders" :key="hIdx" class="pa-4 font-weight-bold text-white">
                  {{ head }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="method in translatedMethods" 
                :key="method.id" 
                class="recap-row"
                @click="scrollToSection(method.id)"
              >
                <td class="pa-4 font-family-mono font-weight-bold text-primary td-method">
                  {{ method.name }}
                </td>
                <td class="pa-4 text-body-2">
                  {{ method.recapReturn }}
                </td>
                <td class="pa-4 text-center">
                  <span 
                    class="px-2 py-0.5 rounded text-caption font-weight-bold" 
                    :class="method.mutates ? 'bg-error-dim text-error' : 'bg-success-dim text-success'"
                  >
                    {{ method.mutates ? currentGeneral.tableYes : currentGeneral.tableNo }}
                  </span>
                </td>
                <td class="pa-4 text-body-2 text-grey-lighten-1">
                  {{ method.recapUsage }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- LIVE CODING QUESTIONS -->
      <section id="live-coding" class="section-wrap mb-16">
        <div class="section-header d-flex align-center mb-8 flex-wrap gap-3">
          <h2 class="text-h4 font-weight-bold text-white mb-0">
            {{ currentGeneral.liveCodingTitle }}
          </h2>
          <div class="section-line flex-grow-1 mx-4 hidden-xs-only"></div>
          <div class="section-badge px-3 py-1 rounded text-caption font-weight-medium bg-primary-dim text-primary">
            {{ currentGeneral.liveCodingSub }}
          </div>
        </div>

        <v-row>
          <v-col 
            v-for="(lc, idx) in translatedLiveCoding" 
            :key="idx" 
            cols="12" 
            md="6" 
            class="mb-6"
          >
            <v-card class="lc-card rounded-xl pa-5 h-100" style="background: #2b2b2b; border: 1px solid rgba(255, 255, 255, 0.08);">
              <div class="d-flex align-center mb-4">
                <span class="lc-icon text-h5 mr-3 pa-2 rounded-lg" :style="`background: ${getCatColor(lc.color).dimBg}; font-family: monospace;`">
                  {{ lc.icon }}
                </span>
                <span class="lc-title text-h6 font-weight-bold text-white">
                  {{ lc.title }}
                </span>
              </div>
              <div class="lc-body">
                <div class="code-pre-wrap rounded-lg">
                  <pre><code class="language-js"><span class="text-grey-darken-1 font-italic">{{ lc.comment }}</span><br>{{ lc.code }}</code></pre>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- MUST KNOW ESSENTIALS -->
      <section id="must-know" class="section-wrap mb-16">
        <div class="section-header d-flex align-center mb-8 flex-wrap gap-3">
          <h2 class="text-h4 font-weight-bold text-white mb-0">
            {{ currentGeneral.mustKnowTitle }}
          </h2>
          <div class="section-line flex-grow-1 mx-4 hidden-xs-only"></div>
          <div class="section-badge px-3 py-1 rounded text-caption font-weight-medium bg-yellow-dim text-yellow">
            {{ currentGeneral.mustKnowSub }}
          </div>
        </div>

        <div class="must-grid">
          <div 
            v-for="(must, idx) in translatedMustKnow" 
            :key="idx" 
            class="must-card pa-5 rounded-xl d-flex flex-column"
            :style="`border-top: 3px solid ${getCatColor(must.color).colorHex};`"
            @click="scrollToSection(must.name.replace('()', ''))"
          >
            <div class="must-name font-weight-black text-h5 mb-3" :style="`color: ${getCatColor(must.color).colorHex};`" font-family="monospace">
              {{ must.name }}
            </div>
            <div class="must-why text-caption text-grey-lighten-2 flex-grow-1 mb-4">
              {{ must.desc }}
            </div>
            <div class="must-tip text-caption font-family-mono px-3 py-1 rounded-lg text-center" :style="`background: ${getCatColor(must.color).dimBg}; color: ${getCatColor(must.color).colorHex};`">
              {{ must.tip }}
            </div>
          </div>
        </div>
      </section>

    </v-container>

    <!-- FOOTER -->
    <footer class="text-center py-10 text-caption text-grey-darken-1 font-family-mono">
      {{ currentGeneral.footerText }}
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { generalData, methodsList, liveCodingQuestions, mustKnowEssentials } from '@/data/jsMethodsData';

const { locale } = useI18n();

// Categories definitions with color tokens
const categories = [
  { id: "manip", color: "yellow", colorHex: "#f5c518", dimBg: "rgba(245, 197, 24, 0.12)" },
  { id: "transform", color: "blue", colorHex: "#04b4e0", dimBg: "rgba(4, 180, 224, 0.12)" },
  { id: "modif", color: "modif", colorHex: "#ff6c5f", dimBg: "rgba(255, 108, 95, 0.12)" }, // coral
  { id: "tri", color: "tri", colorHex: "#2ecc71", dimBg: "rgba(46, 204, 113, 0.12)" }, // green
  { id: "other", color: "other", colorHex: "#9b59b6", dimBg: "rgba(155, 89, 182, 0.12)" } // purple
];

// Helper to find color properties from cat name
function getCatColor(catName) {
  if (catName === 'yellow') return { colorHex: "#f5c518", dimBg: "rgba(245, 197, 24, 0.12)" };
  if (catName === 'blue') return { colorHex: "#04b4e0", dimBg: "rgba(4, 180, 224, 0.12)" };
  if (catName === 'coral' || catName === 'modif') return { colorHex: "#ff6c5f", dimBg: "rgba(255, 108, 95, 0.12)" };
  if (catName === 'green' || catName === 'tri') return { colorHex: "#2ecc71", dimBg: "rgba(46, 204, 113, 0.12)" };
  if (catName === 'purple' || catName === 'other') return { colorHex: "#9b59b6", dimBg: "rgba(155, 89, 182, 0.12)" };
  return { colorHex: "#ffffff", dimBg: "rgba(255, 255, 255, 0.1)" };
}

// Reactively translate general labels
const currentGeneral = computed(() => {
  const lang = locale.value || 'fr';
  return generalData[lang] || generalData['fr'];
});

// Reactively translate array methods
const translatedMethods = computed(() => {
  const lang = locale.value || 'fr';
  return methodsList.map(method => ({
    ...method,
    definition: method.definition[lang] || method.definition['fr'],
    visualLabel: method.visual ? (method.visual.label[lang] || method.visual.label['fr']) : '',
    visualRawText: method.visual && method.visual.rawText ? (method.visual.rawText[lang] || method.visual.rawText['fr']) : null,
    examples: method.examples.map(ex => ({
      ...ex,
      label: ex.label[lang] || ex.label['fr']
    })),
    traps: method.traps[lang] || method.traps['fr'],
    interviewQ: method.interview.q[lang] || method.interview.q['fr'],
    interviewA: method.interview.a[lang] || method.interview.a['fr'],
    recapUsage: method.recapUsage[lang] || method.recapUsage['fr'],
    recapReturn: method.recapReturn[lang] || method.recapReturn['fr']
  }));
});

// Reactively translate live coding questions
const translatedLiveCoding = computed(() => {
  const lang = locale.value || 'fr';
  return liveCodingQuestions.map(lc => ({
    ...lc,
    title: lc.title[lang] || lc.title['fr'],
    comment: lc.comment[lang] || lc.comment['fr']
  }));
});

// Reactively translate must know items
const translatedMustKnow = computed(() => {
  const lang = locale.value || 'fr';
  return mustKnowEssentials.map(must => ({
    ...must,
    desc: must.desc[lang] || must.desc['fr']
  }));
});

// Helper to filter methods by category
function getMethodsByCat(catId) {
  return translatedMethods.value.filter(m => m.category === catId);
}

// Scroll to anchor behavior
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style lang="scss" scoped>
$bg-primary: #1e1e1e;
$bg-card: #252525;
$border-color: rgba(255, 255, 255, 0.06);
$font-mono: 'Fira Code', 'Courier New', Courier, monospace;

.infographic-container {
  background: $bg-primary;
  min-height: 100vh;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.back-bar {
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid $border-color;
}

.hero-section {
  background: radial-gradient(circle at top, rgba(4, 180, 224, 0.08) 0%, transparent 70%);
  
  .highlight-text {
    background: linear-gradient(135deg, #04b4e0 0%, #00d2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
}

.max-w-800 {
  max-width: 800px;
}

.font-family-mono {
  font-family: $font-mono !important;
}

.stats-row {
  .stat-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid $border-color;
    min-width: 140px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(4, 180, 224, 0.3);
      transform: translateY(-2px);
    }

    .stat-num {
      font-size: 2rem;
      line-height: 1.2;
    }
  }
}

.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(30, 30, 30, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $border-color;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 100%;
}

.nav-cat-label {
  flex-shrink: 0;
  white-space: nowrap;
}

.nav-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
  min-width: 0;
  scrollbar-width: none;
}

.nav-scroll::-webkit-scrollbar {
  display: none;
}

.nav-pill {
  flex-shrink: 0;
}

.section-wrap {
  scroll-margin-top:120px;
}

.section-line {
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
}

.section-badge {
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-yellow-dim { background: rgba(245, 197, 24, 0.1); color: #f5c518; }
.bg-blue-dim { background: rgba(4, 180, 224, 0.1); color: #04b4e0; }
.bg-primary-dim { background: rgba(4, 180, 224, 0.1); color: #04b4e0; }

.method-card {
  background: $bg-card;
  border: 1px solid $border-color;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  scroll-margin-top: 80px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .method-name {
    letter-spacing: -0.5px;
  }
}

.visual-block {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.03);

  .arr-container {
    background: rgba(255, 255, 255, 0.01);
    padding: 2px;
    border-radius: 6px;
  }

  .cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: 12px;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    
    &-in {
      background: rgba(255, 255, 255, 0.03);
    }
    
    &-large {
      width: 48px;
      font-size: 11px;
    }
  }
}

.code-pre-wrap {
  background: #181818;
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 12px;
  overflow-x: auto;

  pre {
    margin: 0;
  }

  code {
    font-family: $font-mono;
    font-size: 12px;
    line-height: 1.5;
    background: transparent !important;
    padding: 0 !important;
    color: #e6e6e6;
  }
}

.result-block {
  background: rgba(0, 0, 0, 0.2);
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.traps-block {
  background: rgba(255, 82, 82, 0.03);
  border: 1.5px solid rgba(255, 82, 82, 0.08);
  
  ul {
    margin: 0;
  }
}

.interview-block {
  background: rgba(4, 180, 224, 0.03);
  border: 1.5px solid rgba(4, 180, 224, 0.08);
}

.recap-table-wrap {
  background: $bg-card;
  border: 1px solid $border-color;
  overflow-x: auto;

  table {
    border-collapse: collapse;

    thead {
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1.5px solid $border-color;
    }

    tr.recap-row {
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      cursor: pointer;
      transition: background 0.15s;

      &:hover {
        background: rgba(4, 180, 224, 0.05);
      }
    }
    
    .bg-error-dim { background: rgba(255, 82, 82, 0.1); }
    .bg-success-dim { background: rgba(46, 204, 113, 0.1); }
  }
}

.lc-card {
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25) !important;
    border-color: rgba(4, 180, 224, 0.2) !important;
  }
  
  .lc-icon {
    display: inline-flex;
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
  }
}

.must-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.must-card {
  background: $bg-card;
  border: 1px solid $border-color;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
