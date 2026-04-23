<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-light border border-secondary">

        <div class="modal-header border-secondary">
          <h5 class="modal-title">
            Connexion
          </h5>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">

          <form @submit.prevent="handleLogin">

            <div class="mb-3">
              <label class="form-label">
                Nom d'utilisateur
              </label>

              <input
                v-model="username"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">
                Mot de passe
              </label>

              <input
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
            >
              Se connecter
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loginUser } from "../services/auth";

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await loginUser({
      username: username.value,
      password: password.value
    });

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    localStorage.setItem(
      "username",
      username.value
    );

    alert("Connexion réussie 🎉");

    window.location.reload();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.detail ||
      "Erreur de connexion"
    );
  }
};
</script>