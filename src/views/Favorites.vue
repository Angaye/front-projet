<template>
  <div>
    <Navbar />
    <LoginModal />
    <RegisterModal />

    <div class="container py-5">
      <h1 class="mb-4">
        ❤️ Mes Favoris
      </h1>

      <div
        v-if="favorites.length === 0"
        class="text-muted"
      >
        Aucun favori pour le moment.
      </div>

      <div class="row">
        <div
  v-for="series in favorites"
  :key="series.id"
  class="col-md-3 mb-4"
>
  <SeriesCard :series="series" />

  <button
    class="btn btn-outline-danger w-100 mt-2"
    @click="removeFavorite(series.id)"
  >
    🗑 Retirer
  </button>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Navbar from "../components/Navbar.vue";
import LoginModal from "../components/LoginModal.vue";
import RegisterModal from "../components/RegisterModal.vue";
import SeriesCard from "../components/SeriesCard.vue";

const favorites = ref([]);

const loadFavorites = () => {
  const saved =
    localStorage.getItem("favorites");

  favorites.value = saved
    ? JSON.parse(saved)
    : [];
};

const removeFavorite = (id) => {
  favorites.value =
    favorites.value.filter(
      item => item.id !== id
    );

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites.value)
  );

  alert("Favori supprimé ❌");
};

onMounted(() => {
  loadFavorites();
});
</script>