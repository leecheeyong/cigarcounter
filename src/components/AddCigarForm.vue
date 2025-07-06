<script setup lang="ts">
import { ref } from 'vue'
import { useCigars } from '../composables/useCigars'
import { PlusIcon } from '@heroicons/vue/24/outline'

const { addCigar, loading } = useCigars()

const showForm = ref(false)
const brand = ref('')
const type = ref('')
const notes = ref('')
const rating = ref(0)
const cost = ref(0)
const error = ref('')

const resetForm = () => {
  brand.value = ''
  type.value = ''
  notes.value = ''
  rating.value = 0
  cost.value = 0
  error.value = ''
}

const handleSubmit = async () => {
  if (!brand.value || !type.value) {
    error.value = 'Brand and type are required'
    return
  }
  
  const result = await addCigar({
    brand: brand.value,
    type: type.value,
    notes: notes.value || undefined,
    rating: rating.value || undefined,
    cost: cost.value || undefined
  })
  
  if (result.success) {
    resetForm()
    showForm.value = false
  } else {
    error.value = result.error
  }
}

const cigarTypes = [
  'Robusto',
  'Corona',
  'Churchill',
  'Toro',
  'Torpedo',
  'Petit Corona',
  'Belicoso',
  'Lancero',
  'Panatela',
  'Other'
]
</script>

<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Log a Cigar</h2>
      <button
        @click="showForm = !showForm"
        class="btn btn-primary flex items-center gap-2"
      >
        <PlusIcon class="h-4 w-4" />
        Add Cigar
      </button>
    </div>
    
    <div v-if="showForm" class="space-y-4 animate-slide-up">
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <p class="text-amber-800 text-sm">
          <strong>Remember:</strong> Each cigar you smoke reduces your life expectancy by approximately 11 minutes.
          Consider if this moment is worth the health cost.
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">
              Brand *
            </label>
            <input
              id="brand"
              v-model="brand"
              type="text"
              required
              class="input"
              placeholder="e.g., Cohiba, Montecristo"
            />
          </div>
          
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
              Type *
            </label>
            <select
              id="type"
              v-model="type"
              required
              class="input"
            >
              <option value="">Select type</option>
              <option v-for="cigarType in cigarTypes" :key="cigarType" :value="cigarType">
                {{ cigarType }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">
              Rating (1-5)
            </label>
            <input
              id="rating"
              v-model.number="rating"
              type="number"
              min="1"
              max="5"
              class="input"
              placeholder="Rate your experience"
            />
          </div>
          
          <div>
            <label for="cost" class="block text-sm font-medium text-gray-700 mb-1">
              Cost ($)
            </label>
            <input
              id="cost"
              v-model.number="cost"
              type="number"
              min="0"
              step="0.01"
              class="input"
              placeholder="Price paid"
            />
          </div>
        </div>
        
        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            v-model="notes"
            rows="3"
            class="input"
            placeholder="Any thoughts or observations..."
          />
        </div>
        
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>
        
        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary flex-1"
          >
            {{ loading ? 'Adding...' : 'Add Cigar' }}
          </button>
          <button
            type="button"
            @click="showForm = false"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>