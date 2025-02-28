<template>
    <div class="app">
        <Menu />

        <div class="main-container">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import Menu from "./components/Menu.vue";
</script>