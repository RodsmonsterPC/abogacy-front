import { Link } from 'react-router-dom'

export default function ArticleCard({ article, readMoreLabel = 'Read Insight' }) {
  const date = new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <article className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden
                        group hover:shadow-level-2 transition-all duration-300 relative flex flex-col">
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary-container z-10" />

      {/* Image */}
      {article.image && (
        <div className="overflow-hidden aspect-video relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 left-4 bg-primary-container/90 backdrop-blur-sm px-3 py-1 rounded
                          text-on-primary font-label-sm text-label-sm uppercase tracking-widest">
            {article.category}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-h3 text-h3 text-primary-container mb-stack-sm group-hover:text-secondary transition-colors">
          {article.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-stack-lg">
          {article.excerpt || article.content?.substring(0, 160) + '...'}
        </p>
        <div className="flex items-center justify-between border-t border-surface-variant pt-4 mt-auto">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{date}</span>
          <Link
            to={`/blog/${article.slug || article._id}`}
            className="font-label-sm text-label-sm text-primary-container flex items-center gap-1 group-hover:text-secondary transition-colors"
          >
            {readMoreLabel}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
