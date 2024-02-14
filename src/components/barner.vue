<script setup lang="ts">
</script>
<template>
    <div class="banner-container">
        
        <img src="../assets/images/banner/photo-02.jpg" class="banner-image" alt="bannière">
         
        <div class="banner-content">
            <h1 class="banner-title" style="font-weight: bolder;">Annonces Exclusives</h1>
            <p class="banner-description">Bienvenue sur <span style="color: #FF0019; font-weight: bolder">TOP</span> <span style="color: #1B62C6; font-weight: bolder" >annonces</span></p>
            <p class="banner-description" >Découvrez les annonces les plus exclusives</p>
            <div style="padding: 5px 10px; background-color: black; border-radius: 5px;">Défilez vers le bas et Exploirez l'aventure</div>

        </div>
    </div>
</template>

<style scoped>
.banner-container {
    position: relative;
    height: calc(100vh - 50px); 
    overflow: hidden;
    padding: 30px;
    
}

.banner-image {
    width: 100%;
    height: 100%; 
    object-fit: cover; 
  /*   filter: blur(3px);  */
    filter: invert(20%);
    border-radius: 10px;
}

.banner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
}

.banner-title {
    font-size: 3rem;
    margin-bottom: 20px;
}

.banner-description {
    font-size: 1.5rem;
    margin-bottom: 30px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}
</style>
