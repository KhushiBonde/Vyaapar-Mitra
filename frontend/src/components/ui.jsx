import clsx from 'clsx'

// ─── Torn Paper SVG Divider ────────────────────────────────────
export function TornDivider({ flip = false, color = '#fdf8f0' }) {
  const path = flip
    ? 'M0,0 L1440,0 L1440,40 C1400,10 1350,55 1300,20 C1250,-5 1200,50 1140,25 C1090,5 1040,48 980,18 C930,-2 880,45 820,22 C770,4 720,46 660,20 C610,0 560,44 500,18 C450,-2 400,42 340,16 C290,-4 240,38 180,12 C130,-8 80,36 40,10 L0,30 Z'
    : 'M0,40 C40,10 80,55 140,28 C190,6 240,48 300,20 C350,0 400,42 460,18 C510,-2 560,44 620,20 C670,2 720,46 780,22 C830,4 880,48 940,24 C990,4 1040,46 1100,20 C1150,0 1200,42 1260,18 C1310,-2 1360,40 1400,16 L1440,10 L1440,60 L0,60 Z'

  return (
    <div style={{ lineHeight: 0, display: 'block', overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
        style={{ width: '100%', height: 52, display: 'block' }}>
        <path d={path} fill={color} />
      </svg>
    </div>
  )
}

// ─── Skeleton Loader ──────────────────────────────────────────
export function Skeleton({ className }) {
  return <div className={clsx('skeleton', className)} />
}

// ─── Stat Card ────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, sub, iconBg = 'bg-sage-100', iconColor = 'text-sage-700', trend, tilt }) {
  return (
    <div className={clsx(
      'card card-hover p-5 paper-texture overflow-hidden',
      tilt === 1 && 'tilt-1',
      tilt === -1 && 'tilt-neg1',
    )} style={{ background: '#faf4e8' }}>
      {/* Decorative corner dot */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 28, height: 28, borderRadius: '50%',
        background: '#e8d9bc', opacity: 0.5,
      }} />
      <div className="flex items-start justify-between relative">
        <div className={clsx(
          'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0',
          iconBg,
        )} style={{ boxShadow: '2px 3px 8px rgba(30,45,61,0.1)' }}>
          <Icon className={clsx('w-5 h-5', iconColor)} />
        </div>
        {trend !== undefined && (
          <span className={clsx(
            'text-xs font-600 px-2 py-1 rounded-full font-sans-ui',
            trend >= 0 ? 'bg-sage-100 text-sage-800' : 'bg-blush-100 text-blush-600'
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-display font-800" style={{ color: '#1e2d3d' }}>{value}</p>
      <p className="text-sm font-600 mt-0.5 font-sans-ui" style={{ color: '#4e4233' }}>{label}</p>
      {sub && <p className="text-xs mt-1 font-sans-ui" style={{ color: '#8a7560' }}>{sub}</p>}
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    active:          { cls: 'badge-info',    label: 'Active' },
    needs_attention: { cls: 'badge-danger',  label: '⚠️ Needs Attention' },
    resolved:        { cls: 'badge-success', label: 'Resolved' },
    handed_off:      { cls: 'badge-neutral', label: 'Handed Off' },
    pending:         { cls: 'badge-warning', label: 'Pending' },
    confirmed:       { cls: 'badge-brand',   label: 'Confirmed' },
    fulfilled:       { cls: 'badge-success', label: 'Fulfilled' },
    cancelled:       { cls: 'badge-neutral', label: 'Cancelled' },
    ai_extracted:    { cls: 'badge-brand',   label: '🤖 AI' },
    manual:          { cls: 'badge-neutral', label: '✏️ Manual' },
  }
  const { cls, label } = map[status] || { cls: 'badge-neutral', label: status }
  return <span className={clsx('badge', cls)}>{label}</span>
}

// ─── Language Badge ───────────────────────────────────────────
export function LangBadge({ lang }) {
  const map = {
    hindi:    { emoji: '🇮🇳', label: 'Hindi' },
    hinglish: { emoji: '🔀', label: 'Hinglish' },
    english:  { emoji: '🇬🇧', label: 'English' },
  }
  const { emoji, label } = map[lang] || { emoji: '🌐', label: lang }
  return <span className="badge badge-neutral">{emoji} {label}</span>
}

// ─── Empty State ──────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div style={{
        width: 64, height: 64, background: '#f2e8d5', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
        boxShadow: '2px 4px 12px rgba(30,45,61,0.08)',
      }}>
        <Icon style={{ width: 28, height: 28, color: '#b8a88a' }} />
      </div>
      <h3 className="font-display text-base font-700 mb-2" style={{ color: '#4e4233' }}>{title}</h3>
      <p className="text-sm max-w-xs leading-relaxed font-sans-ui" style={{ color: '#8a7560' }}>{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

// ─── Page Header ──────────────────────────────────────────────
export function PageHeader({ title, titleHi, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-700" style={{ color: '#1e2d3d' }}>{title}</h1>
          {titleHi && <span className="text-sm font-sans-ui" style={{ color: '#b8a88a' }}>/ {titleHi}</span>}
        </div>
        {description && <p className="text-sm mt-1 font-sans-ui" style={{ color: '#6b5c48' }}>{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-600 rounded-lg transition-base focus-visible:outline-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans-ui'
  const variants = {
    primary:       'bg-sage-600 text-white hover:bg-sage-700 shadow-sm',
    secondary:     'bg-parchment-100 text-navy-800 border border-parchment-300 hover:bg-parchment-200',
    danger:        'bg-blush-500 text-white hover:bg-blush-600',
    ghost:         'text-sage-700 hover:bg-sage-50',
    brand_outline: 'border border-sage-400 text-sage-700 hover:bg-sage-50',
    marigold:      'bg-marigold-400 text-navy-900 hover:bg-marigold-500 shadow-sm',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return (
    <button
      style={variant === 'primary' ? { background: '#2e7a6c', color: '#fff' } : {}}
      className={clsx(base, sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

// ─── Input ────────────────────────────────────────────────────
export function Input({ label, labelHi, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-600 flex items-center gap-1.5 font-sans-ui" style={{ color: '#4e4233' }}>
          {label}
          {labelHi && <span className="text-xs font-400" style={{ color: '#b8a88a' }}>{labelHi}</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-3.5 py-2.5 text-sm rounded-lg transition-base font-sans-ui',
          'placeholder:text-neutral-400 focus:outline-none',
          error ? 'border-blush-400 bg-blush-50' : '',
          className
        )}
        style={{
          background: '#fdf8f0',
          border: error ? '1.5px solid #ec7e79' : '1.5px solid #d4c5a9',
          color: '#1e2d3d',
        }}
        onFocus={e => { e.target.style.borderColor = '#52a596'; e.target.style.boxShadow = '0 0 0 3px rgba(82,165,150,0.12)' }}
        onBlur={e => { e.target.style.borderColor = error ? '#ec7e79' : '#d4c5a9'; e.target.style.boxShadow = 'none' }}
        {...props}
      />
      {error && <p className="text-xs font-sans-ui" style={{ color: '#b03330' }}>{error}</p>}
    </div>
  )
}

// ─── Confidence Score ─────────────────────────────────────────
export function ConfidenceBar({ score }) {
  const pct = Math.round(score * 100)
  const color = pct >= 70 ? '#3aaa7e' : pct >= 50 ? '#e6a020' : '#e05a54'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#e8d9bc' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-600 font-sans-ui" style={{ color }}>{pct}%</span>
    </div>
  )
}
