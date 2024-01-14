<script setup lang="ts">
import iconUser from "../components/icons/user.vue";
import { RouterLink } from 'vue-router';

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
                    <!--   <a href="" class="send_annonce">
                       
                    </a> -->


                    <RouterLink :to="`/add_announce`" class="send_annonce">
                        <span id="plus">+</span> <span>Déposer une annonce</span>
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
                                    <li>
                                        <p>Pas de compte? <RouterLink :to="`/register`" class="submenu_link">S'inscrire
                                            </RouterLink>
                                        </p>
                                    </li>
                                    <li>
                                        <p>Déjà un compte? <RouterLink :to="`/login`" class="submenu_link">Se connecter
                                            </RouterLink>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <RouterLink :to="`/my_account`" class="submenu_link">Mon compte</RouterLink>
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </nav>
</div></template>

<style scoped></style>
