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
      title: 'Xuân Thành & Thu Trang',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'description', content: 'Thiệp cưới điện tử của Xuân Thành & Thu Trang' },
        { property: 'og:title', content: 'Xuân Thành & Thu Trang' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/1.webp' },
        { property: 'og:description', content: 'Thiệp cưới điện tử của Xuân Thành & Thu Trang' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://w.ladicdn.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Open+Sans:wght@400;700&display=swap'
        },
        // Preload critical above-the-fold & Section 2 assets for silky, lag-free first scroll
        { rel: 'preload', as: 'image', href: '/images/1.webp' },
        { rel: 'preload', as: 'image', href: '/images/2.webp' },
        { rel: 'preload', as: 'image', href: '/images/3.webp' },
        { rel: 'preload', as: 'image', href: '/images/4.webp' },
        { rel: 'preload', as: 'image', href: '/images/5.webp' },
        { rel: 'preload', as: 'image', href: '/images/6.webp' },
        { rel: 'preload', as: 'image', href: '/images/7.webp' }
      ]
    }
  }
})
