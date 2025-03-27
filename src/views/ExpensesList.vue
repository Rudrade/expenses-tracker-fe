<template>
    <div  style="width: 80%">
        <DataTable 
        :value="expenses"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        :totalRecords="totalExpenses"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        @page="renderPage($event)"
        lazy
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        v-model:filters="filters"
        dataKey="id">
            
            <template #header>
                <span class="text-xl font-bold">Expenses</span>
            </template>
            
            <template #empty>No expenses found</template>
            
            <template #loading>Loading expenses. Please wait.</template>

            <Column field="id" header="ID"/>
            <Column field="date" header="Date"/>
            <Column filterField="expenses.description" header="Description">
                <template #body="{ data }">
                    <span>{{ data.description }}</span>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" placeholder="Search by description" @input="renderPage()" v-model="filterModel.value" />
                </template>
            </Column>
            <Column field="amount" header="Amount">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                </template>
            </Column>
            <Column field="category" header="Category"/>
            <Column field="necessity" header="Necessity"/>

        </DataTable>
    </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';

import { listExpenses } from "@/services/ExpensesService";

import { onMounted, ref } from "vue";

const expenses = ref([]);
const totalExpenses = ref(0);

onMounted(() => {
    renderPage();
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR"
    }).format(value);
};

const renderPage = (event) => {
    console.log("render page", event)
    listExpenses(event?.first, event?.rows)
        .then(result => {
            expenses.value = result.expenses;
            totalExpenses.value = result.count;
        });
}
</script>