<template>
  <nav class="navbar navbar-dark bg-black px-4 py-3">
    <router-link
  to="/"
  class="navbar-brand fw-bold text-white text-decoration-none"
>
  🎬 Series Discovery
</router-link>

    <form
      class="d-flex mx-auto"
      @submit.prevent="handleSearch"
      style="max-width: 450px; width: 100%;"
    >
      <input
        v-model="searchQuery"
        type="text"
        class="form-control rounded-pill me-2"
        placeholder="Rechercher une série..."
      />

      <button
        class="btn btn-primary rounded-pill px-4"
        type="submit"
      >
        🔍
      </button>
    </form>

    <div class="d-flex align-items-center gap-3">
      <span
        v-if="username"
        class="text-info fw-bold"
      >
        Bienvenue {{ username }}
      </span>

      <button
        v-if="!username"
        class="btn btn-outline-light"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Connexion
      </button>

      <button
        v-if="!username"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#registerModal"
      >
        Inscription
      </button>
   <router-link
  v-if="username"
  to="/profile"
  class="btn btn-outline-info"
>
  👤 Profil
</router-link>
      <button
        v-if="username"
        class="btn btn-danger"
        @click="logout"
      >
        Déconnexion
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const searchQuery = ref("");

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.reload();
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;

  router.push({
    path: "/search",
    query: {
      q: searchQuery.value
    }
  });
};

onMounted(() => {
  username.value =
    localStorage.getItem("username") || "";
});
</script>