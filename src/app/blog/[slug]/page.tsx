import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, Tag, ArrowLeft, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { mockBlogPosts } from '@/lib/mock-blog'
import { Button } from '@/components/ui/button'

export function generateStaticParams() {
  return mockBlogPosts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog ImóvelPrime`,
    description: post.excerpt,
  }
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{line.replace('## ', '')}</h2>
    }
    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-2">{line.replace('### ', '')}</h3>
    }
    if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*:? ?(.*)$/)
      if (match) {
        return (
          <li key={i} className="mb-1.5 text-gray-700">
            <strong className="text-gray-900">{match[1]}:</strong> {match[2]}
          </li>
        )
      }
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="mb-1.5 text-gray-700">{line.replace(/^- /, '')}</li>
    }
    const numMatch = line.match(/^(\d+)\. \*\*(.+?)\*\*:? ?(.*)$/)
    if (numMatch) {
      return (
        <li key={i} className="mb-1.5 text-gray-700">
          <strong className="text-gray-900">{numMatch[2]}:</strong> {numMatch[3]}
        </li>
      )
    }
    const simpleNum = line.match(/^(\d+)\. (.+)$/)
    if (simpleNum) {
      return <li key={i} className="mb-1.5 text-gray-700">{simpleNum[2]}</li>
    }
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="text-gray-700 leading-relaxed mb-3">{line}</p>
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = mockBlogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-0">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-gray-500 mb-6 leading-relaxed">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min de leitura
            </span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden -mt-1">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="900px"
            priority
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article body */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="prose-like space-y-1">
                {renderContent(post.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar artigo
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2 text-blue-700 border-blue-200 hover:bg-blue-50">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-sky-500 border-sky-200 hover:bg-sky-50">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-blue-800 border-blue-200 hover:bg-blue-50">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
              </div>
            </div>

            {/* Author */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
                <Image src={post.authorPhoto} alt={post.author} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">{post.author}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{post.authorBio}</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Leia também</h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group block">
                    <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                      <Image src={r.coverImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="250px" />
                    </div>
                    <span className="text-xs font-medium text-primary">{r.category}</span>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 group-hover:text-primary transition-colors leading-snug">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {r.readTime} min
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Precisa de ajuda?</p>
                <p className="text-xs text-gray-500 mb-3">Fale com um de nossos corretores especializados.</p>
                <Link href="/corretores">
                  <Button size="sm" className="w-full">Ver corretores</Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
