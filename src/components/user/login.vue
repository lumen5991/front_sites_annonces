<script setup lang="ts">
import navbar from '../navbar.vue';


import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const password = ref('')
const error = ref('');
const successMessage = ref('');

const login = async () => {
    try {
        const user = {
            email: email.value,
            password: password.value,
        };

        const response = await clientHttp.post('http://localhost:8000/api/user/login', user);
        
        console.log('Réponse du backend :', response.data);

        const token = response.data.token

        localStorage.setItem("token",JSON.stringify(token));

        successMessage.value = 'Connection réussie';
        error.value = '';
        router.replace('/');
    }

    catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = "Email ou mot de passe incorrect";
    }
};


</script>
<template>
    <div>
        <div>
            <navbar />
        </div>
        <div class="container_login ">

            <div>

                <form @submit.prevent="login">
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                    <div class="login_c">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <h2 style="color: #FF0019; font-weight: 900;">Connectez-vous ici</h2>
                        </div>
                        <div class="register_content">
                            <div class="register_content_left">
                                <img src="../../assets/images/face-scan.gif" alt="" style="width: 50%;  object-fit: cover;">
                            </div>
                            <div class="register_content_right">
                                <div class="box_register_content_right">
                                    <input type="email" v-model="email" class="register_input" id="email"
                                        placeholder="Votre adresse mail">
                                </div>
                                <div class="box_register_content_right">
                                    <input type="password" v-model="password" class="register_input" id="password"
                                        placeholder="Votre mot de passe">
                                </div>

                                <div class="" style="text-align: right;">
                                    <button type="submit" class="btn btn-secondary" translate="no">Valider</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>

    </div>
</template>