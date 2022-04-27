import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import { useAuthStore } from "@/stores/auth.store";

const redirectIfLoggedIn = (_to, _from) => {
	if (useAuthStore().isUserLoggedIn) {
		return {
			name: "profile",
		};
	}
};

const routes = [
	{
		path: "/login",
		name: "login",
		component: UserLogin,
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/admin/setting/introduction",
		name: "introduction",
		component: () => import("@/views/Introduction.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/UserRegister.vue"),
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/admin/profile",
		name: "profile",
		component: () => import("@/views/UserProfile.vue"),
	},
	{
		path: "/card",
		name: "card",
		component: () => import("@/views/Card.vue"),
	},
	{
		path: "/Admin",
		name: "Admin",
		component: () => import("@/views/Admin/Admin.vue"),
	},

	{
		path: "/admin/add",
		name: "contact.add",
		component: () => import("@/views/ProductAdd.vue"),
	},
	{
		path: "/api/products:id",
		name: "contact.edit",
		component: () => import("@/views/ProductEdit.vue"),
		props: true,
	},

	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useAuthStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});

export default router;
