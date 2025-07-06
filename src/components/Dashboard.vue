<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCigars } from '../composables/useCigars'
import { useAuth } from '../composables/useAuth'
import AddCigarForm from './AddCigarForm.vue'
import StatsCard from './StatsCard.vue'
import CigarList from './CigarList.vue'
import HealthAlert from './HealthAlert.vue'

const { logout } = useAuth()
const { loadCigars } = useCigars()

let unsubscribe: (() => void) | undefined

onMounted(() => {
  unsubscribe = loadCigars()
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary-900">CigarCounter</h1>
          </div>
          <button
            @click="handleLogout"
            class="btn btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <!-- Health Alert -->
        <HealthAlert />
        
        <!-- Stats Overview -->
        <StatsCard />
        
        <!-- Add Cigar Form -->
        <AddCigarForm />
        
        <!-- Recent Cigars -->
        <CigarList />
      </div>
    </main>
  </div>
</template>