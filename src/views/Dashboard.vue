<script setup>
import { onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCigars } from "../composables/useCigars";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { logout, user, isAuthenticated } = useAuth();
const { loadCigars, addCigar, cigars, stats, loading, error } = useCigars();

const healthFacts = [
  "Cigarettes contain over 7,000 chemicals, many of which are toxic and at least 70 are known to cause cancer.",
  "Smoking cigarettes damages nearly every organ in the body, including the heart and lungs.",
  "Cigarette smoking is the leading cause of preventable disease, disability, and death.",
  "Secondhand smoke from cigarettes can cause serious health problems in non-smokers, including children and pets.",
  "Smoking just a few cigarettes a day increases the risk of heart disease and stroke.",
  "Cigarettes can cause chronic obstructive pulmonary disease (COPD), which includes chronic bronchitis and emphysema.",
  "Nicotine in cigarettes is highly addictive and can alter brain development in teens and young adults.",
  "Smoking weakens the immune system, making the body less able to fight off infections.",
  "Quitting smoking greatly reduces the risk of developing smoking-related diseases and improves overall health, regardless of age.",
];

let unsubscribe;

watch(
  isAuthenticated,
  (authenticated) => {
    if (!authenticated) {
      router.push("/auth");
    }
  },
  { immediate: true },
);

watch(
  user,
  (currentUser) => {
    if (currentUser) {
      console.log("User authenticated, loading cigars...");
      unsubscribe = loadCigars();
    } else {
      console.log("User not authenticated");
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
      }
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const handleLogout = async () => {
  await logout();
  router.push("/");
};

import { ref } from "vue";
const showForm = ref(false);
const notes = ref("");
const rating = ref(0);
const cost = ref(0);
const formError = ref("");

const resetForm = () => {
  notes.value = "";
  rating.value = 0;
  cost.value = 0;
  formError.value = "";
};

const handleSubmit = async () => {
  const result = await addCigar({
    notes: notes.value || undefined,
    rating: rating.value || undefined,
    cost: cost.value || undefined,
  });

  if (result.success) {
    resetForm();
    showForm.value = false;
  } else {
    formError.value = result.error;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown date";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getRatingStars = (rating) => {
  if (!rating) return "";
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-blue-900 inline-flex">
            <img
              src="/logo.png"
              alt="CigarCounter Logo"
              class="h-10 w-10 mr-1"
            /><span class="pt-1">CigarCounter</span>
          </h1>
          <button @click="handleLogout" class="btn btn-secondary text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p class="text-red-700">{{ error }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="card text-center">
            <p class="text-2xl font-bold text-blue-600">{{ stats.today }}</p>
            <p class="text-sm text-gray-600">Today</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-gray-600">{{ stats.thisWeek }}</p>
            <p class="text-sm text-gray-600">This Week</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-amber-600">
              ${{ stats.totalCost.toFixed(2) }}
            </p>
            <p class="text-sm text-gray-600">Total Cost</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-red-600">
              {{ Math.round((stats.total * 11) / 60) }}
            </p>
            <p class="text-sm text-gray-600">Hours Lost</p>
          </div>
        </div>

        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-800 text-sm">
            <strong>Health Reminder:</strong>
            {{ healthFacts[Math.floor(Math.random() * healthFacts.length)] }}
            You've logged {{ stats.total }} cigarettes ({{
              Math.round(stats.total * 11)
            }}
            minutes lost).
          </p>
        </div>

        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Log a Smoke</h2>
            <button @click="showForm = !showForm" class="btn btn-primary">
              {{ showForm ? "Cancel" : "Add Cigarettes" }}
            </button>
          </div>

          <form
            v-if="showForm"
            @submit.prevent="handleSubmit"
            class="space-y-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Rating (1-5)</label
                >
                <input
                  v-model.number="rating"
                  type="number"
                  min="1"
                  max="5"
                  class="input"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Cost ($)</label
                >
                <input
                  v-model.number="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  class="input"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >What triggered this craving ?</label
              >
              <textarea
                v-model="notes"
                rows="2"
                class="input"
                placeholder="Any thoughts..."
              ></textarea>
            </div>

            <div
              v-if="formError"
              class="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p class="text-red-700 text-sm">{{ formError }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              {{ loading ? "Adding..." : "Create Log" }}
            </button>
          </form>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-4">
            Recent Cigarettes ({{ cigars.length }} total)
          </h2>

          <div
            v-if="cigars.length === 0"
            class="text-center py-8 text-gray-500"
          >
            <p>No cigarettes logged yet.</p>
            <p class="text-sm mt-2">Start tracking your consumption above.</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="cigar in cigars.slice(0, 10)"
              :key="cigar.id"
              class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span v-if="cigar.rating" class="text-sm text-yellow-500">
                      {{ getRatingStars(cigar.rating) }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-600 mb-1">
                    {{ formatDate(cigar.smokedAt) }}
                  </p>

                  <div v-if="cigar.notes" class="text-sm text-gray-700 mb-2">
                    {{ cigar.notes }}
                  </div>

                  <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span v-if="cigar.cost"
                      >Cost: ${{ cigar.cost.toFixed(2) }}</span
                    >
                    <span class="text-red-600">-11 minutes of life</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="cigars.length > 10"
              class="text-center pt-4 text-sm text-gray-500"
            >
              Showing recent 10 of {{ cigars.length }} cigarettes
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <footer class="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-gray-400 text-sm">
        Made with ❤️ by
        <a
          class="underline decoration-sky-500"
          href="https://github.com/leecheeyong"
          >Chee Yong Lee</a
        >, Promoting health awareness through tracking.<br />
        Open source on
        <a
          class="underline decoration-sky-500"
          href="https://github.com/leecheeyong/cigarcounter"
          target="_blank"
          >Github</a
        >
        under the terms of the
        <a
          class="underline decoration-sky-500"
          href="https://github.com/leecheeyong/cigarcounter/blob/main/LICENSE"
          target="_blank"
          >MIT License</a
        >.
      </p>
    </div>
  </footer>
</template>
