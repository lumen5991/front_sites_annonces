<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import editIcon from '../icons/editIcon.vue';
import deleteIcon from '../icons/deleteIcon.vue';
import seeMoreIcon from '../icons/seeMore.vue';


const error = ref("");
const successMessage = ref("");
const isLoading = ref(true);

const announcements = ref<any[]>();
const moyennes = ref<any>({});
const rating = ref(0);

const token = JSON.parse(localStorage.getItem("token")!);

const getMyannouncements = async () => {
    isLoading.value = true;
    try {
        const response = await clientHttp.get('http://localhost:8000/api/announce/myAnnouncements', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        announcements.value = response.data.announcements;
        moyennes.value = response.data.moyennes;

        console.log("mes annpounces", announcements.value);


    } catch (err) {
        console.error("Erreur lors de l'affichage de l'annonce", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    } finally {
        isLoading.value = false;
    }
};

const deleteAnnounceId = async (id: number) => {
    try {
        const response = await clientHttp.delete(`http://localhost:8000/api/announce/delete/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token!,
            }
        });

        console.log("message de suppression :", response.data);
        successMessage.value = "Annonce supprimée avec succès !";
        getMyannouncements();

    } catch (err) {
        console.error("Erreur lors de la suppression de l'annonce", err);
        error.value = "Erreur lors de la suppression de l'annonce";
    }
};

const selectedAnnounce = ref()
const getCurrentAnnounce = (announce: any) => {
    selectedAnnounce.value = announce
}

const addNote = async (id: number) => {
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

        getMyannouncements();

    } catch (err) {
        console.error("Erreur lors de l'ajout de la note", err);
    }
};

onMounted(() => {
    getMyannouncements();
});
</script>
<template>
    <div style="padding:30px;">
        <div style="margin: 30px 0;">
            <h1 style="font-weight: bold;">Mes annonces</h1>
        </div>
        <div v-if="isLoading" class="loader"></div>
        <div v-else>
            <div class="grid">
                <div v-for="(annonce, index) in announcements" :key="index" class="card">
                    <div class="card-content">
                        <div class="image">
                            <img v-if="annonce.pictures.length > 0" :src="annonce.pictures[0].path"
                                alt="Image de l'annonce" >
                            <div v-else class="no-image">L'auteur de cette annonce n'a pas ajouté des images</div>
                        </div>
                        <h2>{{ annonce.title }}</h2>
                        <p class="body">{{ annonce.body }}</p>
                        <p> <span style="font-weight: bold;">Catégorie :</span>{{ annonce.category.name }}</p>

                    </div>
                    <div class="card-actions">
                        <RouterLink :to="`/edit_announce/${annonce.id}`" class="btn" style="color: blue;">
                            <editIcon />
                        </RouterLink>
                        <button @click="deleteAnnounceId(annonce.id)" class="btn" style="color: red;">
                            <deleteIcon />
                        </button>
                        <RouterLink :to="`/detail_announce/${annonce.id}`" class="btn" style="color: green;">
                            <seeMoreIcon />
                        </RouterLink>
                    </div>
                    <div style="padding: 20px;">
                        Moyenne : {{ moyennes[annonce.id] }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
    padding: 20px;
}

.card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
}

.body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-align: justify;
}

.card-rating {
    padding: 20px;
}

.stars {
    display: inline-block;
}

.filled {
    color: #ffcd2e;
}

.image{
    width: 100%;
    height: 200px;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.no-image  {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    color: #666666;
    font-size: 14px;
    padding: 10px;
    text-align: center;
}
</style>
  