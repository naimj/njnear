<template>
  <v-app class="bg-transparent app">
    <v-app-bar
      class="d-lg-none app__bar text-white"
      elevation="4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold text-uppercase text-h6 text-primary">
        Naim Jammali
      </v-toolbar-title>
    </v-app-bar>

    <AppNavigationDrawer v-model="drawer" :nav-items="navItems" />

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
import AppNavigationDrawer from '@/components/header/AppNavigationDrawer.vue';

const drawer = ref(false);

const navItems = [
  { key: 'home', to: '/', icon: 'mdi-home-outline' },
  { key: 'about', to: '/about', icon: 'mdi-account-outline' },
  { key: 'resume', to: '/resume', icon: 'mdi-file-document-outline' },
  { key: 'portfolio', to: '/portfolio', icon: 'mdi-briefcase-outline' },
  { key: 'devhub', to: '/devhub', icon: 'mdi-email-outline' },
];
</script>
