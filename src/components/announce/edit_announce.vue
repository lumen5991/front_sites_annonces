<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute()

const title = ref('');
const body = ref('');
const category = ref('');
const pictures = ref();

const categories = ref("")

const error = ref('');
const successMessage = ref('');

const token = JSON.parse(localStorage.getItem("token")!);
console.log('token_user', token);

const announceId = route.params.id;

const getAnnounceId = async () => {
    try {
        const response = await clientHttp.get(`http://localhost:8000/api/announce/get/${announceId}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        })

        console.log("AnnonceId",response.data.announcement)

        title.value = response.data.announcement.title  
        body.value = response.data.announcement.body 
    }

    catch (err) {
        console.error('je ne suis pas connecté au backend :', err);
        successMessage.value = '';
        error.value = "Erreur lors de la récupération de l'annonce";
    }
}

const getAllCategory = async () => {
    try {

        const response = await clientHttp.get('http://localhost:8000/api/category/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        categories.value = response.data.categories;
    }

    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
}

const onFilePicture = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        for (let i = 0; i < target.files.length; i++) {
            console.log(target.files[i])
        }
        pictures.value = target.files;
        console.log("images", pictures.value);
    }
};

const editAnnounce = async () => {
    try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("body", body.value);
        formData.append("category", category.value);

        if (pictures.value) {
            console.log(pictures.value)
            for (let i = 0; i < pictures.value.length; i++) {
                formData.append("pictures[]", pictures.value[i]);

            }
        }
        console.log(formData)

        const response = await clientHttp.post(`http://localhost:8000/api/announce/edit/${announceId}`, formData, {
            headers: {
                Authorization: 'Bearer ' + token!,
                "Content-Type": "multipart/form-data"
            }
        });

        console.log(response);
        successMessage.value = "Ajout de l'annonce fait avec succès";
        error.value = '';
        title.value = "",
        body.value = "",
        category.value = "",
        pictures.value = ""

        router.replace('/');
    } catch (err) {
        console.error('Je ne suis pas connecté au backend :', err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas autoriser à modifier cette annonce";
    }
};

onMounted(async () => {
    getAllCategory()
    getAnnounceId()
    
});
</script>

<template>
    <div>
        <navbar />
    </div>
    <div class="container_register">
        <div>
            <form @submit.prevent="editAnnounce" enctype="multipart/form-data">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                <div class="register_c">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <h2 style="color: rgb(114, 108, 108); font-weight: 900;">Modifier votre annonce</h2>
                    </div>
                    <div class="register_content">
                        <div class="register_content_right">
                            <div class="box_register_content_right">
                                <input type="text" v-model="title" class="register_input" id="title"
                                    placeholder="Titre de l'annonce">
                            </div>
                            <div class="box_register_content_right">
                                <textarea name="body" v-model="body" class="register_input" id="body" cols="10"
                                    rows="8"></textarea>
                            </div>
                            <div class="box_register_content_right">
                                <select v-model="category" class="form-select" name="category" id="category">
                                    <option value="" selected disabled>Sélectionner la catégorie</option>
                                    <option v-for="cat in categories" :value="cat.id">{{ cat.name }}</option>
                                </select>
                            </div>

                            <div class="box_register_content_right">
                                <div>
                                    Choisir des images
                                </div>
                                <input type="file" @change="onFilePicture" id="files" name="files" multiple>
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
