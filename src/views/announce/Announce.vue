<script setup lang="ts">

import navbar from "@/components/navbar.vue";
import barner from "@/components/barner.vue";
import get_announces from "@/components/announce/get_announces.vue"
import footerpage from "@/components/footer.vue";


</script>
<template>
    <div>
        <header>
            <navbar />
        </header>
        <main>
            <div class="barner">
                <barner />
            </div>

            <div class="announcements">
                <get_announces />
            </div>
        </main>
        <footer>
            <footerpage/>
        </footer>
    </div>
</template>
<style scoped>
.btn {
    margin: 20px 120px;
}

.category_link {
    display: flex !important;
    ;
    align-items: center !important;
    justify-content: right !important;
}
</style>