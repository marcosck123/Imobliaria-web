export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorBio: string
  authorPhoto: string
  coverImage: string
  publishedAt: string
  readTime: number
  tags: string[]
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'como-financiar-primeiro-imovel',
    title: 'Como financiar seu primeiro imóvel: guia completo 2024',
    excerpt: 'Tudo o que você precisa saber sobre financiamento imobiliário: documentos, taxas, simulações e os erros mais comuns que os compradores cometem.',
    category: 'Financiamento',
    author: 'Carlos Mendes',
    authorBio: 'Corretor de imóveis com 15 anos de experiência em alto padrão.',
    authorPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    publishedAt: '2024-04-15T10:00:00Z',
    readTime: 8,
    tags: ['financiamento', 'FGTS', 'primeiro imóvel', 'SFH'],
    content: `## Entendendo o Financiamento Imobiliário

Comprar o primeiro imóvel é um dos momentos mais importantes na vida de qualquer pessoa. O financiamento imobiliário é a ferramenta que torna esse sonho possível para a maioria dos brasileiros, permitindo parcelar o valor em até 35 anos.

## Requisitos básicos

Para conseguir um financiamento imobiliário no Brasil, você precisa atender alguns critérios fundamentais:

- **Renda mínima:** A parcela não pode ultrapassar 30% da sua renda bruta mensal
- **Histórico de crédito limpo:** Sem restrições no SPC, Serasa ou SCR
- **Documentação completa:** RG, CPF, comprovante de renda e residência
- **Entrada:** Normalmente entre 10% e 30% do valor do imóvel

## Sistemas de amortização: SAC ou Price?

Existem dois sistemas principais de amortização no Brasil:

### Sistema SAC (Sistema de Amortização Constante)
No SAC, as parcelas começam maiores e diminuem ao longo do tempo. Você paga o mesmo valor de amortização todo mês, mas os juros vão caindo. É ideal para quem tem renda que tende a crescer e quer pagar menos juros no total.

### Tabela Price
Na Tabela Price, as parcelas são fixas do início ao fim. Isso facilita o planejamento financeiro, mas você paga mais juros ao longo do contrato.

## Como usar o FGTS

O FGTS (Fundo de Garantia do Tempo de Serviço) pode ser utilizado para:

1. Compor a entrada do imóvel
2. Amortizar parcelas durante o contrato
3. Quitar a dívida total

Para usar o FGTS, você precisa ter no mínimo 3 anos de trabalho com carteira assinada (não necessariamente contínuos) e o imóvel deve se enquadrar no Sistema Financeiro de Habitação (SFH).

## Taxas e custos ocultos

Além das parcelas, fique atento a esses custos:

- **ITBI:** Imposto de transmissão, geralmente 2-3% do valor do imóvel
- **Registro em cartório:** Em torno de 0,5-1% do valor
- **Seguro obrigatório:** MIP (morte e invalidez) e DFI (danos físicos ao imóvel)
- **Avaliação do imóvel:** Cobrada pelo banco

## Dicas para conseguir as melhores condições

1. **Pesquise em vários bancos:** As taxas variam significativamente entre instituições
2. **Mantenha seu cadastro positivo:** Bons pagadores conseguem taxas menores
3. **Negocie:** Os bancos têm margem para negociar taxas, especialmente para clientes com longa relação
4. **Considere a portabilidade:** Se as taxas caírem, você pode transferir seu financiamento para outro banco

## Conclusão

Financiar seu primeiro imóvel requer planejamento e pesquisa, mas é totalmente viável. Consulte um corretor de confiança e compareça ao banco bem preparado com toda a documentação.`,
  },
  {
    id: '2',
    slug: 'melhores-bairros-sao-paulo-2024',
    title: 'Melhores bairros para morar em São Paulo em 2024',
    excerpt: 'Análise completa dos bairros mais valorizados de São Paulo, com dados de segurança, infraestrutura, valorização e qualidade de vida.',
    category: 'Mercado',
    author: 'Ana Lima',
    authorBio: 'Especialista em imóveis residenciais na Zona Sul de São Paulo.',
    authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541447270800-3c8c5fe0dc3f?w=1200&q=80',
    publishedAt: '2024-03-28T10:00:00Z',
    readTime: 6,
    tags: ['São Paulo', 'bairros', 'valorização', 'qualidade de vida'],
    content: `## Os melhores bairros de São Paulo em 2024

São Paulo é uma cidade de extremos e oportunidades. Com mais de 96 distritos, escolher onde morar pode ser desafiador. Neste guia, analisamos os melhores bairros considerando segurança, infraestrutura e qualidade de vida.

## Jardins — O endereço mais desejado

O Jardins (que engloba Jardim Paulista, Jardim América e Jardim Europa) é historicamente o bairro mais valorizado de São Paulo. Com ruas arborizadas, comércio sofisticado e excelente infraestrutura, é o destino favorito de quem busca sofisticação.

**Preço médio:** R$ 15.000–25.000/m²

## Pinheiros — Moderno e vibrante

Pinheiros é o bairro do momento. Com uma cena gastronômica incrível, vida cultural intensa e excelente acesso ao metrô, atrai principalmente jovens profissionais e famílias modernas.

**Preço médio:** R$ 12.000–18.000/m²

## Moema — Tranquilidade com sofisticação

Próximo ao Parque Ibirapuera, Moema oferece uma combinação perfeita de tranquilidade e sofisticação. Ideal para famílias com crianças, tem excelentes escolas e áreas de lazer.

**Preço médio:** R$ 11.000–16.000/m²

## Vila Madalena — Cultura e autenticidade

Conhecida pela efervescência cultural, a Vila Madalena tem restaurantes premiados, galerias de arte e uma atmosfera boêmia única. Está passando por forte valorização nos últimos anos.

**Preço médio:** R$ 10.000–15.000/m²

## Itaim Bibi — Centro financeiro

O Itaim Bibi concentra muitos escritórios corporativos e é o favorito de executivos que trabalham na região. Excelente infraestrutura e vida noturna sofisticada.

**Preço médio:** R$ 13.000–20.000/m²`,
  },
  {
    id: '3',
    slug: 'decoracao-apartamentos-pequenos',
    title: '10 dicas de decoração para apartamentos pequenos',
    excerpt: 'Aproveite cada centímetro do seu apartamento com técnicas inteligentes de decoração que ampliam visualmente os espaços.',
    category: 'Decoração',
    author: 'Ana Lima',
    authorBio: 'Especialista em imóveis residenciais na Zona Sul de São Paulo.',
    authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    publishedAt: '2024-03-10T10:00:00Z',
    readTime: 5,
    tags: ['decoração', 'apartamento pequeno', 'design de interiores'],
    content: `## Como decorar apartamentos pequenos

Morar em um apartamento compacto é a realidade de muitos paulistanos. Mas isso não significa abrir mão do conforto ou da estética. Com as técnicas certas, é possível criar ambientes funcionais e bonitos mesmo em espaços reduzidos.

## 1. Aposte em móveis multifuncionais

Sofás-camas, mesas dobráveis, otomanas com armazenamento e camas com gavetas são seus melhores amigos em um apartamento pequeno. Cada peça deve cumprir mais de uma função.

## 2. Use cores claras nas paredes

Cores claras, especialmente o branco e tons de off-white, refletem a luz e fazem o ambiente parecer maior. Reserve as cores mais intensas para detalhes e almofadas.

## 3. Invista em espelhos estratégicos

Espelhos são aliados poderosos na decoração de espaços pequenos. Um espelho grande na parede pode dobrar visualmente o espaço de um ambiente.

## 4. Maximize a iluminação natural

Evite cortinas pesadas que bloqueiem a luz natural. Prefira persianas finas ou cortinas leves que permitam a entrada de luz.

## 5. Organize verticalmente

Use prateleiras e estantes que vão até o teto para aproveitar a altura do apartamento e liberar o espaço do chão.`,
  },
]
