<script setup lang="ts">
</script>

<template>
    <div class="barner">
        <div class="barner_title">
            <h2> RETROUVEZ LES MEILLEURES ANNONCES PAR ICI </h2>
        </div>
    </div>
</template>

<style scoped>
:root {
    --navbar-bg-color: #FF0019;
    --logo-bg-color: #fff;
    --blue-color: #2470A0;
    --other-blue :#1B62C6;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    font-weight: normal;
}
.barner {
    text-align: center;
    background: #3C3C3C;
    padding: 5px 5px;
 
}

.barner_title {
    opacity: 0;
    transform: translateY(1em);
    animation: fadeInLetter 5s ease-out forwards;
}

@keyframes fadeInLetter {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.barner_title h2 {
  
    position: relative;
    font-size: 45px;
    color: var(--logo-bg-color);
    font-weight: bolder;
    letter-spacing: 3px;
    white-space: nowrap;

}


</style>