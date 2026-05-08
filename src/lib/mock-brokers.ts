export interface BrokerReview {
  id: string
  author: string
  rating: number
  date: string
  text: string
  propertyType: string
}

export interface Broker {
  id: string
  slug: string
  name: string
  photo: string
  creci: string
  bio: string
  phone: string
  email: string
  whatsapp: string
  specialties: string[]
  experience: number
  stats: {
    sold: number
    rented: number
    rating: number
    reviews: number
  }
  schedule: string
  reviews: BrokerReview[]
}

export const mockBrokers: Broker[] = [
  {
    id: 'broker-1',
    slug: 'carlos-mendes',
    name: 'Carlos Mendes',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    creci: '12345-F',
    bio: 'Corretor especializado em imóveis de alto padrão na região de São Paulo e Alphaville. Com mais de 15 anos de experiência, já auxiliei centenas de famílias a encontrarem o lar dos seus sonhos. Minha abordagem é personalizada e focada nas reais necessidades de cada cliente.',
    phone: '(11) 3000-1234',
    email: 'carlos@imovelprime.com.br',
    whatsapp: '5511977772222',
    specialties: ['Alto padrão', 'Casas', 'Condomínios fechados', 'Investimento'],
    experience: 15,
    schedule: 'Seg–Sex: 8h–19h · Sáb: 9h–14h',
    stats: { sold: 187, rented: 43, rating: 4.9, reviews: 98 },
    reviews: [
      { id: 'r1', author: 'Rodrigo Faria', rating: 5, date: '2024-03-10', text: 'Excelente profissional! Carlos foi incansável na busca pelo imóvel ideal para minha família. Muito atencioso e transparente em todo o processo.', propertyType: 'Casa' },
      { id: 'r2', author: 'Mariana Souza', rating: 5, date: '2024-02-15', text: 'Comprei meu primeiro apartamento com a ajuda do Carlos. Ele explicou cada etapa com paciência e me deu segurança durante todo o processo de financiamento.', propertyType: 'Apartamento' },
      { id: 'r3', author: 'Felipe Torres', rating: 4, date: '2024-01-20', text: 'Ótimo corretor, muito conhecedor do mercado de alto padrão. Conseguiu um ótimo preço na negociação. Recomendo sem hesitar.', propertyType: 'Casa em condomínio' },
    ],
  },
  {
    id: 'broker-2',
    slug: 'ana-lima',
    name: 'Ana Lima',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    creci: '23456-F',
    bio: 'Especialista em imóveis residenciais nos bairros nobres de São Paulo, com foco em apartamentos e coberturas. Formada em Administração com MBA em Gestão Imobiliária. Atendo com dedicação cada cliente, do primeiro contato à entrega das chaves.',
    phone: '(11) 3000-2345',
    email: 'ana@imovelprime.com.br',
    whatsapp: '5511988881111',
    specialties: ['Apartamentos', 'Coberturas', 'Locação', 'Zona Sul SP'],
    experience: 10,
    schedule: 'Seg–Sex: 9h–18h · Sáb: 10h–14h',
    stats: { sold: 124, rented: 89, rating: 4.8, reviews: 74 },
    reviews: [
      { id: 'r4', author: 'Cristina Alves', rating: 5, date: '2024-04-05', text: 'Ana foi simplesmente incrível! Super atenciosa e paciente. Encontrou exatamente o apartamento que eu queria em Moema, dentro do meu orçamento.', propertyType: 'Apartamento' },
      { id: 'r5', author: 'Lucas Prado', rating: 5, date: '2024-03-22', text: 'Profissional exemplar. Ela conhece cada detalhe dos imóveis que apresenta. A negociação foi tranquila e conseguimos ótimas condições.', propertyType: 'Cobertura' },
      { id: 'r6', author: 'Débora Matos', rating: 4, date: '2024-02-08', text: 'Muito competente e honesta. Me ajudou a entender todos os custos envolvidos antes de fechar negócio. Recomendo!', propertyType: 'Apartamento' },
    ],
  },
  {
    id: 'broker-3',
    slug: 'pedro-costa',
    name: 'Pedro Costa',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    creci: '34567-F',
    bio: 'Corretor especializado em terrenos, imóveis comerciais e investimentos imobiliários. Atuo em São Paulo, Campinas e Santos. Tenho experiência em análise de viabilidade e rentabilidade para investidores que buscam renda passiva com imóveis.',
    phone: '(11) 3000-3456',
    email: 'pedro@imovelprime.com.br',
    whatsapp: '5511955554444',
    specialties: ['Terrenos', 'Imóveis Comerciais', 'Investimentos', 'Interior SP'],
    experience: 12,
    schedule: 'Seg–Sex: 8h–18h · Sáb: 9h–13h',
    stats: { sold: 156, rented: 67, rating: 4.7, reviews: 61 },
    reviews: [
      { id: 'r7', author: 'Henrique Barros', rating: 5, date: '2024-04-12', text: 'Pedro tem um conhecimento profundo do mercado de terrenos. Me ajudou a identificar excelentes oportunidades de investimento em Campinas. Muito satisfeito!', propertyType: 'Terreno' },
      { id: 'r8', author: 'Sandra Reis', rating: 4, date: '2024-03-01', text: 'Ótimo para quem busca imóveis comerciais. Muito profissional e conhece bem a legislação. A negociação foi justa e transparente.', propertyType: 'Comercial' },
      { id: 'r9', author: 'Alexandre Nunes', rating: 5, date: '2024-01-15', text: 'Investidor experiente em imóveis, o Pedro foi o primeiro corretor que realmente entendeu minha estratégia de investimento. Fechamos 3 negócios juntos!', propertyType: 'Terreno' },
    ],
  },
]
