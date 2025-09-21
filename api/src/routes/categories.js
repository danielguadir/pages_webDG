import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

const router = Router()

// GET /api/categories
router.get('/', async (req, res) => {
  const cats = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { subcategories: { orderBy: { order: 'asc' } } }
  })
  res.json({ categories: cats })
})

export default router
