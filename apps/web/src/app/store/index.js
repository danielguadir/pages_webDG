import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/categoriesSlice'
import products from './slices/productsSlice'
import cart from './slices/cartSlice'

export default configureStore({
  reducer: { categories, products, cart }
})
