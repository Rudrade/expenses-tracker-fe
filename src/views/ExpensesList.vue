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
        filterDisplay="row"
        v-model:filters="filters"
        dataKey="id">
            
            <template #header>
                <div>
                    <span class="text-xl font-bold">Expenses</span>
                    <Button icon="pi pi-plus" rounded severity="contrast" @click="() => {$router.push({name: 'expense', params: {id:'new'}})}"/>
                </div>
            </template>
            
            <template #empty>No expenses found</template>
            
            <template #loading>Loading expenses. Please wait.</template>

            <Column field="date" header="Date" style="min-width: 10rem">
                <template #body="{data}">
                    {{formatDate(new Date(data.date))}}
                </template>
                <template #filter="{ filterModel }"">
                    <DatePicker 
                        v-model="filterModel.value"
                        type="text"
                        placeholder="Pick date"
                        @update:modelValue="(val) => { if (val.length === 2 && val[0] !== null && val[1] !== null) {renderPage(filterModel) }}"
                        selectionMode="range"
                        :manualInput="false"/>
                </template>
            </Column>
            <Column field="description" header="Description">
                <template #body="{data}">
                    {{data.description}}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by description" @change="renderPage(filterModel)"/>
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
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by category" @change="renderPage(filterModel)"/>
                </template>
            </Column>
            <Column field="necessity" header="Necessity">
                <template #body="{data}">
                    {{data.necessity}}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by necessity" @change="renderPage(filterModel)"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

import { listExpenses } from "@/services/ExpensesService";
import { formatDate, formatCurrency } from "@/utils";

import { onMounted, ref } from "vue";

const expenses = ref([]);
const totalExpenses = ref(0);

onMounted(() => {
    renderPage();
});

const renderPage = (event) => {
    console.log("%c ########## render page", "color: green;", event);
    console.log("alias", event?.alias)
    console.log("value", event?.value)

    const first = event?.first || 0;
    const rows = event?.rows || 10;
    const description = event?.alias === "description" ? event.value : null || null;
    const category = event?.alias === "category" ? event.value : null || null;
    const necessity = event?.alias === "necessity" ? event.value : null || null;
    const startDate = event?.alias === "date" ? formatDate(event.value[0]) : null || null;
    const endDate = event?.alias === "date" ? formatDate(event.value[1]) : null || null;

    listExpenses(
        first, rows, 
        description,
        category,
        necessity,
        startDate,
        endDate
    )
        .then(result => {
            expenses.value = result.expenses;
            totalExpenses.value = result.count;
        });
}

const filters = ref({
    description: { matchMode: "contains", alias: "description" },
    category: { matchMode: "contains", alias: "category" },
    necessity: { matchMode: "contains", alias: "necessity" },
    date: { matchMode: "date", alias: "date" }
});
</script>