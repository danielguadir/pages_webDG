// src/seed/seed-products-simple.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(s) {
  return s
    .toString()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function run() {
  try {
    // Carga catálogo actual
    const cats = await prisma.category.findMany({
      include: { subcategories: true }
    })

    // Crear productos de ejemplo: 2 por subcategoría
    const exampleProducts = []
    for (const cat of cats) {
      for (const sub of cat.subcategories) {
        exampleProducts.push({
          name: `Desparasitante para ${sub.name}`,
          categoryId: cat.id,
          subcategoryId: sub.id,
          price: 150,
          unit: 'unidad',
          stock: 100,
          imageUrl: `https://via.placeholder.com/150?text=Icono`,
          supplier: 'Proveedor Agro',
          tags: ['salud', 'animal', sub.name.toLowerCase()],
          description: `Producto de ejemplo para ${sub.name}`
        })
        exampleProducts.push({
          name: `Fertilizante para ${sub.name}`,
          categoryId: cat.id,
          subcategoryId: sub.id,
          price: 250,
          unit: 'kg',
          stock: 200,
          imageUrl: `https://via.placeholder.com/150?text=Icono2`,
          supplier: 'Proveedor Agro',
          tags: ['fertilizante', sub.name.toLowerCase()],
          description: `Otro producto para ${sub.name}`
        })
      }
    }

    // Inserción
    for (const p of exampleProducts) {
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
          categoryId: p.categoryId,
          subcategoryId: p.subcategoryId,
          tags: p.tags
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