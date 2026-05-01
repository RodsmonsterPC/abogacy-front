import { Link } from 'react-router-dom'

export default function ServiceCard({ service, featured = false }) {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant rounded shadow-level-1
                     hover:shadow-level-2 hover:-translate-y-0.5 transition-all duration-300
                     relative overflow-hidden flex flex-col p-8 group ${featured ? 'md:col-span-2' : ''}`}>
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />

      <span className="material-symbols-outlined text-secondary text-4xl mb-stack-sm
                       group-hover:scale-110 transition-transform duration-300 origin-left">
        {service.icon || 'gavel'}
      </span>

      <h3 className="font-h3 text-h3 text-primary-container mb-base">
        {service.title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md flex-grow">
        {service.description}
      </p>
      <Link
        to="/services"
        className="font-label-sm text-label-sm text-secondary uppercase flex items-center
                   hover:text-primary-container transition-colors"
      >
        View Details
        <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
      </Link>
    </div>
  )
}
