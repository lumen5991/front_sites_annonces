<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import barner from "@/components/barner.vue";
import get_category from "@/components/category/get_category.vue"

import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
const router = useRouter();

const name = ref("")
const description = ref("")
const error = ref("")
const successMessage = ref("")

const add_category = async () => {

    try {

        const token = JSON.parse(localStorage.getItem("token")!);

        const category = {
            name: name.value,
            description: description.value
        }

        const response = await clientHttp.post("http://localhost:8000/api/category/add", category, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        })

        console.log(response.data)

        successMessage.value = 'Catégorie ajoutée avec succès';
        error.value = '';
        name.value = ''
        description.value = ''
        /* router.replace('/'); */
    }
    catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = "Erreur lors de l'ajout de la catégorie";
    }
}

</script>
<template>
    <header>
        <navbar />
    </header>
    <main>
        <div class="barner">
            <barner />
        </div>
        <div class="category">
            <button type="button" class="button-53 category_link" data-bs-toggle="modal"
                data-bs-target="#logoutModal">Ajouter une catégorie</button>
            <div id="logoutModal" class="modal fade" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div class="modal-dialog">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="logoutModalLabel">Ajouter une catégorie</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="error" class="alert alert-danger">{{ error }}</div>
                            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
                            <div>
                                <div>
                                    <h6>Nom de la catégorie</h6>
                                </div>
                                <div>
                                    <input type="text" v-model="name" class="form-control" placeholder="">
                                </div>
                            </div>
                            <div class="mt-3">
                                <div>
                                    <h6>Description</h6>
                                </div>
                                <div>
                                    <textarea name="description" v-model="description" class="form-control" id="" cols="30"
                                        rows="8"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" class="btn btn-primary" @click="add_category">Valider</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="category">
            <get_category />
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