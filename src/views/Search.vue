<template>
  <div>
    <Navbar />
    <LoginModal />
    <RegisterModal />

    <div class="container py-5 text-white">
      <h1 class="mb-4">
        Résultats de recherche 🔍
      </h1>

     <div class="row">
        <SeriesCard
          v-for="item in searchResults"
          :key="item.show?.id || item.id"
          :series="item.show || item"
         />
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import LoginModal from "../components/LoginModal.vue";
import RegisterModal from "../components/RegisterModal.vue";
import SeriesCard from "../components/SeriesCard.vue";

import { searchSeries } from "../services/series";

const route = useRoute();
const searchResults = ref([]);

const loadSearchResults = async () => {
  try {
    const query = route.query.q;

    if (!query) return;

    const response = await searchSeries(query);

    console.log(response.data);

    searchResults.value = Array.isArray(response.data)
      ? response.data
      : response.data.results ||
        response.data.data ||
        [];

  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadSearchResults();
});

watch(
  () => route.query.q,
  () => {
    loadSearchResults();
  }
);
</script>