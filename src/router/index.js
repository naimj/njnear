import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ResumeView from '../views/ResumeView.vue';
import PortfolioView from '../views/PortfolioView.vue';
import DevHub from '../views/DevHub.vue';
// import ContactView from '../views/ContactView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/resume', component: ResumeView },
    { path: '/portfolio', component: PortfolioView },
    { path: '/devhub', component: DevHub },
    // { path: '/contact', component: ContactView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;