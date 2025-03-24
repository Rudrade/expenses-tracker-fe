<template>
    <div style="width: 80%;">
        <DataTable
            class="table table-hover"
            :options="options"
            >
            <thead class="table-dark">
                <tr>
                    <th style="color: red">ID</th>
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
import { listExpenses } from "../services/ExpensesService";
import DataTable from "datatables.net-vue3"
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

const options = {
    columns: [
        { data: "id" },
        { data: "date" },
        { data: "description" },
        { data: "amount" },
        { data: "category" },
        { data: "necessity" }
    ],
    serverSide: true,
    processing: true,
    ajax: listExpenses
};
</script>

<style>
@import url('datatables.net-bs5');
</style>