import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'

export function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page Not Found" />
      <div className="min-h-screen flex items-center justify-center pt-20 pb-16 bg-ivory">
        <div className="text-center px-4">
          <div className="font-serif text-9xl text-sand mb-4">404</div>
          <h1 className="font-serif text-3xl text-charcoal mb-3">Page Not Found</h1>
          <p className="text-charcoal/60 font-sans text-sm mb-8 max-w-xs mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">← Go Home</Link>
            <Link to="/stays" className="btn-outline">Explore Stays</Link>
          </div>
        </div>
      </div>
    </>
  )
}

