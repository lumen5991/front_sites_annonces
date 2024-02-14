<script setup lang="ts">
import navbar from '../navbar.vue';
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();

const error = ref('');
const successMessage = ref('');
const isLoading = ref(true)

const showDeleteModal = ref(false);


const user = ref<any>();

//afficher l'utilisateur connecté
const getUser = async () => {
    isLoading.value = true
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        console.log('token_user', token);
        const response = await clientHttp.get('http://localhost:8000/api/user/me', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        user.value = response.data.user;

        console.log("user_with_file", user.value);

    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
    finally {
        isLoading.value = false
    }
};


//supprimer mon compte

const deleteUser = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.delete("http://localhost:8000/api/user/delete", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log("message de suppression :", response.data);
        localStorage.removeItem("token");
        closeDeleteModal();
        router.replace('/');
    } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur", err);
    }
};

const closeDeleteModal = () => {

    showDeleteModal.value = !showDeleteModal.value;
}

//afficher le modal de confirmation
const proceedToDeleteAccount = () => {

    showDeleteModal.value = !showDeleteModal.value;
}


onMounted(() => {
    getUser();

});

</script>


<template>
    <section>
        <div>
            <div v-if="isLoading" class="loader"></div>
            <div class="container_myAccount">
                <div>
                    <form @submit.prevent="">
                        <div v-if="error" class="alert alert-danger">{{ error }}</div>
                        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                        <div class="myAccount">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Mon compte</h2>
                            </div>
                            <div class="myAccount_content" v-if="user != undefined">
                                <div class="profile-photo">
                                    <div>
                                        <strong>Photo de profil :</strong>

                                    </div>
                                    <div style="width: 150px; height: 150px;">
                                        <img :src="user.picture"
                                            alt="Pas de photo, veuillez modifier votre compte pour choisir une photo de profil"
                                            style="width: 100%; height: 100%; object-fit:contain;">
                                    </div>
                                </div>
                                <div class="user-details">
                                    <div class="">
                                        <p><strong>Nom de famille :</strong> {{ user.lastname }}</p>
                                    </div>
                                    <div class="">
                                        <p><strong>Prénoms :</strong> {{ user.firstname }}</p>
                                    </div>
                                    <div class="">
                                        <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
                                    </div>
                                    <div class="">
                                        <p><strong>Email :</strong> {{ user.email }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="myAccount_crud" style="margin-top: 20px;">
                                <div>
                                    <RouterLink :to="`/edit_user`" class=" btn btn-success ">Modifier</RouterLink>
                                </div>
                                <button type="button" class="btn btn-danger btn-sm ms-2" @click="proceedToDeleteAccount()">
                                    Supprimer mon compte
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showDeleteModal"
            style="position: absolute !important; z-index: 100; top: 0; left: 0; background-color: rgba(118, 112, 112, 0.426); min-height: 100vh; min-width: 100vw; display: flex; align-items: center; justify-content: center;">
            <div class="w-50" style="background-color: white; border-radius: 9px; padding: 10px;">

                <div tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirmation</h5>
                                <button type="button" class="btn-close" @click="closeDeleteModal()"></button>
                            </div>
                            <div class="modal-body">
                                Êtes-vous sûr de vouloir effectuer cette action ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="closeDeleteModal()">Non</button>
                                <button type="button" class="btn btn-primary ms-2" @click="deleteUser()">Oui</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
</template>



