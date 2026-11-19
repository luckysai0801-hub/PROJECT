import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-sans text-charcoal/50">
      <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="flex-shrink-0" />
          {item.to ? (
            <Link to={item.to} className="hover:text-charcoal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// Hook to auto-generate breadcrumbs from path (not used for custom ones)
export function useAutoLocation() {
  return useLocation()
}

