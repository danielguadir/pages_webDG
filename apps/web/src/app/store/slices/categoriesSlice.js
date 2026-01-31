import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const API = import.meta.env.VITE_API_URL

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await fetch(`${API}/api/categories`)
  if (!res.ok) throw new Error('Error cargando categorías')
  const data = await res.json()
  return data.categories
})

const slice = createSlice({
  name: 'categories',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s) => { s.status = 'loading'; s.error = null })
    b.addCase(fetchCategories.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; s.error = null })
    b.addCase(fetchCategories.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; console.error('Error fetching categories:', a.error.message) })
  }
})
export default slice.reducer
