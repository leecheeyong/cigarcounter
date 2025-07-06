<script setup lang="ts">
import { computed } from 'vue'
import { useCigars } from '../composables/useCigars'

const { cigars } = useCigars()

const recentCigars = computed(() => cigars.value.slice(0, 10))

const formatDate = (timestamp: any) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp.toDate())
}

const getRatingStars = (rating?: number) => {
  if (!rating) return ''
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}
</script>

<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Recent Cigars</h2>
      <span class="text-sm text-gray-500">{{ cigars.length }} total</span>
    </div>
    
    <div v-if="recentCigars.length === 0" class="text-center py-8">
      <p class="text-gray-500">No cigars logged yet.</p>
      <p class="text-sm text-gray-400 mt-2">Start tracking your consumption to see insights.</p>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="cigar in recentCigars"
        :key="cigar.id"
        class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="font-medium text-gray-900">{{ cigar.brand }}</h3>
              <span class="text-sm text-gray-500">{{ cigar.type }}</span>
              <span v-if="cigar.rating" class="text-sm text-yellow-500">
                {{ getRatingStars(cigar.rating) }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 mb-2">
              {{ formatDate(cigar.smokedAt) }}
            </p>
            
            <div v-if="cigar.notes" class="text-sm text-gray-700 mb-2">
              {{ cigar.notes }}
            </div>
            
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span v-if="cigar.cost">Cost: ${{ cigar.cost.toFixed(2) }}</span>
              <span class="text-red-600">-11 minutes of life</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="cigars.length > 10" class="text-center pt-4">
        <p class="text-sm text-gray-500">
          Showing recent 10 of {{ cigars.length }} cigars
        </p>
      </div>
    </div>
  </div>
</template>