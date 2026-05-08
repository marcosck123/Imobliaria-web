import { Metadata } from 'next'
import Image from 'next/image'
import { Award, Users, Home, ThumbsUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história da ImóvelPrime, nossa equipe de corretores e nossos valores.',
}

const stats = [
  { icon: Home, value: '500+', label: 'Imóveis no portfólio' },
  { icon: Users, value: '1.200+', label: 'Clientes atendidos' },
  { icon: Award, value: '15 anos', label: 'De experiência' },
  { icon: ThumbsUp, value: '98%', label: 'Satisfação dos clientes' },
]

const team = [
  {
    name: 'Carlos Eduardo Ribeiro',
    role: 'Corretor Sênior',
    creci: 'CRECI-SP 12.345-F',
    specialty: 'Imóveis de alto padrão',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Fernanda Oliveira',
    role: 'Corretora',
    creci: 'CRECI-SP 23.456-F',
    specialty: 'Apartamentos e locação',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Rodrigo Almeida',
    role: 'Corretor',
    creci: 'CRECI-SP 34.567-F',
    specialty: 'Imóveis comerciais',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <div className="relative bg-primary text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)' }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossa História</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Há 15 anos transformando o sonho da casa própria em realidade, com dedicação, transparência e resultado.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Quem somos</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>A <strong className="text-primary">ImóvelPrime</strong> nasceu em 2009 com um objetivo claro: oferecer uma experiência imobiliária diferenciada em São Paulo e região. Fundada pelo corretor Carlos Eduardo Ribeiro, a empresa cresceu baseada em três pilares: confiança, conhecimento e resultado.</p>
                <p>Em 15 anos de mercado, intermediamos mais de 1.200 negociações bem-sucedidas, construindo uma reputação sólida junto a famílias, investidores e empresas que buscam o melhor em imóveis residenciais e comerciais.</p>
                <p>Nosso portfólio abrange imóveis em São Paulo, Campinas, Santos e cidades da Grande SP, com especialização em residências de médio e alto padrão, além de soluções completas para investidores.</p>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80"
                alt="Escritório ImóvelPrime"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Nossa Equipe</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Corretores certificados e apaixonados pelo que fazem, prontos para encontrar o imóvel ideal para você.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100 group-hover:border-accent transition-colors duration-200 shadow-md">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-primary font-medium text-sm">{member.role}</p>
                <p className="text-gray-400 text-xs mt-0.5">{member.creci}</p>
                <p className="text-gray-500 text-sm mt-1">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
