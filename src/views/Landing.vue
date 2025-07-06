<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { isAuthenticated } = useAuth()

const navigateToApp = () => {
  if (isAuthenticated.value) {
    router.push('/dashboard')
  } else {
    router.push('/auth')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-blue-900">CigarCounter</h1>
          <button
            @click="navigateToApp"
            class="btn btn-primary flex items-center gap-2"
          >
            {{ isAuthenticated ? 'Dashboard' : 'Get Started' }}
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
          Monitor your smoking habits and understand the health impact. 
          Each cigar reduces life expectancy by approximately 11 minutes.
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
      <div class="max-w-2xl mx-auto">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold text-red-900 mb-3">
            Health Impact Awareness
          </h3>
          <p class="text-red-800">
            Studies show that each cigar smoked reduces life expectancy by an average of 11 minutes. 
            Our app helps you track this impact and make informed decisions about your health.
          </p>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-gray-400">
          Made with ❤️ by Chee Yong Lee, Promoting health awareness through tracking.
        </p>
      </div>
    </footer>
  </div>
</template>