<template>
    <ag-grid-vue
        :rowData="rowData"
        :columnDefs="columnDefs"
        style="height: 80%; width: 80%;"
        :theme="myTheme"/>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3"
import { ref } from "vue"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const rowData = ref([
    { date: new Date(Date.now()), description: "Teste", amount: 50.85, category: "Lazer", necessity: "Nenhuma"}
]);

const columnDefs = ref([
    { 
        field: "date",
        filter: "agDateColumnFilter",
        cellDataType: "date",
        headerName: "Data"
    },
    { 
        field: "description",
        headerName: "Descrição"
    },
    { 
        field: "amount",
        valueFormatter: p => p.value + " €",
        headerName: "Montante"
    },
    { 
        field: "category",
        headerName: "Categoria"
    },
    { 
        field: "necessity",
        headerName: "Necessidade"
    }
]);

const myTheme = themeQuartz
	.withPart(iconSetQuartzLight)
	.withParams({
        backgroundColor: "#ffffff",
        browserColorScheme: "light",
        columnBorder: false,
        fontFamily: [
            "Arial",
            "sans-serif"
        ],
        foregroundColor: "rgb(46, 55, 66)",
        headerBackgroundColor: "#F9FAFB",
        headerFontSize: 14,
        headerFontWeight: 700,
        headerTextColor: "#919191",
        oddRowBackgroundColor: "#F9FAFB",
        rowBorder: true,
        sidePanelBorder: false,
        spacing: 8,
        wrapperBorder: false,
        wrapperBorderRadius: 0
    });
</script>