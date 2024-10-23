<template>
  <div>
    <p>Welcome to My Nuxt 3 App</p>
    <nav>
      <ul>
        <li v-for="page in pages" :key="page.path">
          <NuxtLink :to="page.path" no-prefetch>{{ page.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const router = useRouter()
const pages = computed(() => {
  return router.options.routes
    .filter(route => route.path !== '/' && !route.path.includes(':') && !route.path.includes('*'))
    .map(route => ({
      path: route.path,
      name: route.name
    }))
})
</script>

<style scoped>
nav {
  margin-top: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
</style>
