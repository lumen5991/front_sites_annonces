<script setup lang="ts">
import navbar from '../navbar.vue';
import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
/* import { useRouter } from 'vue-router';
const router = useRouter(); */


const error = ref('');
const successMessage = ref('');


const get_user = async () => {
    try {
        const token = localStorage.getItem("token");
        console.log('token_user', token)
        const response = await clientHttp.get('http://localhost:8000/api/user/me', {
            headers: {
                Authorization: 'Bearer ' + token!
            }

        });

        console.log(response.data)
    } 
    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
};
    onMounted(()=>{
        get_user();
    })

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
                            <h2 style="color: #FF0019; font-weight: 900;">Mon compte</h2>
                        </div>
                        <div class="myAccount_content">
                            <div class="profile-photo">
                                <div>
                                    <strong>Photo de profil :</strong>
                                </div>
                                <div style="width: 150px; height: 150px;">
                                    <img src="" alt="Pas de photo, veuillez modifier votre compte pour choisir une photo de profil" style="width: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="user-details">
                                <div class="">
                                    <p><strong>Nom de famille :</strong> {{ }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Prénoms :</strong> {{ }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Nom d'utilisateur :</strong> {{ }}</p>
                                </div>
                                <div class="">
                                    <p><strong>Email :</strong> {{ }}</p>
                                </div>  
                            </div>
                        </div>
                        <div class="myAccount_crud">
                            <div>
                                <RouterLink :to="`#`" class=" btn btn-success crud_edit">Modifier</RouterLink>
                            </div>
                            <div>
                                <RouterLink :to="`#`" class=" btn btn-danger crud_delete">Supprimer</RouterLink>
                            </div>
                            <div>
                                <RouterLink :to="`#`" class=" btn btn-primary crud_disconnect">Déconnecter</RouterLink>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
