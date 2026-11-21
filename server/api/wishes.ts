import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface WishItem {
    id: string
    name: string
    message: string
    attending?: string
    guestCount?: string
    side?: string
    createdAt: string
}

const getWishesFilePath = () => {
    return path.resolve(process.cwd(), 'data', 'wishes.json')
}

async function readWishesFromFile(): Promise<WishItem[]> {
    const filePath = getWishesFilePath()
    try {
        const raw = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
            return parsed
        }
        return []
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(path.dirname(filePath), { recursive: true })
            await fs.writeFile(filePath, '[]', 'utf-8')
            return []
        }
        console.error('Error reading wishes file:', err)
        return []
    }
}

async function saveWishesToFile(wishes: WishItem[]): Promise<void> {
    const filePath = getWishesFilePath()
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(wishes, null, 2), 'utf-8')
}

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    // GET /api/wishes -> Trả về danh sách lời chúc (mới nhất lên đầu)
    if (method === 'GET') {
        const wishes = await readWishesFromFile()
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

    // POST /api/wishes -> Lưu lời chúc mới vào file data/wishes.json
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

        const currentWishes = await readWishesFromFile()
        currentWishes.unshift(newWish)
        await saveWishesToFile(currentWishes)

        return {
            success: true,
            wish: newWish,
            total: currentWishes.length
        }
    }

    throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
    })
})
