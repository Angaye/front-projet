<template>
  <div>
    <Navbar />
    <LoginModal />
    <RegisterModal />

    <div class="container py-5">
      <h1 class="mb-4">
        👤 Mon Profil
      </h1>

      <div class="card p-4 shadow">
        <div class="mb-3">
          <label class="form-label">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            disabled
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            Nouveau mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            class="form-control"
          />
        </div>

        <button
          class="btn btn-primary"
          @click="updateProfile"
        >
          💾 Mettre à jour
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Navbar from "../components/Navbar.vue";
import LoginModal from "../components/LoginModal.vue";
import RegisterModal from "../components/RegisterModal.vue";

const username = ref("");
const email = ref("");
const password = ref("");

const loadProfile = () => {
  username.value =
    localStorage.getItem("username") || "";

  email.value =
    localStorage.getItem("email") || "";
};

const updateProfile = () => {
  localStorage.setItem(
    "email",
    email.value
  );

  alert("Profil mis à jour ✅");
};

onMounted(() => {
  loadProfile();
});
</script>