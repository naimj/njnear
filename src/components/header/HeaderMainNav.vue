<template>
  <nav class="main-menu">
    <ul class="main-menu__list">
      <li class="main-menu__item">
        <RouterLink to="/" class="main-menu__link" active-class="active">
          <img src="@/assets/images/icons/home.svg" alt="home" />
          <span class="main-menu__link-text">{{ $t('nav.home') }}</span>
        </RouterLink>
      </li>
      <li class="main-menu__item">
        <RouterLink to="/about" class="main-menu__link" active-class="active">
          <img src="@/assets/images/icons/user.svg" alt="about" />
          <span class="main-menu__link-text">{{ $t('nav.about') }}</span>
        </RouterLink>
      </li>
      <li class="main-menu__item">
        <RouterLink to="/resume" class="main-menu__link" active-class="active">
          <img src="@/assets/images/icons/file-text.svg" alt="resume" />
          <span class="main-menu__link-text">{{ $t('nav.resume') }}</span>
        </RouterLink>
      </li>
      <li class="main-menu__item">
        <RouterLink to="/portfolio" class="main-menu__link" active-class="active">
          <img src="@/assets/images/icons/briefcase.svg" alt="portfolio" />
          <span class="main-menu__link-text">{{ $t('nav.portfolio') }}</span>
        </RouterLink>
      </li>
      <li class="main-menu__item">
        <RouterLink to="/devhub" class="main-menu__link" active-class="active">
          <img src="@/assets/images/icons/terminal.svg" alt="devhub" />
          <span class="main-menu__link-text">{{ $t('nav.devhub') }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
