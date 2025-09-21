import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const API = import.meta.env.VITE_API_URL

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await fetch(`${API}/api/categories`)
  if (!res.ok) throw new Error('Error categorías')
  const data = await res.json()
  return data.categories
})

const slice = createSlice({
  name: 'categories',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s)=>{ s.status = 'loading' })
    b.addCase(fetchCategories.fulfilled, (s,a)=>{ s.status='succeeded'; s.list=a.payload })
    b.addCase(fetchCategories.rejected, (s)=>{ s.status = 'failed' })
  }
})
export default slice.reducer
