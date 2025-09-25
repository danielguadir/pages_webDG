import { useMemo } from "react"
import SearchInput from "../common/SearchInput"

export default function FilterPanel({ raw, search, setSearch, price, setPrice, tag, setTag }) {
  const { min, max, tags } = useMemo(() => {
    if (!raw || raw.length === 0) return { min: 0, max: 0, tags: [] }
    const prices = raw.filter(p=> typeof p.price === 'number').map(p=> p.price)
    const allTags = new Set()
    raw.forEach(p => Array.isArray(p.tags) && p.tags.forEach(t => allTags.add(t)))
    return { min: Math.min(...prices), max: Math.max(...prices), tags: [...allTags] }
  }, [raw])

  return (
    <aside className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-1">Buscar</p>
        <SearchInput value={search} onChange={setSearch} placeholder="Nombre o etiqueta…" />
      </div>

      <div>
        <p className="text-sm font-medium mb-1">Precio</p>
        <div className="flex items-center gap-2">
          <input type="number" value={price.min ?? ''} placeholder={min}
                 onChange={e=> setPrice(p=>({ ...p, min: e.target.value ? Number(e.target.value) : undefined }))}
                 className="w-28 border rounded px-2 py-1" />
          <span>–</span>
          <input type="number" value={price.max ?? ''} placeholder={max}
                 onChange={e=> setPrice(p=>({ ...p, max: e.target.value ? Number(e.target.value) : undefined }))}
                 className="w-28 border rounded px-2 py-1" />
        </div>
      </div>

      {tags.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-1">Etiqueta</p>
          <select
            value={tag ?? ''}
            onChange={e => setTag(e.target.value || undefined)}
            className="w-full border rounded px-2 py-2"
          >
            <option value="">Todas</option>
            {tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}
    </aside>
  )
}
