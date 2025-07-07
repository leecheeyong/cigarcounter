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
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          See CigarCounter in Action
        </h2>
        <p class="text-gray-600 mb-8">
          A quick look at how easy it is to track your cigarette or cigar use
          and monitor progress over time.
        </p>
        <div class="overflow-hidden rounded-xl shadow-md">
          <img
            src="/preview.webp"
            alt="CigarCounter App Demo"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
          What Happens When You Quit
        </h2>

        <div
          class="flex flex-col sm:flex-row sm:justify-between gap-6 text-left"
        >
          <div
            class="flex-1 bg-gray-50 border border-gray-200 rounded-md p-4 text-sm"
          >
            <p class="text-blue-700 font-semibold mb-1">After 20 minutes</p>
            <p class="text-gray-600">
              Heart rate and blood pressure begin to drop.
            </p>
          </div>
          <div
            class="flex-1 bg-gray-50 border border-gray-200 rounded-md p-4 text-sm"
          >
            <p class="text-blue-700 font-semibold mb-1">After 24 hours</p>
            <p class="text-gray-600">
              Carbon monoxide level in blood drops to normal.
            </p>
          </div>
          <div
            class="flex-1 bg-gray-50 border border-gray-200 rounded-md p-4 text-sm"
          >
            <p class="text-blue-700 font-semibold mb-1">2 weeks - 3 months</p>
            <p class="text-gray-600">
              Lung function improves and circulation increases.
            </p>
          </div>
          <div
            class="flex-1 bg-gray-50 border border-gray-200 rounded-md p-4 text-sm"
          >
            <p class="text-blue-700 font-semibold mb-1">After 1 year</p>
            <p class="text-gray-600">
              Risk of heart disease is halved compared to smokers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Learn More from Trusted Sources
        </h2>
        <p class="text-gray-600 text-base sm:text-lg mb-10">
          Explore global health data on tobacco use and quitting methods.
        </p>

        <div class="space-y-4 text-left">
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/tobacco"
            target="_blank"
            class="block border border-gray-200 rounded-lg px-5 py-4 hover:bg-gray-50 transition"
          >
            <h3 class="text-base font-semibold text-gray-800">
              World Health Organization (WHO)
            </h3>
            <p class="text-sm text-gray-600">
              Global tobacco use stats: 7+ million deaths per year, including
              1.6 million from secondhand smoke.
            </p>
          </a>

          <a
            href="https://www.cdc.gov/tobacco/index.html"
            target="_blank"
            class="block border border-gray-200 rounded-lg px-5 py-4 hover:bg-gray-50 transition"
          >
            <h3 class="text-base font-semibold text-gray-800">
              Centers for Disease Control and Prevention (CDC)
            </h3>
            <p class="text-sm text-gray-600">
              Tobacco is the leading cause of preventable disease & 480,000
              deaths/year in the U.S.
            </p>
          </a>

          <a
            href="https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco"
            target="_blank"
            class="block border border-gray-200 rounded-lg px-5 py-4 hover:bg-gray-50 transition"
          >
            <h3 class="text-base font-semibold text-gray-800">
              National Cancer Institute (NCI)
            </h3>
            <p class="text-sm text-gray-600">
              Science-backed insights on tobacco's role in cancer.
            </p>
          </a>

          <a
            href="https://tobaccoatlas.org/"
            target="_blank"
            class="block border border-gray-200 rounded-lg px-5 py-4 hover:bg-gray-50 transition"
          >
            <h3 class="text-base font-semibold text-gray-800">Tobacco Atlas</h3>
            <p class="text-sm text-gray-600">
              Interactive global data covering tobacco use, costs, and policies.
            </p>
          </a>
        </div>
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
