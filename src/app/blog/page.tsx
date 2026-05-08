import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas, novidades e análises do mercado imobiliário para você tomar as melhores decisões.',
}

const posts = [
  {
    slug: 'como-financiar-primeiro-imovel',
    title: 'Como financiar seu primeiro imóvel: guia completo para 2024',
    excerpt: 'Entenda as modalidades de financiamento disponíveis, taxas de juros, documentos necessários e as melhores estratégias para conquistar a aprovação do crédito.',
    category: 'Financiamento',
    date: '15 Mar 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
  },
  {
    slug: 'bairros-valorizados-sao-paulo',
    title: '5 bairros de São Paulo que mais valorizaram em 2024',
    excerpt: 'Uma análise dos bairros paulistanos com maior crescimento no valor do metro quadrado e as razões por trás dessa valorização acelerada.',
    category: 'Mercado',
    date: '2 Mar 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
  },
  {
    slug: 'checklist-visita-imovel',
    title: 'Checklist completo para visitar um imóvel antes de comprar',
    excerpt: 'Não perca nenhum detalhe importante na hora de visitar um imóvel. Preparamos um checklist com mais de 30 pontos essenciais para verificar.',
    category: 'Dicas',
    date: '22 Fev 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  },
  {
    slug: 'documentacao-venda-imovel',
    title: 'Toda a documentação necessária para vender um imóvel',
    excerpt: 'Saiba quais documentos são exigidos pelo cartório, banco e comprador para garantir uma venda segura e sem surpresas.',
    category: 'Documentação',
    date: '10 Fev 2024',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
  {
    slug: 'vantagens-morar-condominio-fechado',
    title: 'Vantagens e desvantagens de morar em condomínio fechado',
    excerpt: 'Uma análise honesta sobre a vida em condomínio fechado, considerando segurança, custo, infraestrutura e qualidade de vida.',
    category: 'Lifestyle',
    date: '28 Jan 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  },
  {
    slug: 'taxa-selic-mercado-imobiliario',
    title: 'Como a taxa Selic afeta o mercado imobiliário',
    excerpt: 'Entenda a relação entre a taxa básica de juros e os preços dos imóveis, o crédito imobiliário e as oportunidades de investimento no setor.',
    category: 'Mercado',
    date: '15 Jan 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Blog ImóvelPrime</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Conteúdo especializado sobre o mercado imobiliário, financiamento e dicas para comprar, vender ou alugar com segurança.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group"
            >
              <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default" className="text-xs">{post.category}</Badge>
                  <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-bold text-gray-900 text-lg leading-snug hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mt-4 hover:gap-2.5 transition-all duration-200"
                >
                  Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
