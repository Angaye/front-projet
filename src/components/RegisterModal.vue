<template>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-light border border-secondary">

        <div class="modal-header border-secondary">
          <h5 class="modal-title">
            Inscription
          </h5>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">

          <form @submit.prevent="handleRegister">

            <div class="mb-3">
              <label class="form-label">
                Nom complet
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
                Email
              </label>

              <input
                v-model="email"
                type="email"
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
              S'inscrire
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { registerUser } from "../services/auth";

const username = ref("");
const email = ref("");
const password = ref("");

const handleRegister = async () => {
  try {
    await registerUser({
      username: username.value,
      email: email.value,
      password: password.value
    });

    alert("Inscription réussie 🎉");

    window.location.reload();

  } catch (error) {
    alert(
      error.response?.data?.detail ||
      "Erreur inscription"
    );
  }
};
</script>