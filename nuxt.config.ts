// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@tresjs/nuxt',
    '@unocss/nuxt',
    '@nuxt/scripts',
  ],
  tres: {
    devtools: true,
  },
  tres: {
    glsl: true,
  },
  app: {
    router: {
      prefetchLinks: false,
    },
  },
})