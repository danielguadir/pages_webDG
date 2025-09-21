export async function fetchCategories() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
  return res.json()
}
const API = import.meta.env.VITE_API_URL

export async function getCategories() {
  const res = await fetch(`${API}/api/categories`)
  if (!res.ok) throw new Error('Error cargando categorías')
  const data = await res.json()
  return data.categories
}
