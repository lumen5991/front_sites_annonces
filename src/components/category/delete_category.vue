<script setup lang="ts">
import deleteIcon from "@/components/icons/deleteIcon.vue";
import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const categoryId = route.params.id;

const error = ref("");
const successMessage = ref("");

const deleteCategory = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.delete(`http://localhost:8000/api/category/delete/${categoryId}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });
        console.log("message de suppression :", response.data);
        successMessage.value = "Catégorie supprimée avec succès !";

        router.replace('/');
    } catch (err) {
        console.error("Erreur lors de la suppression de la catégorie", err);
        error.value = "Erreur lors de la suppression de la catégorie";
    }
};
</script>

<template>
    <div>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
            <deleteIcon />
        </button>

        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                    <div class="modal-header">

                        <h5 class="modal-title" id="deleteModalLabel">Confirmation de suppression</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non</button>
                        <button type="button" class="btn btn-danger" @click="deleteCategory">Oui</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
