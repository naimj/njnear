<template>
  <v-app class="bg-transparent">
    <!-- Mobile App Bar -->
    <v-app-bar
      class="d-lg-none custom-app-bar text-white"
      elevation="4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold text-uppercase text-h6 text-primary">
        Naim Jammali
      </v-toolbar-title>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      class="custom-nav-drawer d-lg-none"
      temporary
      width="280"
    >
      <v-list class="pa-4">
        <v-list-item class="mb-4">
           <div class="d-flex align-center">
              <v-avatar size="60" class="mr-3 border border-primary">
                <img src="https://art-template.ru/vcard4/assets/images/my-avatar.png" alt="Naim Jammali" style="width: 100%; height: 100%; object-fit: cover;" />
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-bold text-white">Naim Jammali</div>
                <div class="text-caption text-primary">{{ $t('header.job_title') }}</div>
              </div>
           </div>
        </v-list-item>

        <v-divider class="mb-4 opacity-10"></v-divider>

        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          link
          rounded="lg"
          class="mb-1 nav-drawer-item"
          color="primary"
          @click="drawer = false"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" color="primary"></v-icon>
          </template>
          <v-list-item-title class="text-white font-weight-medium">
            {{ $t(`nav.${item.key}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content & Desktop Layout -->
    <v-main class="main-container">
      <header class="header d-none d-lg-block">
        <HeaderMainNav />
        <HeaderProfile />
      </header>
      <div class="main-content">
        <router-view />
        <CvChatbot />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import HeaderMainNav from '@/components/header/HeaderMainNav.vue';
import HeaderProfile from '@/components/header/HeaderProfile.vue';
import CvChatbot from '@/components/CvChatbot.vue';

const drawer = ref(false);

const navItems = [
  { key: 'home', to: '/', icon: 'mdi-home-outline' },
  { key: 'about', to: '/about', icon: 'mdi-account-outline' },
  { key: 'resume', to: '/resume', icon: 'mdi-file-document-outline' },
  { key: 'portfolio', to: '/portfolio', icon: 'mdi-briefcase-outline' },
  { key: 'contact', to: '/contact', icon: 'mdi-email-outline' },
];
</script>

<style lang="scss">
@import '@/assets/styles/utils/_variables';

.custom-app-bar {
  background-color: $color-bg-dark !important;
}

.custom-nav-drawer {
  background-color: $color-bg-dark !important;
}

.main-container {
  min-height: 100vh;
  padding: 0 !important;
}

.nav-drawer-item {
  &.v-list-item--active {
    background: rgba(var(--v-theme-primary), 0.1);
  }
}
</style>
