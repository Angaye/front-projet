<template>
  <div>
    <Navbar />
    <LoginModal />
    <RegisterModal />

    <div
      v-if="series"
       class="container py-5"
    >
      <div class="row">

        <div class="col-md-4">
          <img
            :src="series.image?.original || fallbackImage"
            class="img-fluid rounded shadow"
            :alt="series.name"
          />
        </div>

        <div class="col-md-8">
          <h1 class="mb-3 text-dark">
  {{ series.name }}
</h1>

<p class="mb-3 text-dark">
  ⭐ Note : {{ series.rating?.average || "N/A" }}
</p>

<p class="mb-3 text-dark">
  🌍 Langue : {{ series.language || "Inconnue" }}
</p>

<p class="mb-3 text-dark">
  📺 Statut : {{ series.status || "Inconnu" }}
</p>

<button
  class="btn btn-danger mt-3 mb-4"
  @click="addToFavorites"
>
  ❤️ Ajouter aux favoris
</button>

<p class="text-dark">
  {{ cleanSummary(series.summary) }}
</p>

<hr class="my-5" />

<h3 class="mb-4">
  ⭐ Avis & Commentaires
</h3>

<div class="card p-4 shadow mb-4">
  <div class="mb-3">
    <label class="form-label">
      Note (/10)
    </label>
    <input
      v-model="reviewRating"
      type="number"
      min="1"
      max="10"
      class="form-control"
    />
  </div>

  <div class="mb-3">
    <label class="form-label">
      Commentaire
    </label>
    <textarea
      v-model="reviewComment"
      class="form-control"
      rows="4"
    ></textarea>
  </div>

  <button
    class="btn btn-primary"
    @click="submitReview"
  >
    Publier mon avis
  </button>
</div>

<div
  v-for="review in reviews"
  :key="review.id"
  class="card p-3 mb-3 shadow-sm"
>
  <h5>
    ⭐ {{ review.rating }}/10
  </h5>

  <p class="mb-2">
    {{ review.comment }}
  </p>

  <small class="text-muted d-block mb-3">
    par {{ review.username }}
  </small>

  <div
    v-if="review.username === currentUser"
    class="d-flex gap-2"
  >
    <button
      class="btn btn-sm btn-warning"
      @click="editReview(review)"
    >
      ✏️ Modifier
    </button>

    <button
      class="btn btn-sm btn-danger"
      @click="deleteReview(review.id)"
    >
      🗑 Supprimer
    </button>
  </div>
</div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import LoginModal from "../components/LoginModal.vue";
import RegisterModal from "../components/RegisterModal.vue";

import { getSeriesDetail } from "../services/series";

const route = useRoute();
const series = ref(null);

const fallbackImage =
  "https://picsum.photos/400/600";

const cleanSummary = (html) => {
  if (!html) return "Aucun résumé disponible.";

  return html.replace(/<[^>]+>/g, "");
};

const loadSeriesDetail = async () => {
  try {
    const id = route.params.id;

    const response =
      await getSeriesDetail(id);

   console.log("DETAIL DATA:", response.data);
console.log("NAME:", response.data.name);
console.log("SHOW:", response.data.show);
console.log("DATA:", response.data.data);

    series.value =
  response.data.show ||
  response.data.data ||
  response.data;

  } catch (error) {
    console.error(error);
  }
};

const addToFavorites = () => {
  const saved =
    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  const exists = saved.find(
    item => item.id === series.value.id
  );

  if (exists) {
    alert("Déjà en favoris ❤️");
    return;
  }

  saved.push(series.value);

  localStorage.setItem(
    "favorites",
    JSON.stringify(saved)
  );

  alert("Ajouté aux favoris ❤️");
};

const reviewRating = ref("");
const reviewComment = ref("");
const reviews = ref([]);

const loadReviews = () => {
  const saved =
    JSON.parse(
      localStorage.getItem(
        `reviews_${route.params.id}`
      )
    ) || [];

  reviews.value = saved;
};

const submitReview = () => {
  if (!reviewRating.value || !reviewComment.value) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const newReview = {
    id: Date.now(),
    username:
      localStorage.getItem("username") || "Utilisateur",
    rating: reviewRating.value,
    comment: reviewComment.value
  };

  reviews.value.unshift(newReview);

  localStorage.setItem(
    `reviews_${route.params.id}`,
    JSON.stringify(reviews.value)
  );

  reviewRating.value = "";
  reviewComment.value = "";

  alert("Avis publié ⭐");
};

const currentUser = ref(
  localStorage.getItem("username") || "Utilisateur"
);

const editReview = (review) => {
  reviewRating.value = review.rating;
  reviewComment.value = review.comment;

  deleteReview(review.id);
};

const deleteReview = (id) => {
  reviews.value =
    reviews.value.filter(
      item => item.id !== id
    );

  localStorage.setItem(
    `reviews_${route.params.id}`,
    JSON.stringify(reviews.value)
  );

  alert("Avis supprimé ❌");
};

onMounted(() => {
  loadSeriesDetail();
  loadReviews();
});
</script>