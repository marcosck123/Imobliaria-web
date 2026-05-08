import { Building2, Users, Trophy, Star } from 'lucide-react'

const stats = [
  { icon: Building2, value: '500+', label: 'Imóveis', description: 'Disponíveis em nosso portfólio' },
  { icon: Users, value: '1.200+', label: 'Clientes', description: 'Atendidos com sucesso' },
  { icon: Trophy, value: '15', label: 'Anos de Mercado', description: 'Com excelência e dedicação' },
  { icon: Star, value: '98%', label: 'Satisfação', description: 'De clientes satisfeitos' },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Nossa trajetória</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">Nossos Números</h2>
          <p className="text-primary-200 mt-2">Resultados que comprovam nossa excelência no mercado imobiliário</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center bg-primary-700/50 rounded-xl p-6 border border-primary-700 hover:border-accent/40 transition-colors duration-200">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-accent font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-primary-300 text-xs">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
