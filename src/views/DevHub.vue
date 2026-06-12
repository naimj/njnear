<template>
  <v-container class="devhub-page py-10">
    <!-- HERO SECTION -->
    <v-row class="mb-12 align-center">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2 text-white">{{ $t('devhub.hero_title') }}</h1>
        <p class="text-h6 text-primary font-weight-light">
          {{ $t('devhub.hero_subtitle') }}
        </p>
      </v-col>
    </v-row>

    <!-- CARDS GRID -->
    <v-row>
      <!-- JS Methods Infographic Entry -->
      <v-col cols="12" md="6" lg="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
            class="devhub-page__card rounded-xl h-100 pa-5 d-flex flex-column"
            :class="{ 'on-hover': isHovering }"
            style="background: #2b2b2b; border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.3s ease-in-out;"
          >
            <div class="d-flex align-start mb-4">
              <v-sheet
                color="rgba(4, 180, 224, 0.15)"
                class="rounded-lg mr-4 d-flex align-center justify-center"
                height="60"
                width="60"
                style="border: 1px solid rgba(4, 180, 224, 0.3);"
              >
                <v-icon icon="mdi-language-javascript" size="32" color="primary"></v-icon>
              </v-sheet>
              <div>
                <span class="text-overline text-primary font-weight-bold">INTERVIEW PREP</span>
                <v-card-title class="text-h6 font-weight-bold pt-0 pl-0 text-white white-space-normal">
                  {{ $t('devhub.array_methods.title') }}
                </v-card-title>
              </div>
            </div>

            <v-card-text class="pl-0 text-grey-lighten-1 text-body-2 font-weight-light flex-grow-1">
              {{ $t('devhub.array_methods.desc') }}
            </v-card-text>

            <v-card-actions class="pl-0 pr-0 pt-4">
              <v-btn
                color="primary"
                variant="flat"
                class="rounded-lg font-weight-bold w-100"
                to="/devhub/js-array-methods"
              >
                {{ $t('devhub.array_methods.action') }}
                <v-icon right icon="mdi-arrow-right" class="ml-2"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// DevHub Page Setup
</script>

<style lang="scss" scoped>
.devhub-page {
  &__card {
    &.on-hover {
      transform: translateY(-5px);
      border-color: var(--v-primary-base, #04b4e0) !important;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3) !important;
    }
  }
}
.white-space-normal {
  white-space: normal !important;
  line-height: 1.3;
}
</style>