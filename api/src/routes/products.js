import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

const router = Router()

// GET /api/products
router.get('/', async (req, res) => {
  const { category, subcategory, q, page = 1, pageSize = 24 } = req.query
  const take = Number(pageSize)
  const skip = (Number(page) - 1) * take

  const where = {}
  if (q) where.name = { contains: q, mode: 'insensitive' }
  if (category) where.category = { is: { slug: category } }
  if (subcategory) where.subcategory = { is: { slug: subcategory } }

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({ where, skip, take, orderBy: { id: 'desc' } })
  ])

  res.json({ total, page: Number(page), pageSize: take, items })
})

export default router
