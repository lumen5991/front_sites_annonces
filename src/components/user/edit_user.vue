<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';



const router = useRouter();
const authUser = JSON.parse(localStorage.getItem("user")!);
const userInput = ref({
    firstname: null,
    lastname: null,
    username: null,
    picture: null,
    email: null,
})

const error = ref('');
const successMessage = ref('');

const updateUser = async () => {
    try {
        console.log('utililsateur connecté', authUser)
        const token = JSON.parse(localStorage.getItem("token")!);
        console.log('token_user', token);

        const response = await clientHttp.post('http://localhost:8000/api/user/edit', userInput, {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });

        console.log(response);
        successMessage.value = 'Modification fait avec succès';
        error.value = '';
        router.replace('/my_account');
    }

    catch (err) {
        console.error('Je suis pas connecté au backend :', err);
        successMessage.value = '';
        error.value = "Erreur lors de la modification de l'utilisateur";
    }
};

onMounted(() => {
    userInput.value = authUser

    console.log(userInput)
})




</script>

<template>
    <div>
        <navbar />
    </div>
    <div class="container_register">
        <div>
            <form @submit.prevent="updateUser" enctype="multipart/form-data">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                <div class="register_c">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Modifier vos informations</h2>
                    </div>
                    <div class="register_content">
                        <div class="register_content_right">
                            <div class="box_register_content_right">
                                <input type="text" v-model="userInput.firstname" class="register_input" id="firstname"
                                    placeholder="Vos prénom(s)">
                            </div>
                            <div class="box_register_content_right">
                                <input type="text" v-model="userInput.lastname" class="register_input" id="lastname"
                                    placeholder="Votre nom de famille">
                            </div>
                            <div class="box_register_content_right">
                                <input type="text" v-model="userInput.username" class="register_input" id="username"
                                    placeholder="Votre nom d'utilisateur">
                            </div>
                            <div class="box_register_content_right">
                                <input type="email" v-model="userInput.email" class="register_input" id="email"
                                    placeholder="Votre adresse mail">
                            </div>
                            <div class="box_register_content_right">
                                <div>
                                    Photo de profil
                                </div>
                                <input type="file" v-on:="userInput.picture" name="picture" id="picture"
                                    accept=".jpeg,.jpg,.png,.svg,.gif">
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
</template>

<style scoped></style>
