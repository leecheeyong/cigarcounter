<script setup lang="ts">
import { computed } from 'vue'
import { useCigars } from '../composables/useCigars'
import { ExclamationTriangleIcon, HeartIcon } from '@heroicons/vue/24/outline'

const { stats } = useCigars()

const healthFacts = [
  "Cigars contain the same toxic and carcinogenic compounds found in cigarettes.",
  "One large cigar can contain as much tobacco as an entire pack of cigarettes.",
  "Cigar smoking increases the risk of cancers of the mouth, throat, esophagus, and lungs.",
  "Even without inhaling, cigar smokers are at increased risk for heart disease and stroke.",
  "The larger the cigar, the greater the health risk.",
  "There is no safe level of cigar smoking.",
  "Quitting at any age provides immediate and long-term health benefits."
]

const todaysFact = computed(() => {
  const today = new Date().getDate()
  return healthFacts[today % healthFacts.length]
})

const alertLevel = computed(() => {
  const today = stats.value.today
  const thisWeek = stats.value.thisWeek
  
  if (today >= 3) return 'severe'
  if (today >= 2 || thisWeek >= 10) return 'warning'
  if (today >= 1 || thisWeek >= 5) return 'caution'
  return 'info'
})

const alertConfig = computed(() => {
  switch (alertLevel.value) {
    case 'severe':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'text-red-500',
        title: 'High Risk Day',
        message: 'You\'ve smoked 3+ cigars today. Consider taking a break for your health.'
      }
    case 'warning':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        icon: 'text-amber-500',
        title: 'Moderate Risk',
        message: 'Your consumption is above recommended levels. Consider reducing gradually.'
      }
    case 'caution':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-500',
        title: 'Mindful Consumption',
        message: 'Track your patterns and consider setting reduction goals.'
      }
    default:
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-500',
        title: 'Health Reminder',
        message: 'Every choice matters for your long-term health and wellbeing.'
      }
  }
})
</script>

<template>
  <div :class="[
    'rounded-lg p-6 border',
    alertConfig.bg,
    alertConfig.border
  ]">
    <div class="flex items-start gap-4">
      <div :class="['p-2 rounded-full', alertConfig.icon]">
        <ExclamationTriangleIcon v-if="alertLevel === 'severe' || alertLevel === 'warning'" class="h-6 w-6" />
        <HeartIcon v-else class="h-6 w-6" />
      </div>
      
      <div class="flex-1">
        <h3 :class="['font-semibold mb-2', alertConfig.text]">
          {{ alertConfig.title }}
        </h3>
        
        <p :class="['mb-4', alertConfig.text]">
          {{ alertConfig.message }}
        </p>
        
        <div :class="['border-t pt-4', alertConfig.border]">
          <p :class="['text-sm font-medium mb-2', alertConfig.text]">
            💡 Health Fact of the Day
          </p>
          <p :class="['text-sm', alertConfig.text]">
            {{ todaysFact }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>