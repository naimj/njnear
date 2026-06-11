<template>
  <v-navigation-drawer
    :model-value="modelValue"
    class="app__drawer d-lg-none"
    temporary
    width="280"
    @update:model-value="$emit('update:modelValue', $event)"
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

      <v-divider class="mb-2 opacity-10"></v-divider>

      <v-list-item class="px-2">
        <LocaleSwitcher />
      </v-list-item>

      <v-divider class="mb-4 opacity-10"></v-divider>

      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        :to="item.to"
        link
        rounded="lg"
        class="mb-1 app__drawer-item"
        color="primary"
        @click="$emit('update:modelValue', false)"
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
</template>

<script setup>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  navItems: {
    type: Array,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
