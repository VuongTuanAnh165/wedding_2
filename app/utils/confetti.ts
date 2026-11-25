export function fireConfetti() {
  if (typeof window === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '999999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    document.body.removeChild(canvas)
    return
  }

  const width = (canvas.width = window.innerWidth)
  const height = (canvas.height = window.innerHeight)

  const colors = ['#C29D59', '#705628', '#E6DED3', '#F2A97F', '#E78484', '#FFFFFF']
  const piecesCount = 90

  interface Particle {
    x: number
    y: number
    w: number
    h: number
    color: string
    vx: number
    vy: number
    rotation: number
    vRot: number
    opacity: number
  }

  const particles: Particle[] = []

  for (let i = 0; i < piecesCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 160,
      y: height * 0.45 + (Math.random() - 0.5) * 80,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)] || '#c29d59',
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 5,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    })
  }

  let animationFrameId: number
  const startTime = Date.now()
  const duration = 3200 // 3.2s

  function loop() {
    const elapsed = Date.now() - startTime
    if (elapsed > duration) {
      cancelAnimationFrame(animationFrameId)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      return
    }

    ctx!.clearRect(0, 0, width, height)

    const gravity = 0.35
    const drag = 0.98

    for (const p of particles) {
      p.vy += gravity
      p.vx *= drag
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.vRot

      if (elapsed > duration - 1000) {
        p.opacity = Math.max(0, 1 - (elapsed - (duration - 1000)) / 1000)
      }

      ctx!.save()
      ctx!.translate(p.x, p.y)
      ctx!.rotate((p.rotation * Math.PI) / 180)
      ctx!.globalAlpha = p.opacity
      ctx!.fillStyle = p.color
      ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx!.restore()
    }

    animationFrameId = requestAnimationFrame(loop)
  }

  loop()
}
