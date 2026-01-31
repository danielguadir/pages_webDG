import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function CartIcon() {
  const cart = useSelector(state => state.cart)
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link to="/cart" className="relative">
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {itemCount}
        </span>
      )}
    </Link>
  )
}