<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import barner from "@/components/barner.vue";
import get_users from "@/components/user/get_users.vue";


</script>
<template>
    <header>
        <navbar />
    </header>
    <main>
        <div style="display: flex; justify-content: end; margin: 20px; text-decoration: underline;">
            <router-link :to="`/admin/categories`" class="btn">
                Accéder à la page des catégories
            </router-link>
        </div>
       
        <div>
            <get_users/>
        </div>

    </main>
</template>
<style scoped>
.category {
    margin: 20px 30px;
}

.category_link {
    display: flex !important;
    ;
    align-items: center !important;
    justify-content: right !important;
}

.button-53 {
    padding: 12px 26px;
    border: 0;
    font-size: 16px;
    text-decoration: none;
    transition: all 150ms ease-in-out;
    border-radius: 8px;
    font-weight: 600;
    color: #000;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 70.48%, #FFF 93.62%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, rgba(30, 54, 87, 0.00) 0%, rgba(30, 54, 87, 0.01) 100%), #FAFAFA;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.08) 0 0 0 1px, rgba(0, 0, 0, 0.08) 0 -2px 1px 0 inset, rgba(255, 255, 255, 0.5) 0 2px 1px 0 inset, 0 2px 5px -1px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.3);
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);
}

.button-53:hover {
    background-color: #F5F5F5;
}

.button-53:active {
    background-color: #F1F1F1;
    box-shadow: rgba(0, 0, 0, 0.08) 0 0 0 1px, rgba(0, 0, 0, 0.08) 0 1px 1px 0 inset, rgba(255, 255, 255, 0.1) 0 2px 1px 0 inset, 0 2px 5px -1px rgba(0, 0, 0, 0.05);
}
</style>