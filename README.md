<div align="center">

# 🏠 ImóvelPrime

**Site completo de imobiliária — Next.js 14 + TypeScript + Tailwind CSS**

[![CI](https://github.com/marcosck123/Imobliaria/actions/workflows/ci.yml/badge.svg)](https://github.com/marcosck123/Imobliaria/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Demo ao Vivo](#) · [Backend API](https://github.com/marcosck123/imobliaria-api) · [Reportar Bug](https://github.com/marcosck123/Imobliaria/issues)

</div>

---

## Sobre o Projeto

Platforma imobiliária moderna e responsiva para listagem, busca e detalhamento de imóveis residenciais e comerciais. Desenvolvida com foco em performance, SEO e experiência do usuário.

## Funcionalidades

- **Busca inteligente** — filtros por tipo, cidade, preço, quartos e status
- **Galeria de imagens** — lightbox com thumbnails e navegação por setas
- **Página de detalhe** — características completas + formulário de contato
- **Blog** — artigos sobre mercado imobiliário com categorias
- **WhatsApp flutuante** — CTA sempre visível
- **SEO otimizado** — metadata dinâmica, Open Graph, sitemap
- **100% responsivo** — mobile-first, funciona em qualquer tela
- **Build estático** — 17 páginas pré-renderizadas, carregamento instantâneo

## Stack

| Tecnologia | Uso |
|-----------|-----|
| [Next.js 14](https://nextjs.org) | Framework (App Router, SSG/SSR) |
| [TypeScript](https://typescriptlang.org) | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | Estilização utility-first |
| [Radix UI](https://radix-ui.com) | Componentes acessíveis |
| [Lucide React](https://lucide.dev) | Ícones |
| [class-variance-authority](https://cva.style) | Variantes de componentes |

## Estrutura de Pastas

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── imoveis/
│   │   ├── page.tsx          # Listagem com filtros
│   │   └── [slug]/page.tsx   # Detalhe do imóvel
│   ├── blog/page.tsx
│   ├── sobre/page.tsx
│   └── contato/page.tsx
├── components/
│   ├── home/                 # Hero, FeaturedProperties, Stats...
│   ├── layout/               # Header, Footer
│   ├── property/             # Card, Grid, Filters, Gallery
│   └── ui/                   # Button, Input, Badge, Select...
├── lib/
│   ├── mock-data.ts          # 9 imóveis brasileiros de exemplo
│   ├── api.ts                # Cliente HTTP com fallback para mock
│   └── utils.ts              # cn(), formatCurrency(), formatArea()
└── types/
    └── property.ts           # Interfaces e enums
```

## Rodando Localmente

```bash
# Clone o repositório
git clone https://github.com/marcosck123/Imobliaria.git
cd Imobliaria

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Variáveis de Ambiente

```env
# URL da API backend (opcional — usa dados mock sem ela)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint com ESLint
```

## Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marcosck123/Imobliaria)

1. Clique no botão acima
2. Conecte sua conta GitHub
3. Configure `NEXT_PUBLIC_API_URL` nas variáveis de ambiente
4. Deploy automático a cada push

## Relacionados

- **[imobliaria-api](https://github.com/marcosck123/imobliaria-api)** — Backend REST API (NestJS + PostgreSQL + Prisma)

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">
Feito com ❤️ por <a href="https://github.com/marcosck123">marcosck123</a>
</div>
