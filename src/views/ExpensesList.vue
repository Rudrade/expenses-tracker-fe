<template>
    <div style="width: 80%;">
        <DataTable
            class="table table-hover"
            :columns="columns"
            :data="expenses"
            >
            <thead class="table-dark">
                <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Montante</th>
                    <th>Categoria</th>
                    <th>Necessidade</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { listExpenses } from "../services/ExpensesService";
import DataTable from "datatables.net-vue3"
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

const columns = [
    { data: "date" },
    { data: "description" },
    { data: "amount" },
    { data: "category" },
    { data: "necessity" }
];

const expenses = ref([]);

onMounted(() => {
    listExpenses().then((lst) => {
        expenses.value = lst;
    });
});
</script>

<style>
@import url('datatables.net-bs5');
</style>