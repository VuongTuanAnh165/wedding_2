export interface WishItem {
    id: string
    name: string
    message: string
    attending?: string
    guestCount?: string
    side?: string
    createdAt: string
}

// Google Apps Script Web App URL kết nối trực tiếp với Google Sheet của bạn
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxttwY2SD9BgiYW9SqA7GbuMb-QQjCUZjOCFnOgWUml-1Tvi4UdZ-5dThgYYxrgPsHqvQ/exec'

// Bộ nhớ tạm trong phiên làm việc
let wishesCache: WishItem[] = []

// Đọc danh sách lời chúc từ Google Sheet
async function getWishesFromGoogleSheet(): Promise<WishItem[]> {
    try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 6000)

        const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'GET',
            redirect: 'follow',
            signal: controller.signal
        })
        clearTimeout(timeout)

        if (res.ok) {
            const data = await res.json()
            if (data && data.success && Array.isArray(data.wishes)) {
                wishesCache = data.wishes
                return wishesCache
            }
        }
    } catch (err) {
        console.warn('Lỗi đọc từ Google Sheet:', err)
    }
    return wishesCache
}

// Gửi lời chúc mới tự động ghi 1 dòng vào Google Sheet
async function sendWishToGoogleSheet(data: { name: string; message: string; attending?: string; guestCount?: string; side?: string }) {
    try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 7000)

        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            redirect: 'follow',
            signal: controller.signal
        })
        clearTimeout(timeout)
    } catch (err) {
        console.warn('Cảnh báo khi ghi vào Google Sheet:', err)
    }
}

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    // GET /api/wishes -> Đọc trực tiếp từ Google Sheet (lời chúc mới nhất lên đầu)
    if (method === 'GET') {
        const list = await getWishesFromGoogleSheet()
        const sorted = [...list].reverse()
        return {
            success: true,
            wishes: sorted
        }
    }

    // POST /api/wishes -> Nhận lời chúc mới và lưu tự động vào Google Sheet
    if (method === 'POST') {
        const body = await readBody(event)
        const name = String(body?.name || '').trim()
        const message = String(body?.message || '').trim()
        const attending = String(body?.attending || '').trim()
        const guestCount = String(body?.guestCount || '').trim()
        const side = String(body?.side || '').trim()

        if (!name) {
            throw createError({ statusCode: 400, statusMessage: 'Vui lòng nhập tên của bạn!' })
        }
        if (!message) {
            throw createError({ statusCode: 400, statusMessage: 'Vui lòng nhập lời chúc!' })
        }

        const newWish: WishItem = {
            id: 'wish_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            name,
            message,
            attending,
            guestCount,
            side,
            createdAt: new Date().toISOString()
        }

        // Cập nhật bộ nhớ tạm để hiển thị ngay
        wishesCache.push(newWish)

        // Tự động ghi vào Google Sheet
        await sendWishToGoogleSheet({ name, message, attending, guestCount, side })

        return {
            success: true,
            wish: newWish,
            message: 'Gửi lời chúc thành công! Cảm ơn bạn rất nhiều ❤️'
        }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
