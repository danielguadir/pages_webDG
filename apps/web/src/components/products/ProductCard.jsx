import { useDispatch } from 'react-redux'
import { addToCart } from '../../app/store/slices/cartSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ product }))
  }

  return (
    <div className="border rounded-xl p-4 hover:shadow transition">
      <div className="h-36 bg-green-50 rounded mb-2 flex items-center justify-center text-sm text-green-600">
        {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full object-contain" /> : 'Imagen'}
      </div>
      <h3 className="font-semibold leading-snug">{product.name}</h3>
      {product.price != null && <p className="text-sm text-gray-600 mt-1">${product.price}</p>}
      {Array.isArray(product.tags) && product.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.map((t,i)=>(
            <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Añadir al Carrito
      </button>
    </div>
  )
}
