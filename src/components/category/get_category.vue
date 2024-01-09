<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientHttp from "@/libs/clientHttp";
import { useRouter } from 'vue-router';
const router = useRouter();

const error = ref("")
const successMessage = ref("")
const category = ref<any>();

const getCategory = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token")!);
        console.log('token_user', token);
        const response = await clientHttp.get('http://localhost:8000/api/category/getAll', {
            headers: {
                Authorization: 'Bearer ' + token!
            }
        });
        category.value = response.data.categories;
        console.log(category.value)
    }

    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        successMessage.value = '';
        error.value = "Vous n'êtes pas connecté";
    }
}

onMounted(() => {
    getCategory()
})
</script>
<template>
    <div v-for="cat in category" key:key >
        <div style="border-bottom: 2px solid gray;">
            <div>
                {{ cat.id }}
            </div>
            <div>
                {{ cat.name }}
            </div>
            <div>
                {{ cat.description }}
            </div>
        </div>


    </div>
</template>
<style scoped></style>