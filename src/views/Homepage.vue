<template>
    This is homepage

    <div style="width: 80%">
        <DataTable 
            :value="expenses"
            :rows="5"
            lazy
            tableStyle="min-width: 50rem"
        >

        <template #header>
            <span class="text-xl font-bold">Recent Expenses</span>
        </template>

        <template #empty>No expenses found</template>
            
        <template #loading>Loading expenses. Please wait.</template>

        <Column field="date" header="Date" style="min-width: 10rem">
                <template #body="{data}">
                    {{formatDate(new Date(data.date))}}
                </template>
            </Column>
            <Column field="description" header="Description">
                <template #body="{data}">
                    {{data.description}}
                </template>
            </Column>
            <Column field="amount" header="Amount">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                </template>
            </Column>
            <Column field="category" header="Category">
                <template #body="{data}">
                    {{data.category}}
                </template>
            </Column>
            <Column field="necessity" header="Necessity">
                <template #body="{data}">
                    {{data.necessity}}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { ref, onMounted } from "vue";

import { formatDate, formatCurrency } from "@/utils";
import { getRecentExpenses } from "@/services/ExpensesService";

const expenses = ref([]);

onMounted(() => {
    getRecentExpenses()
        .then(lst => {
            expenses.value = lst;
        });
});


</script>