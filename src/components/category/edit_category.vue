<script setup lang="ts">
import navbar from '../navbar.vue';

import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const new_name = ref("");
const new_description = ref("");
const error = ref("");
const successMessage = ref("");


const categoryId = route.params.id;
const token = JSON.parse(localStorage.getItem("token")!);

const getIdCategory = async () => {
    try {
        const idCategory = await clientHttp.get(`http://localhost:8000/api/category/get/${categoryId}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        })

        new_name.value = idCategory.data.category.name;
        new_description.value = idCategory.data.category.description;
    }

    catch (err) {
        console.error('je ne suis pas connecté au backend :', err);
        successMessage.value = '';
        error.value = "Erreur lors de la récupération de la catégorie";
    }
}

const edit_category = async () => {
    try {

        const category = {
            new_name: new_name.value,
            new_description: new_description.value
        }

        const response = await clientHttp.put(`http://localhost:8000/api/category/edit/${categoryId}`, category, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });

        console.log(response.data);

        successMessage.value = 'Catégorie modifiée avec succès';
        error.value = '';
        router.replace('/')
        
    } catch (err) {
        console.error('je ne suis pas connecté au backend :', err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas autoriser à modifier cette catégorie";
    }
}

onMounted(() => {
    
    getIdCategory()

});
</script>


<template>
    <div>
        <div class="mb-5">
            <navbar />
        </div>
        <div class="container">
           
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            
            <div>
                <div>
                    <h6>Nom de la catégorie</h6>
                </div>
                <div>
                    <input type="text" v-model="new_name" class="form-control" id="new_name" placeholder="">
                </div>
            </div>
            <div class="mt-3">
                <div>
                    <h6>Description</h6>
                </div>
                <div>
                    <textarea name="description" v-model="new_description" :id="new_description" class="form-control" id="" cols="30"
                        rows="8"></textarea>
                </div>
            </div>

            <div class="mt-3">
                <button type="button" class="btn btn-primary" @click="edit_category">Valider</button>
            </div>
        </div>

    </div>
</template>

<style></style>