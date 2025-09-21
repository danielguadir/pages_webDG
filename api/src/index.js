import express from 'express'
import cors from 'cors'
import categoriesRouter from './routes/categories.js'
import productsRouter from './routes/products.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ ok: true, name: 'agro-api' }))
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
