<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";

const error = ref("");
const successMessage = ref("");
const isLoading = ref(true);

const announcements = ref<any[]>();
const moyennes = ref<any>({});
const rating = ref(0);

const token = JSON.parse(localStorage.getItem("token")!);

const getAllAnnounce = async () => {
    isLoading.value = true;
    try {
        const response = await clientHttp.get('http://localhost:8000/api/announce/getAll');
        announcements.value = response.data.announcements;
        moyennes.value = response.data.moyennes;

        console.log("annonces", announcements.value);


    } catch (err) {
        console.error("Erreur lors de l'affichage de l'annonce", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    } finally {
        isLoading.value = false;
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

        getAllAnnounce();

    } catch (err) {
        console.error("Erreur lors de l'ajout de la note", err);
    }
};

onMounted(() => {
    getAllAnnounce();
});
</script>
<template>
    <div class="" style="padding:30px;">
        <div style="margin-bottom: 50px;">
            <h1 style="font-weight: bold;">Les annonces récentes</h1>
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

                        <div style="display: flex; align-items: center;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 1px solid gray; margin-right: 10px;">
                                <img v-if="annonce.author.picture" :src="annonce.author.picture" alt="Pas de photo de profil"
                                    style="width: 100%; height: 100%; object-fit: cover;">
                                <div v-else
                                    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: 30px;">
                                    👩🏽‍🦲
                                </div>
                            </div>
                            <div>
                                {{ annonce.author.firstname }} {{ annonce.author.lastname }}
                            </div>
                        </div>

                    </div>
                    <div class="card-actions">
                        <RouterLink :to="`/detail_announce/${annonce.id}`" class="btn" style="color: blue;">
                            Lire plus ...
                        </RouterLink>
                    </div>
                    <div class="card-rating">
                        <label for="note">Attribuez une note:</label>
                        <div class="stars">
                            <span v-for="(star, i) in 5" :key="i" @click="getCurrentAnnounce(annonce), rating = star"
                                :class="{ 'filled': star <= rating && selectedAnnounce.id === annonce.id }">
                                &#9733;
                            </span>
                        </div>
                        <button @click="addNote(annonce.id)" class="btn">Noter</button>
                        <div>Moyenne : {{ moyennes[annonce.id] }}</div>
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

.container {
    max-width: 1200px;
    margin: 0 auto;
  
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 2fr));
    gap: 30px;
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
    padding: 0 10px;
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
  