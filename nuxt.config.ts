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
          href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Open+Sans:wght@400;700&display=swap'
        },
        // Preload critical above-the-fold & Section 2 assets for silky, lag-free first scroll
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/571277216_1401349858664077_4926377004531498903_n-20251030040733-2xnh6.jpg' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s750x1050/6322a62f2dad980013bb5005/_0018_8-20251020184602-8lroq.png' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s650x650/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0025_9-20251010160529-oa95t.png' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s600x650/6322a62f2dad980013bb5005/_0017_9-20251020184704-zyurf.png' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s650x550/6322a62f2dad980013bb5005/thiep-thanh-dat-element_0021_13-20251010160528-wcnlv.png' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s450x450/6322a62f2dad980013bb5005/rectangle-12-20251020185718-nzua9.png' },
        { rel: 'preload', as: 'image', href: 'https://w.ladicdn.com/s400x450/6322a62f2dad980013bb5005/571777292_1401349608664102_6343894689797935376_n-20251030041113-1ztpv.jpg' }
      ]
    }
  }
})
