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
                    <a href="" class="send_annonce">
                        <span id="plus">+</span> <span>Déposer une annonce</span>
                    </a>
                </div>

                <div class="user">
                    <div class="user_icon">
                        <ul class="icon_list">
                            <li class="icon_item">
                                <RouterLink :to="`#`" class="icon_link">
                                    <iconUser />
                                </RouterLink>
                                <ul class="submenu">
                                    <li>
                                        <p>Pas de compte? <RouterLink :to="`/register`" class="submenu_link">S'inscrire</RouterLink> </p>
                                    </li>
                                    <li>
                                        <p>Déjà un compte? <RouterLink :to="`#`" class="submenu_link">Se connecter</RouterLink> </p>

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

<style scoped></style>
