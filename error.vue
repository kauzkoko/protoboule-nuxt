<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 2000)
})
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>Redirecting to home page in 2 seconds...</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
