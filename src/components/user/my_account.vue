<script setup lang="ts">
import navbar from '../navbar.vue';
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const error = ref('');
const successMessage = ref('');
const user = ref(null);

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
        user.value = response.data;
        
        console.log("user_with_file", user.value);

    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
};

//Déconnection de l'utilisateur

const logout = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.post("http://localhost:8000/api/user/logout", null, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log("message de déconnexion :", response.data);
        router.replace('/');
    } catch (err) {
        console.error("Erreur lors de la déconnexion de l'utilisateur", err);
    }
};

//supprimer mon compte

const deleteUser = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        const response = await clientHttp.delete("http://localhost:8000/api/user/delete",  {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log("message de suppression :", response.data);
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
                        <div class="myAccount_content" v-for="(user_data, key) in user" :key="key">
                            <div class="profile-photo">
                                <div>
                                    <strong>Photo de profil :</strong>
                                  
                                </div>
                                <div style="width: 150px; height: 150px;">
                                    <img :scr="'/storage'+ user_data.picture" alt="Pas de photo, veuillez modifier votre compte pour choisir une photo de profil"
                                        style="width: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="user-details">
                                <div class="">
                                    <p><strong>Nom de famille :</strong> {{ user_data.lastname }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Prénoms :</strong> {{ user_data.firstname }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Nom d'utilisateur :</strong> {{ user_data.username }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Email :</strong> {{ user_data.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="myAccount_crud">
                            <div>
                                <RouterLink :to="`/edit_user`" class=" btn btn-success crud_edit">Modifier</RouterLink>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary crud_disconnect" @click="logout">Déconnecter</button>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-danger crud_delete" @click="deleteUser">Supprimer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

