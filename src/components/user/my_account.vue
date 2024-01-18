<script setup lang="ts">
import navbar from '../navbar.vue';
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();

const error = ref('');
const successMessage = ref('');
const user = ref<any>();

//afficher l'utilisateur connecté
const getUser = async () => {
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
        router.replace('/');
    } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur", err);
    }
};


onMounted(() => {
    getUser();

});

</script>


<template>
    <div>
        <navbar />
        <div class="container_myAccount">
            <div>
                <form @submit.prevent="">
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                    <div class="myAccount">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Mon compte</h2>
                        </div>
                        <div class="myAccount_content" v-if="user != undefined" >
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
                            <div>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#logoutModal">Supprimer</button>
                                <div id="logoutModal" class="modal fade" tabindex="-1" aria-labelledby="logoutModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="logoutModalLabel">Confirmation</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Êtes-vous sûr de vouloir supprimer votre compte ?
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Non</button>
                                                <button type="button" class="btn btn-primary" @click="deleteUser">Oui</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

