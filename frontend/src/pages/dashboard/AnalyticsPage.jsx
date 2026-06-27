import { useState } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
} from 'recharts'
import { mockAnalytics } from '../../mock/data'
import { PageHeader } from '../../components/ui'
import { TrendingUp, MessageSquare, ShoppingBag, Languages, HelpCircle } from 'lucide-react'
import clsx from 'clsx'

const TABS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'faqs', label: 'FAQ Insights', icon: HelpCircle },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
]

const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'This month']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-lg px-3 py-2">
      <p className="text-xs font-700 text-neutral-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

function OverviewTab() {
  const { intent_breakdown, hourly_messages } = mockAnalytics
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* Intent Pie */}
      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Customer Intent Breakdown</h3>
        <p className="text-xs text-neutral-400 mb-4">What customers are asking about</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={intent_breakdown} dataKey="count" nameKey="intent" cx="50%" cy="50%" outerRadius={80} paddingAngle={2}>
              {intent_breakdown.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(val, name) => [val, name]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {intent_breakdown.map(({ intent, count, color }) => (
            <div key={intent} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-xs text-neutral-600 truncate">{intent}</span>
              <span className="text-xs font-700 text-neutral-800 ml-auto">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Bar */}
      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Busiest Hours</h3>
        <p className="text-xs text-neutral-400 mb-4">When customers message you most</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={hourly_messages} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0efee" />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#a8a29e' }} />
            <YAxis tick={{ fontSize: 11, fill: '#a8a29e' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="messages" name="Messages" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI vs Human */}
      <div className="card p-5 lg:col-span-2">
        <h3 className="font-display font-700 text-neutral-900 mb-4">AI vs Human Response Ratio</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-1.5 font-600 text-brand-600">🤖 AI Handled <span className="text-neutral-500 font-400">/ AI ने handle किया</span></span>
              <span className="font-800 text-brand-700">92%</span>
            </div>
            <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Total Messages', value: '1,248', sub: 'This month' },
            { label: 'AI Handled', value: '1,148', sub: '92% automated' },
            { label: 'Human Takeovers', value: '100', sub: '8% manual' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-neutral-50 rounded-xl p-3 text-center">
              <p className="text-xl font-800 text-neutral-900">{value}</p>
              <p className="text-xs font-600 text-neutral-700 mt-0.5">{label}</p>
              <p className="text-xs text-neutral-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqTab() {
  const { top_faqs, unanswered } = mockAnalytics
  const maxTriggers = Math.max(...top_faqs.map(f => f.triggers))

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Most Triggered FAQs</h3>
        <p className="text-xs text-neutral-400 mb-4">Questions AI answered most often</p>
        <div className="space-y-3">
          {top_faqs.map(({ question, triggers }, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-neutral-700 font-500 truncate pr-2">{question}</span>
                <span className="text-brand-600 font-700 flex-shrink-0">{triggers}×</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-400 rounded-full transition-all" style={{ width: `${(triggers / maxTriggers) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Unanswered Questions</h3>
        <p className="text-xs text-neutral-400 mb-4">Add these to your FAQs to improve AI responses</p>
        <div className="space-y-2">
          {unanswered.map(({ question, count }, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-warning-100 rounded-xl border border-warning-200">
              <div>
                <p className="text-sm font-600 text-neutral-800">"{question}"</p>
                <p className="text-xs text-warning-700 mt-0.5">Asked {count} times — no FAQ match found</p>
              </div>
              <button className="ml-3 text-xs font-600 text-brand-600 hover:text-brand-700 whitespace-nowrap">
                + Add FAQ
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
          <p className="text-xs text-brand-700">
            💡 <strong>Tip:</strong> Adding FAQs for unanswered questions improves AI accuracy and reduces manual takeovers.
          </p>
        </div>
      </div>
    </div>
  )
}

function LanguageTab() {
  const { language_breakdown } = mockAnalytics
  const colors = { Hinglish: '#14b8a6', Hindi: '#6366f1', English: '#f59e0b' }

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Language Distribution</h3>
        <p className="text-xs text-neutral-400 mb-5">How customers communicate with you</p>
        <div className="space-y-4">
          {language_breakdown.map(({ language, percent }) => (
            <div key={language}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-600 text-neutral-800">{language}</span>
                <span className="font-800" style={{ color: colors[language] }}>{percent}%</span>
              </div>
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, background: colors[language] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-700 text-neutral-900 mb-4">AI Language Settings</h3>
        <div className="space-y-3">
          <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
            <p className="text-sm font-700 text-brand-800">Current Default Language</p>
            <p className="text-2xl font-800 text-brand-600 mt-1">Hinglish</p>
            <p className="text-xs text-brand-600 mt-1">AI will match customer's language automatically</p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-sm font-700 text-neutral-700">Reply Tone</p>
            <p className="text-base font-600 text-neutral-900 mt-0.5">Friendly / दोस्ताना</p>
          </div>
          <p className="text-xs text-neutral-400">
            Change language and tone settings in <strong>Settings → AI Behavior</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

function OrdersTab() {
  const { weekly_orders } = mockAnalytics
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="card p-5 lg:col-span-2">
        <h3 className="font-display font-700 text-neutral-900 mb-1">Weekly Orders & Revenue</h3>
        <p className="text-xs text-neutral-400 mb-4">Orders placed this week via WhatsApp</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weekly_orders} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0efee" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#a8a29e' }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#a8a29e' }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#a8a29e' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue (₹)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {[
        { label: 'This Week\'s Orders', value: '31', sub: '+5 vs last week', color: 'text-brand-600' },
        { label: 'This Week\'s Revenue', value: '₹45,100', sub: 'All confirmed orders', color: 'text-accent-600' },
        { label: 'Best Day', value: 'Saturday', sub: '8 orders, ₹12,400', color: 'text-success-600' },
        { label: 'Avg. Order Value', value: '₹1,455', sub: 'Across all orders', color: 'text-warning-600' },
      ].map(({ label, value, sub, color }) => (
        <div key={label} className="card p-4">
          <p className="text-sm text-neutral-500 mb-1">{label}</p>
          <p className={`text-2xl font-display font-800 ${color}`}>{value}</p>
          <p className="text-xs text-neutral-400 mt-1">{sub}</p>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('Last 7 days')

  const tabContent = { overview: <OverviewTab />, faqs: <FaqTab />, language: <LanguageTab />, orders: <OrdersTab /> }

  return (
    <div className="p-4 lg:p-6 page-enter">
      <PageHeader
        title="Analytics"
        titleHi="एनालिटिक्स"
        description="Insights into your WhatsApp business activity"
        action={
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="text-sm border border-neutral-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-brand-400"
          >
            {DATE_RANGES.map(r => <option key={r}>{r}</option>)}
          </select>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-2xl p-1 mb-6 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 transition-all',
              activeTab === id ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabContent[activeTab]}
    </div>
  )
}
