<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import barner from "@/components/barner.vue";
import my_announcesVue from "@/components/announce/my_announces.vue";
import footers from "@/components/footer.vue";


</script>

<template>
    <div>
        <div>
            <navbar/>
        </div>
        <div>
            <my_announcesVue/>
        </div>
        <div>
            <footers/>
        </div>
    </div>

</template>