import { createRouter, createWebHistory } from "vue-router";

import ExpensesList from "@/views/ExpensesList.vue";
import Homepage from "@/views/Homepage.vue";

const routes = [
    { path: "/", component: Homepage},
    { path: "/expenses", component: ExpensesList}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;