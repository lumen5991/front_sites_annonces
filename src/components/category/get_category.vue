<script setup lang="ts">
import editIcon from "@/components/icons/editIcon.vue"
import deleteIcon from "@/components/icons/deleteIcon.vue"
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()

const error = ref("")
const successMessage = ref("")
const category = ref<any>();

/* const categoryId = route.params.id; */

const getAllCategory = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.get('http://localhost:8000/api/category/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        category.value = response.data.categories;
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
}

const deleteCategory = async (id) => {
    
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.delete(`http://localhost:8000/api/category/delete/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });

        console.log("message de suppression :", response.data);
        successMessage.value = "Catégorie supprimée avec succès !";

        getAllCategory();
       /*  window.location.reload()
        router.replace('/'); */
    } catch (err) {
        console.error("Erreur lors de la suppression de la catégorie", err);
        error.value = "Erreur lors de la suppression de la catégorie";
    }
};

onMounted(() => {
    getAllCategory()
})
</script>
<template>
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
                                <button @click="deleteCategory(Cat.id)" class="btn btn-danger">
                                    <deleteIcon/>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped></style>
