import { Shield, Award, HeadphonesIcon, TrendingUp } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: '15 Anos de Experiência',
    description: 'Uma trajetória sólida no mercado imobiliário de São Paulo e região, com milhares de negócios bem-sucedidos.',
  },
  {
    icon: Shield,
    title: 'Negociações Seguras',
    description: 'Toda a documentação analisada por especialistas jurídicos para garantir uma transação sem riscos.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Dedicado',
    description: 'Nossos corretores acompanham você em cada etapa, do primeiro contato ao registro em cartório.',
  },
  {
    icon: TrendingUp,
    title: 'Melhores Oportunidades',
    description: 'Acesso a imóveis exclusivos e lançamentos antes de chegarem ao mercado público.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que escolher a <span className="text-accent">ImóvelPrime</span>?
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Combinamos tecnologia, experiência e atendimento humano para tornar sua jornada imobiliária mais simples e segura.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors duration-200">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
