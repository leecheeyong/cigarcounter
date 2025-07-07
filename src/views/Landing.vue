<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const { isAuthenticated } = useAuth();

const navigateToApp = () => {
  if (isAuthenticated.value) {
    router.push("/dashboard");
  } else {
    router.push("/auth");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-blue-900 inline-flex">
            <img
              src="/logo.png"
              alt="CigarCounter Logo"
              class="h-10 w-10 mr-1"
            /><span class="pt-1">CigarCounter</span>
          </h1>
          <button
            @click="navigateToApp"
            class="btn btn-primary flex items-center gap-2"
          >
            {{ isAuthenticated ? "Dashboard" : "Get Started" }}
            <ArrowRightIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>

    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Track Your Cigarette Consumption
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Monitor your smoking habits and understand the health impact. Our app
          helps you track this impact and make informed decisions about your
          health.
        </p>
        <button
          @click="navigateToApp"
          class="btn btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 mx-auto"
        >
          Start Tracking
          <ArrowRightIcon class="h-5 w-5" />
        </button>
      </div>
    </section>

    <section class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Learn More from Trusted Sources
        </h2>
        <p class="text-gray-600 mb-4 text-base sm:text-lg">
          Reliable health organizations and research on tobacco harm:
        </p>
        <ul class="text-blue-700 underline space-y-2 text-sm sm:text-base">
          <li>
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/tobacco"
              target="_blank"
              >🌐 WHO: Global Tobacco Facts</a
            >
          </li>
          <li>
            <a
              href="https://www.cdc.gov/tobacco/data_statistics/fact_sheets/index.htm"
              target="_blank"
              >📊 CDC: Smoking & Tobacco Data</a
            >
          </li>
          <li>
            <a
              href="https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco"
              target="_blank"
              >🎗️ National Cancer Institute: Smoking Risks</a
            >
          </li>
          <li>
            <a href="https://tobaccoatlas.org/" target="_blank"
              >📚 Tobacco Atlas: Worldwide Impact</a
            >
          </li>
        </ul>
      </div>
    </section>

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
  </div>
</template>
