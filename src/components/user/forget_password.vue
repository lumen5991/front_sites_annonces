<script setup lang="ts">
    import navbar from '../navbar.vue';


    import { ref } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const new_password = ref('')
const new_password_confirmation = ref('')

const error = ref('');
const successMessage = ref('');

const login = async () => {
    try {
        const user = {
            email: email.value,
            new_password: new_password.value,
            new_password_confirmation: new_password_confirmation.value
        };

        const response = await clientHttp.post('http://localhost:8000/api/user/resetPassword', user);

        console.log(response.data)

        successMessage.value = 'Mot de passe modifié avec succès';
        error.value = '';
        router.replace('/login');
    }

    catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = "Le mot de passe n'a pas pu être modifié";
    }
};

</script>
<template>
    
    <div>
        <div>
            <navbar/>
        </div>
        <div class="container_login ">

<div>

    <form @submit.prevent="login">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <div class="login_c">
            <div style="display: flex; align-items: center; justify-content: center;">
                <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Modifier votre mot de passe</h2>
            </div>
            <div class="register_content">
                <div class="register_content_left">
                    <iframe src="https://lottie.host/embed/099d024d-9496-4be7-bd97-61ab6a69b621/V5m6VWYLIb.json"></iframe>
                    
                    <!-- <img src="../../assets/images/face-scan.gif" alt="" style="width: 50%;  object-fit: cover;">
                 -->
                
                </div>
                <div class="register_content_right">
                    <div class="box_register_content_right">
                        <input type="email" v-model="email" class="register_input" id="email"
                            placeholder="Votre adresse mail">
                    </div>
                    <div class="box_register_content_right">
                        <input type="password" v-model="new_password" class="register_input" id="password"
                            placeholder="Votre nouveau mot de passe">
                    </div>
                    <div class="box_register_content_right">
                        <input type="password" v-model="new_password_confirmation" class="register_input" id="password"
                            placeholder="Confirmez votre nouveau mot de passe">
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