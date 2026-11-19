import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-charcoal'
  const subTextColor = variant === 'light' ? 'text-white/80' : 'text-charcoal/70'
  const strokeColor = variant === 'light' ? '#FFFFFF' : '#1F3528'

  const sizeClasses = {
    sm: { pearl: 'text-xl', homestays: 'text-[7.5px]', roofW: 18, roofH: 8 },
    md: { pearl: 'text-2xl', homestays: 'text-[8.5px]', roofW: 22, roofH: 9 },
    lg: { pearl: 'text-3xl', homestays: 'text-[10px]', roofW: 26, roofH: 11 },
  }

  const s = sizeClasses[size]

  return (
    <Link to="/" className="inline-flex flex-col items-start leading-none group" aria-label="Pearl Homestays Home">
      {/* Roof accent above Pearl */}
      <div className="relative pl-0.5 mb-[-2px]">
        <svg
          width={s.roofW}
          height={s.roofH}
          viewBox="0 0 24 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9L11 2L20 9"
            stroke={strokeColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand wordmark */}
      <span className={`font-serif font-bold ${s.pearl} ${textColor} tracking-tight leading-none`}>
        Pearl
      </span>

      {/* Sub-label */}
      <span className={`font-sans font-semibold ${s.homestays} ${subTextColor} tracking-[0.25em] uppercase leading-none mt-1`}>
        HOMESTAYS
      </span>
    </Link>
  )
}
