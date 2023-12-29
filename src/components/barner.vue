<script setup lang="ts">
</script>

<template>
    <div class="barner">
        <div class="barner_title">
           <h2>Retrouvez les meilleurs annonces par ICI...</h2> 
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
.barner_title h2 {
   
    text-shadow: var(--blue-color) 4px 4px 4px;
    position: relative;
    font-size: 45px;
    color: var(--logo-bg-color);
    font-weight: bolder;
    letter-spacing: 3px;
    white-space: nowrap;
    overflow: hidden;
    animation: scrollLeft 70s linear infinite; 
}

@keyframes scrollLeft {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}

</style>