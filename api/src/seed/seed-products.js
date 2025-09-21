// src/seed/seed-products.js
import xlsx from 'xlsx'
import { PrismaClient } from '@prisma/client'
import { fileURLToPath } from 'url'
import path from 'path'

const prisma = new PrismaClient()

function slugify(s) {
  return s
    .toString()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseProducts(xlsxPath) {
  const wb = xlsx.readFile(xlsxPath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(ws, { defval: '' }) // objetos por cabecera

  return rows.map(r => ({
    name: String(r.name || '').trim(),
    category: String(r.category || '').trim(),
    subcategory: String(r.subcategory || '').trim(),
    price: r.price === '' ? null : Number(r.price),
    unit: String(r.unit || '').trim() || null,
    stock: r.stock === '' ? null : Number(r.stock),
    imageUrl: String(r.imageUrl || '').trim() || null,
    supplier: String(r.supplier || '').trim() || null,
    tags: String(r.tags || '').trim(),
    description: String(r.description || '').trim() || null
  })).filter(p => p.name && p.category && p.subcategory)
}

async function run() {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const xlsxPath = path.join(__dirname, 'products.xlsx')
    console.log('Leyendo productos desde:', xlsxPath)

    const items = parseProducts(xlsxPath)
    console.log(`Productos a insertar: ${items.length}`)

    // cache de ids por (category, subcategory)
    const catCache = new Map() // key: categoryName -> {id, slug}
    const subCache = new Map() // key: categoryName|subName -> {id, slug}

    // Carga catálogo actual
    const cats = await prisma.category.findMany({
      include: { subcategories: true }
    })
    for (const c of cats) {
      catCache.set(c.name, { id: c.id, slug: c.slug })
      for (const s of c.subcategories) {
        subCache.set(`${c.name}|${s.name}`, { id: s.id, slug: s.slug })
      }
    }

    // Inserción
    for (const p of items) {
      const cat = catCache.get(p.category)
      const sub = subCache.get(`${p.category}|${p.subcategory}`)
      if (!cat || !sub) {
        console.warn(`⚠️  Omitido: "${p.name}" porque no se encontró categoría/subcategoría -> ${p.category} / ${p.subcategory}`)
        continue
      }

      const tagsArray = p.tags
        ? p.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []

      await prisma.product.create({
        data: {
          name: p.name,
          slug: slugify(p.name),
          price: p.price,
          unit: p.unit,
          stock: p.stock,
          imageUrl: p.imageUrl,
          supplier: p.supplier,
          description: p.description,
          categoryId: cat.id,
          subcategoryId: sub.id,
          tags: tagsArray
        }
      })
      console.log('✔ Insertado:', p.name)
    }

    console.log('✅ Seed de productos completo')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed productos error:', err)
    process.exit(1)
  }
}

run()
