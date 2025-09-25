import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../components/products/ProductCard"

const API = import.meta.env.VITE_API_URL

export default function Search(){
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const q = (params.get('q') || '').toLowerCase()

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(()=> {
    async function load(){
      setStatus('loading')
      const res = await fetch(`${API}/api/products`) // luego podemos pasar ?search= al backend
      const data = await res.json()
      setItems(data.items || [])
      setStatus('succeeded')
    }
    load()
  }, [])

  const filtered = useMemo(()=>{
    if(!q) return []
    return items.filter(p=>{
      const inName = p.name?.toLowerCase().includes(q)
      const inTags = Array.isArray(p.tags) && p.tags.some(t=> t.toLowerCase().includes(q))
      return inName || inTags
    })
  }, [items, q])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Resultados para “{params.get('q') || ''}”</h1>
      {status==='loading' && <div>Cargando…</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
      {status==='succeeded' && filtered.length===0 && (
        <div className="text-gray-600">No encontramos productos con ese término.</div>
      )}
    </div>
  )
}
