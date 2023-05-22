import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Homepage.vue";
import AdvancedSearchPage from "./pages/AdvancedSearchPage.vue";
import ApartmentDetailPage from "./pages/ApartmentDetailPage.vue";
import Login from "./pages/Login.vue";

const routes = [
  { path: "/", component: Homepage, name: "Home" },
  { path: "/advanced-search", component: AdvancedSearchPage },
  { path: "/apartment/:id", component: ApartmentDetailPage },
  { path: "/login", component: Login, name: "Login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
