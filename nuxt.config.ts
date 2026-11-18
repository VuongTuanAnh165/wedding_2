// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: [
    '~/assets/css/ladi-template.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'vi'
      },
      title: 'Xuân Thành & Thu Trang Mới',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=420, user-scalable=no, initial-scale=1.0' },
        { name: 'description', content: 'Xuân Thành & Thu Trang Mới' },
        { property: 'og:title', content: 'Xuân Thành & Thu Trang Mới' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://static.ladipage.net/6322a62f2dad980013bb5005/571372648_1401349385330791_7634124945013556421_n-20251031104042-8uzz1.jpg' },
        { property: 'og:description', content: 'Xuân Thành & Thu Trang Mới' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://w.ladicdn.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'
        }
      ]
    }
  }
})
