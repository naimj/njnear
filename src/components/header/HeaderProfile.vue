<template>
  <aside class="sidebar">
    <div class="sidebar__profile">
      <figure class="sidebar__profile-avatar">
        <img src="https://art-template.ru/vcard4/assets/images/my-avatar.png" class="sidebar__profile-avatar-img" alt="Naim Jammali" />
      </figure>
      <h2 class="sidebar__profile-name">{{ cvData.personal_information.name }}</h2>
      <h4 class="sidebar__profile-job">{{ $t('header.job_title') }}</h4>
      
      <LocaleSwitcher />
    </div>
    <div class="sidebar__info">
      <ul class="sidebar__info-list">
        <li class="sidebar__info-list-item">
          <span class="sidebar__info-list-item-icon">
            <img src="@/assets/images/icons/mail.svg" alt="mail" />
          </span>
          <div class="sidebar__info-list-item-text">
            <span class="sidebar__info-list-item-label">{{ $t('header.email') }}</span>
            <a class="sidebar__info-list-item-link" :href="'mailto:' + cvData.personal_information.email" :title="cvData.personal_information.email">{{ cvData.personal_information.email }}</a>
          </div>
        </li>
        <li class="sidebar__info-list-item">
          <span class="sidebar__info-list-item-icon">
            <img src="@/assets/images/icons/phone.svg" alt="phone" />
          </span>
          <div class="sidebar__info-list-item-text">
            <span class="sidebar__info-list-item-label">{{ $t('header.phone') }}</span>
            <span class="sidebar__info-list-item-link" :title="cvData.personal_information.phone">{{ cvData.personal_information.phone }}</span>
          </div>
        </li>
        <li class="sidebar__info-list-item">
          <span class="sidebar__info-list-item-icon">
            <img src="@/assets/images/icons/calendar.svg" alt="Birthday" />
          </span>
          <div class="sidebar__info-list-item-text">
            <span class="sidebar__info-list-item-label">{{ $t('header.birthday') }}</span>
            <span class="sidebar__info-list-item-link" :title="$t('header.birthday_val')">{{ $t('header.birthday_val') }}</span>
          </div>
        </li>
        <li class="sidebar__info-list-item">
          <span class="sidebar__info-list-item-icon">
            <img src="@/assets/images/icons/map-pin.svg" alt="location" />
          </span>
          <div class="sidebar__info-list-item-text">
            <span class="sidebar__info-list-item-label">{{ $t('header.location') }}</span>
            <span class="sidebar__info-list-item-link" title="Paris, France">Paris, France</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="sidebar__contact">
      <v-btn 
        class="sidebar__contact-button" 
        href="/cv/Jammali_Naim.pdf" 
        download
        target="_blank"
        variant="plain"
        rounded="0"
        height="70"
        :ripple="false"
      >
        {{ $t('header.download_cv') }}
      </v-btn>
      <RouterLink to="/contact" class="sidebar__contact-button">{{ $t('header.contact') }}</RouterLink>
    </div>
    <ul class="sidebar__info-social-media">
      <li v-for="link in socialMediaLinks" :key="link.name">
        <a :href="link.url" target="_blank">
          <img :src="getIconSrc(link.name)" :alt="link.name" />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useCVData } from '@/composables/useCVData';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';

const { cvData } = useCVData();

const socialMediaLinks = [
  { name: 'linkedin', url: 'https://www.linkedin.com/in/naim-jammali-b14a07107/' },
  { name: 'github', url: 'https://github.com/naimj' },
];

const getIconSrc = (name) => {
  return require(`@/assets/images/icons/${name.toLowerCase()}.svg`);
};
</script>