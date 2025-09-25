export default function SearchInput({ value, onChange, placeholder="Buscar..." }) {
  return (
    <input
      value={value}
      onChange={(e)=> onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  )
}
