export default function WhatsAppButton({ phone="573001112233", message="Hola, tengo una consulta" }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  return (
    <a href={href} target="_blank" rel="noreferrer"
       className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg px-5 py-3 font-medium">
      WhatsApp
    </a>
  )
}
