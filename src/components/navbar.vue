<script setup lang="ts">
import { ref, onMounted } from "vue"
import iconUser from "../components/icons/user.vue";
import { RouterLink, useRouter } from 'vue-router';
import clientHttp from "@/libs/clientHttp";

const router = useRouter();

const remove = ref(false);
const disconnect = ref(false)

const token = JSON.parse(localStorage.getItem("token")!);

const logout = async () => {
    try {
       
        const response = await clientHttp.post("http://localhost:8000/api/user/logout", null, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log("message de déconnexion :", response.data);
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("roles")
        router.replace("/login")

    } catch (err) {
        console.error("Erreur lors de la déconnexion de l'utilisateur", err);
    }
};

onMounted(() => {
    if (token) {
        remove.value = true;
        disconnect.value = false
    }
    else{
        remove.value = false
        disconnect.value = true
    }


    
})






</script>

<template>
    <div>
        <nav>
            <div class="logo">
                <a href="/" translate="no" class="logo_announce">
                    TOP <span id="logo_announce">annonces</span>
                </a>
            </div>
            <div class="nav_links">
                <div class="nav_links_search">
                    <form action="">
                        <input type="search" name="" id="" class="search" placeholder="Que recherchez-vous ?">
                    </form>
                </div>
                <div class="add_announce">

                    <RouterLink :to="`/announcement`" class="send_annonce">
                       <!--  <span id="plus">+</span> <span>Déposer une annonce</span> -->
                       <span>Accéder aux annonces</span>
                       
                    </RouterLink>
                </div>
                <div>

                </div>


                <div class="user">
                    <div class="user_icon">
                        <ul class="icon_list">
                            <li class="icon_item">
                                <RouterLink :to="`#`" class="icon_link">
                                    <div
                                        style="  width: 40px; height: 40px; border-radius: 50%; border: 2px solid #000; display: flex; align-items: center; justify-content: center;">
                                        <iconUser />
                                        <img src="" alt="">
                                    </div>

                                </RouterLink>
                                <ul class="submenu">
                                    <li class="remove_link" v-show="!remove">
                                        <p>Pas de compte? <RouterLink :to="`/register`" class="submenu_link">S'inscrire
                                            </RouterLink>
                                        </p>
                                    </li>
                                    <li class="remove_link" v-show="!remove">
                                        <p>Déjà un compte? <RouterLink :to="`/login`" class="submenu_link">Se connecter
                                            </RouterLink>
                                        </p>
                                    </li>
                                    <li v-show="!disconnect">
                                        <p>
                                            <RouterLink :to="`/my_account`" class="submenu_link">Mon compte</RouterLink>
                                        </p>
                                    </li>
                                    <li v-show="!disconnect" class="">
                                        
                                        <button class="btn submenu_link"  @click="logout">Se Déconnecter</button>
                                        
                                    </li>
                                    
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    
</style>
