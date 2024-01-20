<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
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

        const UserEmail = response.data.user.email
        localStorage.setItem("userEmail", JSON.stringify(UserEmail));

        successMessage.value = 'Inscription réussie';
        error.value = '';

        router.replace('/verifyCode');
        /* router.replace({ path: '/verifyCode', query: { email: email.value } });
 */
    } catch (err) {
        console.error('Je suis pas connecté au backend :', err);

        successMessage.value = '';
        error.value = "Erreur lors de la création de l'utilisateur, l'email ou le nom d'utilisateur existe déjà";
    }
};

onMounted(() => {

})

</script>

<template>
    <div>
        <navbar />
    </div>
    <div class="container_register">

        <div>

            <form @submit.prevent="createUser">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                <div class="register_c">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Inscrivez-vous ici</h2>
                    </div>
                    <div class="register_content">
                        <div class="register_content_left">
                            <img src="../../assets/images/user-profile.gif" alt=""
                                style="width: 100%; height: 100%; object-fit: cover;">
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
                            </div>
                            <div class="box_register_content_right">
                                <input type="email" v-model="email" class="register_input" id="email"
                                    placeholder="Votre adresse mail">
                            </div>
                            <div class="box_register_content_right">
                                <input type="password" v-model="password" class="register_input" id="password"
                                    placeholder="Votre mot de passe">
                            </div>

                            <div class="box_register_content_right">
                                <input type="password" v-model="password_confirmation" class="register_input"
                                    id="password_confirmation" placeholder="Confirmez le mot de passe">
                            </div>

                            <div class="" style="text-align: right;">
                                <button type="submit" class="btn btn-secondary" translate="no">Valider</button>
                            </div>
                            <div class="mt-2">
                                <p style="color:red;">Déjà un compte? <span><RouterLink :to="`/login`"> CONNECTEZ-VOUS </RouterLink></span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>

<style></style>