<template>
    <div class="card" :class="[isMobile ? 'horizontal' : 'vertical']" style="width: 18rem;">
        <div class="img-container position-relative">
            <img class="card-img-top rounded-top" :src="apartment.image" alt="Card image cap" />
            <div class="services">
                <i v-for="service in apartment.services" :class="'me-3 text-light bi ' + service.icon"
                    :title="service.title"></i>
                <div class="featured">Consigliato</div>
            </div>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <p class="card-text mb-1" style="
                    margin-bottom: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    ">
                {{ apartment.description }}
            </p>
            <div class="card-footer text-center mt-4">
                <p class="card-text">
                    <span class="price">€ {{ apartment.price }}</span> / notte
                </p>
                <router-link :to="'/apartment/' + apartment.id">
                    <span class="btn btn-secondary">Scopri di più</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["apartment"],
    data() {
        return {
            isMobile: false,
        };
    },
    created() {
        this.isMobile = window.innerWidth <= 767;
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.isMobile = window.innerWidth <= 767;
        },
    },
};
</script>

<style scoped>
.card-container {
    margin-top: 20px;
}

.card {
    border-radius: 10px;
    width: 100%;
    min-height: 100%;
}

.card.horizontal {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
}

.card-img-top {
    object-fit: cover;
}

.card.horizontal .card-img-top {
    width: 100%;
}

.card.horizontal .card-body {
    width: 60%;
    padding-left: 20px;
}

.card-footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

i {
    font-size: 1.5rem;
}

.services {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
}

.price {
    color: green;
    font-weight: bold;
}

.featured {
    color: white;
    text-align: center;
    border-radius: 30px 30px 0px 0px;
    background-color: silver;
}

.featured.gold {
    background-color: goldenrod;
}

.featured.silver {
    background-color: silver;
}

.featured.bronze {
    background-color: rosybrown;
}
</style>