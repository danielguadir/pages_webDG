import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar({ placeholder="Busca productos…" }) {
  const [q, setQ] = useState("")
  const navigate = useNavigate()

  function onSubmit(e){
    e.preventDefault()
    const query = q.trim()
    if(!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        value={q}
        onChange={e=> setQ(e.target.value)}
        placeholder={placeholder}
        className="w-64 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button className="px-3 py-2 rounded-lg border bg-green-600 text-white hover:bg-green-700">
        Buscar
      </button>
    </form>
  )
}
