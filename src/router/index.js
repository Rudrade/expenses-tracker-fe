import { createRouter, createWebHistory } from "vue-router";

import ExpensesList from "@/views/ExpensesList.vue";
import Homepage from "@/views/Homepage.vue";
import Expense from "@/views/Expense.vue";

const routes = [
    { path: "/", component: Homepage},
    { path: "/expenses", component: ExpensesList},
    { path: "/expenses/:id", component: Expense, props: true, name: "expense" },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;