import { promises as fs } from 'node:fs'
import path from 'node:path'
import defaultWishes from '../../data/wishes.json'

export interface WishItem {
    id: string
    name: string
    message: string
    attending?: string
    guestCount?: string
    side?: string
    createdAt: string
}

// Google Apps Script Web App URL của bạn
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxttwY2SD9BgiYW9SqA7GbuMb-QQjCUZjOCFnOgWUml-1Tvi4UdZ-5dThgYYxrgPsHqvQ/exec'

// Bộ nhớ tạm khởi tạo từ default wishes
let wishesCache: WishItem[] = Array.isArray(defaultWishes) ? [...defaultWishes] : []

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
            if (data && data.success && Array.isArray(data.wishes) && data.wishes.length > 0) {
                wishesCache = data.wishes
                return wishesCache
            }
        }
    } catch (err) {
        console.warn('Lỗi đọc từ Google Sheet, sử dụng dữ liệu dự phòng:', err)
    }
    return wishesCache
}

// Gửi lời chúc mới sang Google Sheet
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

    // GET /api/wishes -> Đọc trực tiếp từ Google Sheet (mới nhất lên đầu)
    if (method === 'GET') {
        const list = await getWishesFromGoogleSheet()
        // Đảo ngược thứ tự để lời chúc mới nhất trong Sheet luôn hiển thị lên đầu
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

        // Cập nhật bộ nhớ tạm
        wishesCache.push(newWish)

        // 1. Tự động ghi 1 dòng mới vào Google Sheet của bạn
        await sendWishToGoogleSheet({ name, message, attending, guestCount, side })

        // 2. Ghi ra file data/wishes.json khi chạy ở local
        try {
            const filePath = path.resolve(process.cwd(), 'data', 'wishes.json')
            await fs.writeFile(filePath, JSON.stringify(wishesCache, null, 2), 'utf-8')
        } catch {}

        return {
            success: true,
            wish: newWish,
            message: 'Gửi lời chúc thành công! Cảm ơn bạn rất nhiều ❤️'
        }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
})
