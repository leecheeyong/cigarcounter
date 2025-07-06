<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, register } = useAuth()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
}

const handleSubmit = async () => {
  if (!isLogin.value && password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  loading.value = true
  error.value = ''
  
  const result = isLogin.value 
    ? await login(email.value, password.value)
    : await register(email.value, password.value)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <button
          @click="goBack"
          class="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-2"
        >
          ← Back to Home
        </button>
        <h1 class="text-4xl font-bold text-blue-900 mb-2">CigarCounter</h1>
        <p class="text-gray-600">Track your consumption, improve your health</p>
      </div>
      
      <div class="card">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <h2 class="text-2xl font-semibold text-center mb-6">
              {{ isLogin ? 'Welcome Back' : 'Create Account' }}
            </h2>
          </div>
          
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="input"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="input"
                placeholder="Enter your password"
              />
            </div>
            
            <div v-if="!isLogin">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="input"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full"
          >
            {{ loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account') }}
          </button>
          
          <div class="text-center">
            <p class="text-gray-600">
              {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
              <button
                type="button"
                @click="toggleMode"
                class="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                {{ isLogin ? 'Sign up' : 'Sign in' }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>