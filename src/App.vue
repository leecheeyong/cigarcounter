<script setup>
import { RouterView } from "vue-router";
import { useAuth } from "./composables/useAuth";

const { loading } = useAuth();
</script>

<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  <RouterView v-else />
</template>
