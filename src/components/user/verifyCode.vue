<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import barner from "@/components/barner.vue";

import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const verification_code = ref('')
const error = ref('');
const successMessage = ref('');

const verifyEmail = async () => {
    try {
        const code = {
            email: email.value,
            verification_code: verification_code.value,

        };

        const response = await clientHttp.post('http://localhost:8000/api/user/verifyEmail', code);

        console.log('Réponse du backend :', response.data);

        successMessage.value = 'Code validé';
        error.value = '';
        router.replace('/login');
    } 
    
    catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = 'Email ou Code invalide';
    }
};

</script>
<template>
    <div>
        <div>
            <navbar />
        </div>
        <div>
            <barner />
        </div>
        <div class="container_register">

            <div>

                <form @submit.prevent="verifyEmail">
                    <div v-if="error" class="alert alert-danger">{{ error }}</div>
                    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                    <div class="register_c">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <h2 style="color: #FF0019; font-weight: 900;">Validez votre inscription ici</h2>
                        </div>
                        <div class="register_content">
                            <div class="register_content_left">
                                <img src="../../assets/images/mot-de-passe.gif" alt=""
                                    style="width: 50%;  object-fit: cover;">
                            </div>
                            <div class="register_content_right">
                                <div class="box_register_content_right">
                                    <input type="email" v-model="email" class="register_input" id="email"
                                        placeholder="Votre adresse mail">
                                </div>
                                <div class="box_register_content_right">
                                    <input type="text" v-model="verification_code" class="register_input"
                                        id="verification_code" placeholder="Votre code de vérification">
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