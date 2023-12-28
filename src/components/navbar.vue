<script setup lang="ts">
import iconUser from "../components/icons/user.vue";
</script>

<template>
    <div>
        <nav>
            <div class="logo">
                <a href="#" translate="no">
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
                    <a href="">
                        <span id="plus">+</span> <span>Déposer une annonce</span>
                    </a>
                </div>

                <div class="user">
                    <div class="user_icon">
                        <ul class="icon_list">
                            <li class="icon_item">
                                <a href="#" class="icon_link">
                                    <iconUser />
                                </a>
                                <ul class="submenu">
                                    <li>
                                        <a href="#" class="submenu_link">S'inscrire</a>
                                    </li>
                                    <li>
                                        <a href="#" class="submenu_link">Se connecter</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="hamburger" >
                    <span id="openHam">&#9776;</span>
                    <span id="closeHam">&#x2716;</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped></style>
