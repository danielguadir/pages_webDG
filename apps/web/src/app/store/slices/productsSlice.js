import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const API = import.meta.env.VITE_API_URL

export const fetchProducts = createAsyncThunk('products/fetch', async (params = {}) => {
  const q = new URLSearchParams(params).toString()
  const res = await fetch(`${API}/api/products?${q}`)
  if (!res.ok) throw new Error('Error productos')
  return await res.json() // {items, total}
})

const slice = createSlice({
  name: 'products',
  initialState: { list: [], total: 0, status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s)=>{ s.status = 'loading' })
    b.addCase(fetchProducts.fulfilled, (s,a)=>{ s.status='succeeded'; s.list=a.payload.items; s.total=a.payload.total })
    b.addCase(fetchProducts.rejected, (s)=>{ s.status = 'failed' })
  }
})
export default slice.reducer
