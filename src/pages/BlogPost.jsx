import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client'

export default function BlogPost() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/articles/${id}`)
      .then(({ data }) => setArticle(data))
      .catch(() => setError('Article not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </main>
  )

  if (error || !article) return (
    <main className="pt-20 min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="font-h1 text-h1 text-primary">Article Not Found</h1>
      <Link to="/blog" className="btn-primary">← Back to Blog</Link>
    </main>
  )

  const date = new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <main className="pt-20 min-h-screen">
      {/* Article Header */}
      <div className="bg-primary-container py-16 px-gutter">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="chip-pending">{article.category}</span>
            <span className="font-label-sm text-label-sm text-on-primary-container uppercase">{date}</span>
          </div>
          <h1 className="font-h1 text-h1 text-white mb-stack-sm">{article.title}</h1>
          {article.excerpt && (
            <p className="font-body-lg text-body-lg text-on-primary-container">{article.excerpt}</p>
          )}
          {article.author && (
            <p className="mt-4 font-label-sm text-label-sm text-secondary-container uppercase">By {article.author.name}</p>
          )}
        </div>
      </div>

      {/* Article Image */}
      {article.image && (
        <div className="max-w-4xl mx-auto px-gutter -mt-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover rounded-lg shadow-level-2 border border-outline-variant"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-gutter py-stack-lg">
        <div
          className="prose prose-lg max-w-none text-on-surface font-body-md text-body-md leading-relaxed
                     prose-headings:font-serif prose-headings:text-primary
                     prose-a:text-secondary prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content?.replace(/\n/g, '<br/>') }}
        />

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="mt-stack-lg flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-surface-container px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface-variant uppercase">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant">
          <Link to="/blog" className="btn-ghost">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
