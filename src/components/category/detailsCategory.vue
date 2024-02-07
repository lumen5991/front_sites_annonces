<script setup lang="ts">
import Navbar from '../navbar.vue';
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRoute } from 'vue-router';

const route = useRoute();  
const error = ref("");
const successMessage = ref("");
const categoryId = ref(route.params.id); 
const category = ref<any>(); 

const token = JSON.parse(localStorage.getItem("token")!);

const getIdCategory = async () => {
    try {
        const userRoles = JSON.parse(localStorage.getItem("roles")!);

        if (userRoles.includes('admin')) {
            const response = await clientHttp.get(`http://localhost:8000/api/category/get/${categoryId.value}`, {
                headers: {
                    Authorization: 'Bearer ' + token!,
                }
            });

            category.value = response.data;
            console.log("cat",category.value);
        }
    } catch (err) {
        console.error('Erreur lors de la récupération de la catégorie :', err);
        successMessage.value = '';
        error.value = "Erreur lors de la récupération de la catégorie";
    }
}

onMounted(() => {
    getIdCategory()
});
</script>

<template>
    <div>
        <div class="mb-5">
            <Navbar />
        </div>
        <div class="container">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="category">
                <div>
                    <h6>Nom de la catégorie</h6>
                </div>
                <div>
                    {{ category.name }}
                </div>
            </div>
            <div class="mt-3" v-if="category">
                <div>
                    <h6>Description</h6>
                </div>
                <div>
                  {{ category.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
