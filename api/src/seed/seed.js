// src/seed/seed.js
import { PrismaClient } from '@prisma/client'
import xlsx from 'xlsx'
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

async function clearAll() {
  await prisma.product.deleteMany()
  await prisma.subcategory.deleteMany()
  await prisma.category.deleteMany()
}

function parseExcel(excelPath) {
  const wb = xlsx.readFile(excelPath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1, defval: '' })

  const categories = []
  let current = null

  for (const row of rows) {
    const colA = String(row[0] || '').trim()
    const colB = String(row[1] || '').trim()

    // 1) Categoría SOLO si la columna A empieza con "Categoría" (permite "🔹 ")
    if (colA && /^(\uD83D\uDD39\s*)?categor[íi]a\b/i.test(colA)) {
      // tomar el texto DESPUÉS de los dos puntos si existe
      const parts = colA.split(':')
      const name = parts.length > 1 ? parts.slice(1).join(':').trim() : colA.trim()
      current = { name, slug: slugify(name), subcategories: [] }
      categories.push(current)
      continue
    }

    // 2) Ignorar filas tipo "Subcategorías iniciales recomendadas"
    if (colA && /^subcategor/i.test(colA)) {
      continue
    }

    // 3) Subcategorías: viven en la columna B
    if (current && colB && !/^subcategor/i.test(colB)) {
      const subName = colB.split(':')[0].trim()
      if (subName && !/👉|https?:\/\/|recomendadas|estos son|planes?/i.test(colB)) {
        current.subcategories.push({ name: subName, slug: slugify(subName) })
      }
    }
  }

  // Fallback si no se detectó nada
  if (categories.length === 0) {
    const fallback = [
      {
        name: 'Tecnología y herramientas para el campo',
        subcategories: [
          { name: 'Herramientas básicas' },
          { name: 'Riego y agua' },
          { name: 'Tecnología accesible' },
          { name: 'Accesorios prácticos' }
        ]
      },
      {
        name: 'Ganadería e insumos para animales',
        subcategories: [
          { name: 'Alimentación' },
          { name: 'Salud animal' },
          { name: 'Manejo y ordeño' },
          { name: 'Infraestructura' }
        ]
      },
      {
        name: 'Agricultura – insumos de cultivo',
        subcategories: [
          { name: 'Semillas' },
          { name: 'Fertilizantes' },
          { name: 'Control de plagas' },
          { name: 'Sustratos y abonos' }
        ]
      }
    ]
    for (const c of fallback) c.slug = slugify(c.name)
    for (const c of fallback) for (const s of c.subcategories) s.slug = slugify(s.name)
    return fallback
  }

  return categories
}


async function run() {
  try {
    // Ruta robusta (Windows/macOS/Linux)
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const excelPath = path.join(__dirname, 'input.xlsx')

    console.log('Leyendo Excel:', excelPath)

    const cats = parseExcel(excelPath)
    console.log('Detectadas:', cats.map(c => `${c.name} (${c.subcategories.length})`).join(' | '))

    await clearAll()

    let order = 0
    for (const c of cats) {
      order += 1
      await prisma.category.create({
        data: {
          name: c.name,
          slug: c.slug,
          order,
          subcategories: {
            create: c.subcategories.map((s, i) => ({
              name: s.name,
              slug: s.slug,
              order: i + 1
            }))
          }
        }
      })
    }

    console.log('✅ Seed completo')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed error:', err)
    process.exit(1)
  }
}

run()
