import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : { items: [], total: 0 }
  } catch {
    return { items: [], total: 0 }
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (e) {
    console.error('Error saving cart:', e)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload
      const existing = state.items.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ product, quantity: 1 })
      }
      state.total = state.items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
      saveCartToStorage(state)
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload
      state.items = state.items.filter(item => item.product.id !== productId)
      state.total = state.items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
      saveCartToStorage(state)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== productId)
        }
      }
      state.total = state.items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
      saveCartToStorage(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      saveCartToStorage(state)
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer