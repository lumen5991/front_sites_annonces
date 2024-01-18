<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import editIcon from '../icons/editIcon.vue';
import deleteIcon from '../icons/deleteIcon.vue';
import starIcon from '../icons/starIcon.vue'


const error = ref("");
const successMessage = ref("");
const announcements = ref<any[]>();


const rating = ref(0);

const token = JSON.parse(localStorage.getItem("token")!);

//Afficher tous les annonces

const getAllAnnounce = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        console.log('token_user', token);
        const response = await clientHttp.get('http://localhost:8000/api/announce/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        announcements.value = response.data.announcements;
        console.log("images des annonces", announcements.value);
    } catch (err) {
        console.error("Erreur lors de l'affichage de l'annonce", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
};

// supprimer une annonce

const deleteAnnounceId = async (id) => {

    try {

        const response = await clientHttp.delete(`http://localhost:8000/api/announce/delete/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });

        console.log("message de suppression :", response.data);
        successMessage.value = "Annoncee supprimée avec succès !";
        getAllAnnounce();
        /* router.replace('/'); */
    } catch (err) {
        console.error("Erreur lors de la suppression de l'annonce", err);
        error.value = "Erreur lors de la suppression de l'annonce";
    }
};


//ajouter une note

const addNote = async (id) => {
    try {
        const noteAnnounce = {
            note: rating.value
        }

        const response = await clientHttp.post(`http://localhost:8000/api/note/add/${id}`, noteAnnounce, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });

        console.log("Note ajoutée :", response.data);

    } catch (err) {
        console.error("Erreur lors de l'ajout de la note", err);

    }
};

onMounted(() => {
    getAllAnnounce();
});

</script>

<template>
    <div>
        <div>
            <div class="container">
                <div v-for="annonce in announcements" style="border: 1px solid gray;padding: 10px;" class="announce">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="width: 80%;">
                            <div>
                                {{ annonce.id }}
                            </div>
                            <div>
                                <p>Titre : <strong>{{ annonce.title }} </strong></p>
                            </div>
                            <div>
                                <p>Contenu : <strong>{{ annonce.body }} </strong></p>
                            </div>
                            <div>
                                <p>Categorie : <strong>{{ annonce.category.name }} </strong></p>
                            </div>
                            <div>
                                <p>Publiée par : <strong>{{ annonce.author.username }} </strong></p>
                            </div>
                        </div>

                        <div v-for="imagePath in annonce.pictures"
                            style="width: 20%; height:200px; display:inline-flex; margin: 0 10px;">
                            <div style=" ">
                                <img :src="imagePath.path" alt="Pas de photo sur votre annonce"
                                    style="width: 100%; height: 100%; object-fit: contain;" />
                            </div>
                        </div>

                    </div>
                    <div style="display: flex; gap: 20px;">
                        <div>
                            <RouterLink :to="`/edit_announce/${annonce.id}`" class="btn" style="color: blue;">
                                <editIcon />
                            </RouterLink>
                        </div>
                        <div>
                            <button @click="deleteAnnounceId(annonce.id)" class="btn" style="color: brown;">
                                <deleteIcon />
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="">
                            <div>
                                <label for="note">Attribuez une note:</label>
                                <div style="display: flex; align-items: center; ">
                                    <div>
                                        <span v-for="star in 5" :key="star" @click="rating = star"
                                            :class="{ 'star-note': star <= rating }"
                                            style="font-size: 24px; cursor: pointer;">
                                            &#9733;
                                        </span>
                                    </div>
                                    <div>
                                        <button @click="addNote(annonce.id)" class="btn">Noter</button>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
  
  
<style scoped>
.star-note {
    color: brown;
}
</style>
  