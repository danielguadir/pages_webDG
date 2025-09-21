import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/categoriesSlice'
import products from './slices/productsSlice'

export default configureStore({
  reducer: { categories, products }
})
