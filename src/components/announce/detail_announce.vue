<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRoute } from 'vue-router';


const route = useRoute();
const error = ref("");
const successMessage = ref("");
const announceId = ref(route.params.id);
const announcement = ref<any>();
const isLoading = ref(true);

const token = JSON.parse(localStorage.getItem("token")!);

const getIdAnnounce = async () => {
    isLoading.value = true;
    try {
        const userRoles = JSON.parse(localStorage.getItem("roles")!);

        if (userRoles.includes('admin')) {
            const response = await clientHttp.get(`http://localhost:8000/api/announce/get/${announceId.value}`, {
                headers: {
                    Authorization: 'Bearer ' + token!,
                }
            });

            announcement.value = response.data.announcement;

            console.log("une annonce", announcement.value)

        }
    } catch (err) {
        console.error('Erreur lors de la récupération de la catégorie :', err);
        successMessage.value = '';
        error.value = "Erreur lors de la récupération de la catégorie";
    }
    finally {
        isLoading.value = false;
    }
}


onMounted(() => {
    getIdAnnounce();
});
</script>

<template>
    <div class="container">
        
        <div v-if="isLoading" class="loader"></div>
        <div v-else class="" style="padding: 30px;">
            <div style="margin: 30px 0;">
            <h1 style="font-weight: bold;">Détails</h1>
        </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="announcement">

                <div v-if="announcement && announcement.pictures && announcement.pictures.length > 0"
                    style="width: 100%; display: flex;  align-items:center; justify-content:center;">

                    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="10000"
                        style="height: 300px; margin-bottom: 20px;">
                        <div class="carousel-inner" style="height: 100%;">
                            <div v-for="(picture, index) in announcement.pictures" :key="index" class="carousel-item"
                                :class="{ 'active': index === 0 }">
                                <img :src="picture.path" class="d-block w-100 carousel-image" :alt="'Image ' + (index)">
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                    data-bs-slide="prev"
                                    style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%);">
                                    <span class="" aria-hidden="true" style="color: #fff; background-color: #000;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="feather feather-arrow-left">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                    </span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                            </div>
                            <div>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                    data-bs-slide="next"
                                    style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%);">
                                    <span class="" aria-hidden="true" style="color: #fff; background-color: #000;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="feather feather-arrow-right">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
                <div v-else style="display: none;"></div>

                <div class=" mt-3">
                    <h1>Titre : <span style="font-weight: lighter;"> {{ announcement.title }} </span></h1>

                </div>
                <div class=" mt-3">
                    <h1>Catégorie : <span style="font-weight: lighter;"> {{ announcement.category.name }} </span></h1>
                </div>

                <div class=" mt-3">
                    <h1>Description</h1>
                    <p style="text-align: justify; line-height: 3; font-size: 16px;">{{ announcement.body }}</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <div
                        style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 1px solid gray; margin-right: 10px;">
                        <img v-if="announcement.author.picture" :src="announcement.author.picture"
                            alt="Pas de photo de profil" style="width: 100%; height: 100%; object-fit: cover;">
                        <div v-else
                            style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: 30px;">
                            👩🏽‍🦲
                        </div>
                    </div>
                    <div>
                        {{ announcement.author.firstname }} {{ announcement.author.lastname }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.carousel-item {
    width: 100%;
    height: 350px;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>






