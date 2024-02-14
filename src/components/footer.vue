<script setup lang="ts">
</script>

<template>
    <div>
        <div style="margin-top: 30px; margin-left: -10px;">
            <div class="card bg-white mx-5">
                <div class="row mb-4" style="justify-content: space-between;">
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <div class="footer-text pull-left">
                            <div class="d-flex">
                                <h2 class="" style="color:#FF0019; font-weight: bold;">TOP
                                    <span style="color: #1B62C6; font-weight: bold;">annonces</span>
                                 </h2>
                            </div>
                            <p class="card-text" style="text-align: justify; color: gray;">
                                <strong>Top annonces</strong> est un site d'annonce, une plateforme en ligne qui permet de
                                vendre, acheter des produits, services ou de publier n'importe quel type d'annonces.
                            </p>
                            <div class="social mt-2 mb-3"> <i class="fa fa-facebook-official fa-lg"></i> <i
                                    class="fa fa-instagram fa-lg"></i> <i class="fa fa-twitter fa-lg"></i> <i
                                    class="fa fa-linkedin-square fa-lg"></i> <i class="fa fa-facebook"></i> </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2"></div>
                    <div class="col-md-2 col-sm-2 col-xs-2">
                        <h5 class="heading">Catégories</h5>
                        <ul>
                            <li>Mode</li>
                            <li>Informatique</li>
                            <li>Immobilière</li>
                            <li>Electroménager</li>
                        </ul>
                    </div>

                    <div class="col-md-2 col-sm-2 col-xs-2">
                        <h5 class="heading">Company</h5>
                        <ul class="card-text">
                            <li>A propos de nous</li>
                            <li>Annonces</li>
                            <li>Contact : +229 96787423</li>
                            <li>Nous joindre : lumenahle@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div class="divider mb-4"> </div>
                <div class="row" style="font-size:10px;">
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="pull-left">
                            <p><i class="fa fa-copyright"></i> 2024 TOP annonces</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="pull-right mr-4 d-flex policy">
                            <div>Terms of Use</div>
                            <div>Privacy Policy</div>
                            <div>Cookie Policy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>



ul {
    list-style-type: none;
    margin: 0;
    padding: 0
}

ul>li {
    padding: 4px;
    color: gray;
}

ul>li:hover {
    color: #1B62C6;
    cursor: pointer
}

hr {
    border-width: 3px
}

.card {
    padding: 2% 7%
}

.social>i {
    padding: 1%;
    font-size: 15px
}

.social>i:hover {
    color: #957bda;
    cursor: pointer
}

.policy>div {
    padding: 4px
}

.heading {
    font-family: 'Titillium Web', sans-serif;
    color: black
}

.divider {
    border-top: 2px solid
}
</style>