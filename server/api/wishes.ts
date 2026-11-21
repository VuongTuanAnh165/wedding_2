import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import defaultWishesData from '../../data/wishes.json'

export interface WishItem {
    id: string
    name: string
    message: string
    attending?: string
    guestCount?: string
    side?: string
    createdAt: string
}

// In-memory cache duy trì trong suốt vòng đời của container serverless
let inMemoryWishes: WishItem[] | null = null

// Lấy danh sách mặc định từ file json được bundle sẵn trong source
const getDefaultWishes = (): WishItem[] => {
    if (Array.isArray(defaultWishesData)) {
        return [...defaultWishesData]
    }
    return []
}

// Kiểm tra cấu hình Vercel KV / Upstash Redis (nếu người dùng cấu hình trên Vercel)
const getKvConfig = () => {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
    if (url && token) {
        return { url, token }
    }
    return null
}

// Đường dẫn file lưu trữ: Trên local dùng data/wishes.json, trên Vercel/Serverless dùng /tmp/wishes.json
const getWishesFilePath = () => {
    const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY)
    if (isServerless) {
        return path.resolve(os.tmpdir(), 'wedding_wishes.json')
    }
    return path.resolve(process.cwd(), 'data', 'wishes.json')
}

async function readWishes(): Promise<WishItem[]> {
    // 1. Kiểm tra Vercel KV / Upstash Redis nếu có
    const kv = getKvConfig()
    if (kv) {
        try {
            const res = await fetch(`${kv.url}/get/wedding_wishes`, {
                headers: { Authorization: `Bearer ${kv.token}` }
            })
            if (res.ok) {
                const data = await res.json()
                if (data && data.result) {
                    const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        inMemoryWishes = parsed
                        return parsed
                    }
                }
            }
        } catch (kvErr) {
            console.warn('Lỗi đọc từ KV, chuyển sang bộ nhớ tạm:', kvErr)
        }
    }

    // 2. Nếu đã có trong memory cache
    if (inMemoryWishes !== null && inMemoryWishes.length > 0) {
        return inMemoryWishes
    }

    // 3. Đọc từ file hệ thống (/tmp trên serverless hoặc data/wishes.json trên local)
    const filePath = getWishesFilePath()
    try {
        const raw = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
            inMemoryWishes = parsed
            return inMemoryWishes
        }
    } catch {
        // Nếu file chưa tồn tại hoặc lỗi đọc, nạp từ default bundle
    }

    inMemoryWishes = getDefaultWishes()
    return inMemoryWishes
}

async function saveWishes(wishes: WishItem[]): Promise<void> {
    inMemoryWishes = wishes

    // 1. Lưu vào Vercel KV / Upstash Redis nếu có
    const kv = getKvConfig()
    if (kv) {
        try {
            await fetch(`${kv.url}/set/wedding_wishes`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${kv.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wishes)
            })
        } catch (kvErr) {
            console.warn('Lỗi lưu vào KV:', kvErr)
        }
    }

    // 2. Lưu vào file hệ thống (safe fallback)
    const filePath = getWishesFilePath()
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, JSON.stringify(wishes, null, 2), 'utf-8')
    } catch (err) {
        // Nếu gặp EROFS (Read-only filesystem) trên Vercel khi đường dẫn trỏ vào data/, fallback vào /tmp
        try {
            const tmpPath = path.resolve(os.tmpdir(), 'wedding_wishes.json')
            await fs.writeFile(tmpPath, JSON.stringify(wishes, null, 2), 'utf-8')
        } catch (tmpErr) {
            console.warn('Không thể ghi file trên serverless (sử dụng in-memory):', tmpErr)
        }
    }
}

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    // GET /api/wishes -> Trả về danh sách lời chúc (mới nhất lên đầu)
    if (method === 'GET') {
        const wishes = await readWishes()
        const sorted = [...wishes].sort((a, b) => {
            const timeA = new Date(a.createdAt || 0).getTime()
            const timeB = new Date(b.createdAt || 0).getTime()
            return timeB - timeA
        })
        return {
            success: true,
            wishes: sorted
        }
    }

    // POST /api/wishes -> Lưu lời chúc mới
    if (method === 'POST') {
        const body = await readBody(event)
        const name = String(body?.name || '').trim()
        const message = String(body?.message || '').trim()
        const attending = String(body?.attending || '').trim()
        const guestCount = String(body?.guestCount || '').trim()
        const side = String(body?.side || '').trim()

        if (!name) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Vui lòng nhập tên của bạn!'
            })
        }

        if (!message) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Vui lòng nhập lời chúc của bạn!'
            })
        }

        const newWish: WishItem = {
            id: 'wish_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
            name,
            message,
            attending,
            guestCount,
            side,
            createdAt: new Date().toISOString()
        }

        try {
            const currentWishes = await readWishes()
            currentWishes.unshift(newWish)
            await saveWishes(currentWishes)
        } catch (saveErr) {
            console.error('Lỗi khi lưu wishes:', saveErr)
            // Đảm bảo vẫn cập nhật inMemoryWishes để không crash request
            if (inMemoryWishes) {
                inMemoryWishes.unshift(newWish)
            } else {
                inMemoryWishes = [newWish, ...getDefaultWishes()]
            }
        }

        return {
            success: true,
            wish: newWish,
            message: 'Gửi lời chúc thành công! Cảm ơn bạn rất nhiều ❤️'
        }
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
    })
})
