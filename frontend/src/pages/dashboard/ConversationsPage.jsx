import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ChevronRight, MessageSquare } from 'lucide-react'
import { mockConversations } from '../../mock/data'
import { StatusBadge, LangBadge, EmptyState, PageHeader } from '../../components/ui'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

const STATUS_FILTERS = ['all', 'needs_attention', 'active', 'resolved']
const LANG_FILTERS = ['all', 'hinglish', 'hindi', 'english']

const statusLabel = { all: 'All', needs_attention: '⚠️ Attention', active: 'Active', resolved: 'Resolved' }
const langLabel = { all: 'All Languages', hinglish: '🔀 Hinglish', hindi: '🇮🇳 Hindi', english: '🇬🇧 English' }

export default function ConversationsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [langFilter, setLangFilter] = useState('all')

  const filtered = mockConversations.filter(c => {
    const matchSearch = !search ||
      c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      c.last_message.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    const matchLang = langFilter === 'all' || c.detected_language === langFilter
    return matchSearch && matchStatus && matchLang
  })

  // Sort: needs_attention first, then by time
  const sorted = [...filtered].sort((a, b) => {
    if (a.status === 'needs_attention' && b.status !== 'needs_attention') return -1
    if (b.status === 'needs_attention' && a.status !== 'needs_attention') return 1
    return new Date(b.last_message_at) - new Date(a.last_message_at)
  })

  return (
    <div className="p-4 lg:p-6 page-enter max-w-4xl mx-auto">
      <PageHeader
        title="Conversations"
        titleHi="बातचीत"
        description={`${mockConversations.filter(c => c.status === 'needs_attention').length} need your attention`}
      />

      {/* Search & Filters */}
      <div className="space-y-3 mb-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by customer name or message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  'px-3 py-1.5 text-xs font-600 transition-base',
                  statusFilter === s ? 'bg-brand-600 text-white' : 'text-neutral-600 hover:bg-neutral-50'
                )}
              >
                {statusLabel[s]}
              </button>
            ))}
          </div>
          <div className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden">
            {LANG_FILTERS.map(l => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={clsx(
                  'px-3 py-1.5 text-xs font-600 transition-base',
                  langFilter === l ? 'bg-brand-600 text-white' : 'text-neutral-600 hover:bg-neutral-50'
                )}
              >
                {langLabel[l]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-neutral-400 mb-3">
        Showing {sorted.length} of {mockConversations.length} conversations
      </p>

      {/* Conversation List */}
      {sorted.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No conversations yet"
          description="Once a customer messages you on WhatsApp, it'll show up here. Share your WhatsApp number to get started!"
        />
      ) : (
        <div className="space-y-2">
          {sorted.map(conv => (
            <Link
              key={conv.id}
              to={`/dashboard/conversations/${conv.id}`}
              className={clsx(
                'flex items-center gap-3.5 p-4 rounded-2xl bg-white border transition-all hover:shadow-md group',
                conv.status === 'needs_attention'
                  ? 'border-danger-200 hover:border-danger-300'
                  : 'border-neutral-200 hover:border-brand-200'
              )}
            >
              {/* Avatar */}
              <div className={clsx(
                'w-11 h-11 rounded-full flex items-center justify-center text-base font-800 flex-shrink-0',
                conv.status === 'needs_attention' ? 'bg-danger-100 text-danger-600' : 'bg-brand-100 text-brand-700'
              )}>
                {conv.customer_name[0]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-sm font-700 text-neutral-900">{conv.customer_name}</span>
                  <StatusBadge status={conv.status} />
                  <LangBadge lang={conv.detected_language} />
                </div>
                <p className="text-sm text-neutral-500 truncate">{conv.last_message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-400">{conv.message_count} messages</span>
                  <span className="text-neutral-200">•</span>
                  <span className="text-xs text-neutral-400">
                    {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                  </span>
                  {conv.status === 'needs_attention' && (
                    <>
                      <span className="text-neutral-200">•</span>
                      <span className="text-xs font-600 text-danger-600">
                        AI confidence: {Math.round(conv.ai_confidence_score * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
