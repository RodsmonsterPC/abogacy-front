import { useState, useEffect } from 'react'
import api from '../api/client'
import ArticleCard from '../components/ArticleCard'
import { useLanguage } from '../context/LanguageContext'

export default function Blog() {
  const { t } = useLanguage()
  const b = t('blog')

  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 9 }
      if (category !== 'All' && category !== 'Todos') params.category = category
      if (search) params.search = search
      const { data } = await api.get('/articles', { params })
      if (data.articles.length > 0) {
        setArticles(data.articles)
        setTotalPages(data.totalPages)
      } else {
        setArticles(b.fallbackArticles.map((a, i) => ({ ...a, _id: String(i), slug: String(i), publishedAt: new Date().toISOString(), image: `https://images.unsplash.com/photo-${['1560472354-b33ff0c44a43','1450101499163-c8848c66ca85','1486406146926-c627a92ad1ab','1507003211169-0a1dd7228f2d'][i]}?w=600&q=80` })))
      }
    } catch {
      setArticles(b.fallbackArticles.map((a, i) => ({ ...a, _id: String(i), slug: String(i), publishedAt: new Date().toISOString() })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchArticles() }, [category, page, b.fallbackArticles])

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchArticles() }

  return (
    <main className="pt-20 min-h-screen">
      <div className="pt-[60px] pb-margin px-gutter max-w-container mx-auto w-full">
        {/* Header */}
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-lg">
          <h1 className="font-h1 text-h1 text-primary-container">{b.title}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm max-w-3xl">{b.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-stack-md mb-stack-lg">
          <div className="flex flex-wrap gap-base">
            {b.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                className={`rounded-full px-4 py-2 font-label-sm text-label-sm uppercase border transition-colors ${
                  category === cat
                    ? 'bg-primary-container text-on-primary border-primary-container shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-secondary-container hover:text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="relative w-full lg:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-secondary-container transition-all shadow-level-1"
              placeholder={b.searchPlaceholder}
            />
          </form>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-surface-container rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} readMoreLabel={b.readMore} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-stack-lg flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded font-label-sm text-label-sm uppercase border transition-colors ${
                      page === i + 1 ? 'bg-primary-container text-on-primary border-primary-container' : 'border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary'
                    }`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
