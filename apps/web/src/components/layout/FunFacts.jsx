const FACTS = [
  { title: 'Producción de leche', text: 'Una vaca bien alimentada bebe 70 litros de agua al día.' },
  { title: 'Pasturas', text: 'Rotar potreros mejora la fertilidad y reduce parásitos.' },
  { title: 'Bienestar', text: 'Sombra + agua = más ganancia de peso en época seca.' },
]

export default function FunFacts(){
  return (
    <section className="bg-green-50 border-y">
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-4">
        {FACTS.map((f,i)=>(
          <div key={i} className="p-4 rounded-lg bg-white border">
            <h3 className="font-semibold text-green-700">{f.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
