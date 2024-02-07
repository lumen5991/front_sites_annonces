<script setup lang="ts">
import editIcon from "@/components/icons/editIcon.vue";
import deleteIcon from "@/components/icons/deleteIcon.vue";
import seeMore from "../icons/seeMore.vue";
import { ref, onMounted, computed } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink, useRouter } from 'vue-router';

const error = ref("");
const successMessage = ref("");
const isLoading = ref(true);
const category = ref<any>();
const showDeleteModal = ref(false);
const selectedElement = ref();

const getAllCategory = async () => {
    isLoading.value = true;
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.get('http://localhost:8000/api/category/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        category.value = response.data.categories;
        console.log(response.data.announceByCategory);

    } catch (err) {
        console.error("Erreur lors de la récupération des catégories", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    } finally {
        isLoading.value = false;
    }
}

const deleteCategory = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const userRoles = JSON.parse(localStorage.getItem("roles")!);

        if (userRoles.includes('admin')) {
            await clientHttp.delete(`http://localhost:8000/api/category/delete/${selectedElement.value}`, {
                headers: {
                    Authorization: 'Bearer ' + token!,
                }
            });
            successMessage.value = "Catégorie supprimée avec succès !";
            getAllCategory();
            closeDeleteModal();
            prevPage();
            
            
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de la catégorie", err);
        error.value = "Erreur lors de la suppression de la catégorie";
    }
};

const closeDeleteModal = ()=>{
    selectedElement.value = null;
    showDeleteModal.value = !showDeleteModal.value;
}
onMounted(() => {
    getAllCategory();
});

const pageSize = 3;
const currentPage = ref(1);

const paginatedCategories = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = currentPage.value * pageSize;
    return category.value.slice(startIndex, endIndex);
});

const pages = computed(() => {
    return Math.ceil(category.value.length / pageSize);
});

const nextPage = () => {
    if (currentPage.value < pages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const changePage = (page: number) => {
    currentPage.value = page;
};

const truncateDescription = (description: string) => {
    return description.length > 50 ? description.slice(0, 50) + "..." : description;
};

const proceedToShowDeleteModal = (id:number) =>{
    selectedElement.value = id;
    showDeleteModal.value = !showDeleteModal.value;
}
</script>

<template>
    <section style="">
        <div>
            <div v-if="isLoading" class="loader"></div>
            <div v-else class="container">
                <table class="table table-hover table-responsive-sm">
                    <thead>
                        <tr class="table-dark">
                            <th>Catégories</th>
                            <th>Descriptions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Cat, key) in paginatedCategories" :key="Cat.id">
                            <td>{{ Cat.name }}</td>
                            <td class="description">{{ truncateDescription(Cat.description) }}</td>
                            <td style="display: flex; gap: 10px;">
                                <div>
                                    <RouterLink :to="`/edit_category/${Cat.id}`" class="btn btn-primary">
                                        <editIcon />
                                    </RouterLink>
                                </div>
                                <button type="button" class="btn btn-danger" @click="proceedToShowDeleteModal(Cat.id)">
                                    <deleteIcon />
                                </button>

                                <div>
                                    <router-link :to="`/details_category/${Cat.id}`" class="btn btn-primary">
                                        <seeMore />
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="prevPage">&#8592;</button>
                        </li>
                        <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="changePage(page)">{{ page }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === pages }">
                            <button class="page-link" @click="nextPage">&#8594;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div 
        v-if="showDeleteModal"
            style="position: absolute !important; z-index: 100; top: 0; left: 0; background-color: rgba(118, 112, 112, 0.426); min-height: 100vh; min-width: 100vw; display: flex; align-items: center; justify-content: center;">
            <div class="w-50" style="background-color: white; border-radius: 9px; padding: 10px;">

                <div  tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirmation</h5>
                                <button type="button" class="btn-close" @click="closeDeleteModal()"></button>
                            </div>
                            <div class="modal-body">
                                Êtes-vous sûr de vouloir supprimer cette catégorie ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="closeDeleteModal()">Non</button>
                                <button type="button" class="btn btn-primary ms-2" @click="deleteCategory()" >Oui</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </section>
</template>

<style scoped></style>
