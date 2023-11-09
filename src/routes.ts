import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

// import MainPageVue from './views/MainPage.vue';
// import ProfilePageVue from './views/ProfilePage.vue';
// import LoginPageVue from './views/LoginPage.vue';
// import RegisterPageVue from './views/RegisterPage.vue';
// import AcceptedPageVue from './views/AcceptedPage.vue';
// import GreeetingsPageVue from './views/GreetingsPage.vue';
// import AddInfoPageVue from './views/AddInfoPage.vue';

const routes: RouteRecordRaw[] = [
	// { path: '/', name: 'MainPage', component: MainPageVue },
	// { path: '/profile', name: 'ProfilePage', component: ProfilePageVue },
	// { path: '/auth', name: 'LoginPage', component: LoginPageVue },
	// { path: '/register', name: 'RegisterPage', component: RegisterPageVue },
	// { path: '/accepted', name: 'AcceptedPage', component: AcceptedPageVue },
	// { path: '/greetings', name: 'GreetingsPage', component: GreeetingsPageVue },
	// { path: '/info', name: 'AddInfoPage', component: AddInfoPageVue },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;