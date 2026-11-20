import { ref, watch, toValue, onMounted, onUnmounted, type MaybeRefOrGetter } from 'vue'

export function useCountdown(targetDate: MaybeRefOrGetter<string>) {
  const days = ref('00')
  const hours = ref('00')
  const minutes = ref('00')
  const seconds = ref('00')
  const isFinished = ref(false)

  let timerId: any = null

  const calculate = () => {
    const targetDateStr = toValue(targetDate)
    const target = new Date(targetDateStr).getTime()
    const now = Date.now()
    const diff = target - now

    if (diff <= 0) {
      days.value = '00'
      hours.value = '00'
      minutes.value = '00'
      seconds.value = '00'
      isFinished.value = true
      return
    }

    isFinished.value = false
    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    days.value = d < 10 ? `0${d}` : `${d}`
    hours.value = h < 10 ? `0${h}` : `${h}`
    minutes.value = m < 10 ? `0${m}` : `${m}`
    seconds.value = s < 10 ? `0${s}` : `${s}`
  }

  onMounted(() => {
    calculate()
    timerId = setInterval(calculate, 1000)
  })

  watch(() => toValue(targetDate), () => {
    calculate()
  })

  onUnmounted(() => {
    if (timerId) clearInterval(timerId)
  })

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished
  }
}
