import { ref, onMounted } from 'vue'

export interface WishItem {
  id?: string | number
  name: string
  content: string
  createdAt?: string
  timeAgo?: string
}

export function useWishes(endpoint: string, weddingId: string) {
  const wishes = ref<WishItem[]>([
    {
      name: 'Ngô Ny',
      content: 'Chúc mừng hạnh phúc hai anh chị! Chúc hai bạn trăm năm hạnh phúc, sớm đón thiên thần nhỏ nhé!'
    },
    {
      name: 'Thu A2',
      content: 'Mừng ngày vui của hai bạn! Chúc Thành và Trang mãi mãi yêu thương, đồng hành cùng nhau trên mọi chặng đường.'
    },
    {
      name: 'Quyen Liu',
      content: 'Congrats bé Trang & anh Thành. Chúc hai bạn có một hành trình hôn nhân viên mãn và ngọt ngào!'
    },
    {
      name: 'Anh Lak',
      content: 'Chúc cô dâu luôn xinh đẹp rạng rỡ và hai em luôn thấu hiểu, sẻ chia cùng nhau.'
    },
    {
      name: 'Nguyen Hien',
      content: 'Chúc mừng bạn tôi chính thức lên xe hoa! Hạnh phúc ngập tràn nha hai vợ chồng.'
    },
    {
      name: 'Nhung Le',
      content: 'See you at the wedding! Thật vui khi được chứng kiến khoảnh khắc tuyệt vời này của hai bạn.'
    }
  ])

  const isLoading = ref(false)
  const isSubmitting = ref(false)

  const loadWishes = () => {
    if (typeof window === 'undefined') return
    isLoading.value = true

    const callbackName = 'jmii_wishes_cb_' + Date.now()
    const script = document.createElement('script')

    ;(window as any)[callbackName] = (response: any) => {
      isLoading.value = false
      if (response && response.status === 'success' && Array.isArray(response.data) && response.data.length > 0) {
        wishes.value = response.data.map((item: any) => ({
          name: item.name || item.sender || 'Khách quý',
          content: item.message || item.content || item.wish || '',
          createdAt: item.createdAt || item.date || ''
        }))
      }
      cleanup()
    }

    const cleanup = () => {
      try {
        delete (window as any)[callbackName]
      } catch (e) {
        ;(window as any)[callbackName] = null
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }

    script.onerror = () => {
      isLoading.value = false
      cleanup()
    }

    script.src = `${endpoint}?weddingId=${encodeURIComponent(weddingId)}&callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`
    document.head.appendChild(script)

    setTimeout(() => {
      if (isLoading.value) {
        isLoading.value = false
        cleanup()
      }
    }, 10000)
  }

  const addOptimisticWish = (name: string, content: string) => {
    wishes.value.unshift({
      name,
      content,
      createdAt: 'Vừa xong'
    })
  }

  onMounted(() => {
    loadWishes()
  })

  return {
    wishes,
    isLoading,
    isSubmitting,
    loadWishes,
    addOptimisticWish
  }
}
