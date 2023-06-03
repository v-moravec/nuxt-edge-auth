// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET
  },
  nitro: {
    rollupConfig: {
      external: ['ws']
    }
  },
  build: {
    transpile: ['pg'],
  }
})
