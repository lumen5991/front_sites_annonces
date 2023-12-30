<script setup lang="ts">
import navbar from './navbar.vue';
import registerUser from './icons/registerUser.vue'
import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
const router = useRouter();


const firstname = ref('');
const lastname = ref('')
const username = ref('');
const email = ref('');
const password_confirmation = ref('');
const password = ref('');

const error = ref('');
const successMessage = ref('');


const createUser = async () => {
    try {
        const user = {
            firstname: firstname.value,
            lastname: lastname.value,
            username: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        };

        const response = await clientHttp.post('http://localhost:8000/api/user/register', user);

        console.log('Réponse du backend :', response.data);

        successMessage.value = 'Inscription réussie';
        error.value = '';
        // router.replace('/verification');
    } catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = 'Erreur lors de la création de l\'utilisateur';
    }
};

</script>

<template>
    <div>
        <navbar />
    </div>
    <div class="container_register">
        <div>
            <h2 style="text-align: center; color: #FF0019; font-weight: 900; margin-top: 10px;">Inscrivez-vous ici</h2>
            <form @submit.prevent="createUser">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>


                <div class="register_content">
                    <div class="register_content_left">
                        <registerUser />
                        <registerUser />
                        <registerUser />
                    </div>
                    <div class="register_content_right">
                        <div class="box_register_content_right">
                            <input type="text" v-model="firstname" class="register_input" id="firstname"
                                placeholder="Vos prénom(s)">
                        </div>
                        <div class="box_register_content_right">
                            <input type="text" v-model="lastname" class="register_input" id="lastname"
                                placeholder="Votre nom de famille">
                        </div>
                        <div class="box_register_content_right">
                            <input type="text" v-model="username" class="register_input" id="username"
                                placeholder="Votre nom d'utilisateur">
                            <label for="username" style="color: #FF0019;">*</label>
                        </div>
                        <div class="box_register_content_right">
                            <input type="email" v-model="email" class="register_input" id="email"
                                placeholder="Votre adresse mail">
                            <label for="email" style="color: #FF0019;">*</label>
                        </div>
                        <div class="box_register_content_right">
                            <input type="password" v-model="password" class="register_input" id="password"
                                placeholder="Votre mot de passe">
                            <label for="password" style="color: #FF0019;">*</label>
                        </div>

                        <div class="box_register_content_right">
                            <input type="password" v-model="password_confirmation" class="register_input"
                                id="password_confirmation" placeholder="Confirmez le mot de passe">
                            <label for="password_confirmation" style="color: #FF0019;">*</label>
                        </div>

                        <div class="" style="text-align: right;">
                            <button type="submit" class="btn btn-secondary" translate="no">Valider</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
</div></template>

<style></style>