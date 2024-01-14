<script setup lang="ts">
import editIcon from "@/components/icons/editIcon.vue"
import delete_category from "./delete_category.vue";

import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink } from 'vue-router';

const error = ref("")
const successMessage = ref("")
const category = ref<any>();


const getAllCategory = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        console.log('token_user', token);
        const response = await clientHttp.get('http://localhost:8000/api/category/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        category.value = response.data.categories;
        console.log(category.value)
    }

    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
}

onMounted(() => {
    getAllCategory()
})
</script>
<template>
    <div>
        <div>
            <div class="container">

                <table class="table table-hover table-responsive-sm">
                    <thead>
                        <tr class="table-dark">
                            <th>Id</th>
                            <th>Catégorie</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-for="Cat in category" :key="Cat.id">
                        <tr>
                            <td>{{ Cat.id }}</td>
                            <td>{{ Cat.name }}</td>
                            <td>{{ Cat.description }}</td>
                            <td style="display: flex; gap: 10px;">
                                <div>
                                    <RouterLink :to="`/edit_category/${Cat.id}`" class="btn btn-primary">
                                        <editIcon />
                                    </RouterLink>
                                </div>
                                <div>
                                    <delete_category :categoryId="Cat.id" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped></style>