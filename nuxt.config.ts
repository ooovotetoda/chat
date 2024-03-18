import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Yuga Chat',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: "anonymous"
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap'
        },
      ],
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devtools: { enabled: true }
})
