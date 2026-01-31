import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart } from '../app/store/slices/cartSlice'

export default function Checkout() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular procesamiento de pago
    alert('Pago en desarrollo. Esta es una simulación.')
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>No hay productos en el carrito.</p>
        <Link to="/" className="text-green-600 underline">Volver a la tienda</Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">¡Pedido Realizado!</h1>
        <p>Gracias por tu compra. Te contactaremos pronto.</p>
        <Link to="/" className="text-green-600 underline">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Dirección</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Método de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="card">Tarjeta de Crédito</option>
                <option value="transfer">Transferencia Bancaria</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
            >
              Realizar Pedido
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-2">
            {cart.items.map(item => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} x{item.quantity}</span>
                <span>${((item.product.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}