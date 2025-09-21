import Home from "./pages/Home"

export default function App(){
  return (
    <div>
      <header className="border-b">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-green-700">
            Aplicación 🌱 Agro Distrib
          </h1>
        </div>
      </header>
      <Home />
    </div>
  )
}
