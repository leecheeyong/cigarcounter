<script setup lang="ts">
import { computed } from 'vue'
import { useCigars } from '../composables/useCigars'
import { 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const { stats } = useCigars()

const healthImpact = computed(() => {
  const totalCigars = stats.value.total
  const estimatedMinutesLost = totalCigars * 11 // Average minutes of life lost per cigar
  const hoursLost = Math.round(estimatedMinutesLost / 60)
  const daysLost = Math.round(hoursLost / 24)
  
  return {
    minutesLost: estimatedMinutesLost,
    hoursLost,
    daysLost
  }
})

const weeklyTrend = computed(() => {
  const weeklyAvg = stats.value.thisWeek / 7
  const dailyToday = stats.value.today
  
  if (dailyToday > weeklyAvg) {
    return { trend: 'up', message: 'Above weekly average' }
  } else if (dailyToday < weeklyAvg) {
    return { trend: 'down', message: 'Below weekly average' }
  } else {
    return { trend: 'stable', message: 'On track with weekly average' }
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Today's Count -->
    <div class="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-500 text-white">
          <CalendarDaysIcon class="h-6 w-6" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-blue-600">Today</p>
          <p class="text-2xl font-bold text-blue-900">{{ stats.today }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-blue-600">{{ weeklyTrend.message }}</p>
      </div>
    </div>

    <!-- This Week -->
    <div class="card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-gray-500 text-white">
          <ChartBarIcon class="h-6 w-6" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">This Week</p>
          <p class="text-2xl font-bold text-gray-900">{{ stats.thisWeek }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600">{{ Math.round(stats.thisWeek / 7 * 10) / 10 }} per day average</p>
      </div>
    </div>

    <!-- Total Cost -->
    <div class="card bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-amber-500 text-white">
          <CurrencyDollarIcon class="h-6 w-6" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-amber-600">Total Spent</p>
          <p class="text-2xl font-bold text-amber-900">${{ stats.totalCost.toFixed(2) }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-amber-600">{{ stats.total }} cigars total</p>
      </div>
    </div>

    <!-- Health Impact -->
    <div class="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-red-500 text-white">
          <ExclamationTriangleIcon class="h-6 w-6" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-red-600">Health Impact</p>
          <p class="text-2xl font-bold text-red-900">{{ healthImpact.daysLost }}</p>
          <p class="text-xs text-red-600">days estimated</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-sm text-red-600">{{ healthImpact.hoursLost }} hours lost</p>
      </div>
    </div>
  </div>
</template>