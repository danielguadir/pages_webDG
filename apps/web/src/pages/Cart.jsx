import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '../app/store/slices/cartSlice'

export default function Cart() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }))
  }

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity: parseInt(quantity) }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className="text-green-600 underline">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item.product.id} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.product.imageUrl || '/placeholder.jpg'}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price || 0}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.product.id, e.target.value)}
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => handleRemove(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Vaciar Carrito
        </button>
        <div className="text-right">
          <p className="text-lg font-bold">Total: ${cart.total.toFixed(2)}</p>
          <Link
            to="/checkout"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 inline-block mt-2"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  )
}