// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import Customer from "@/views/Customer.vue";
import SuperAdmin from "@/views/SuperAdmin.vue";
import Admin from "@/views/Admin.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/sadmin",
    component: SuperAdmin,
  },
  {
    path: "/admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
