import { useState } from 'react'
import { ShoppingBag, Download, Search, ChevronDown, Edit2, Check, X } from 'lucide-react'
import { mockOrders } from '../../mock/data'
import { StatusBadge, EmptyState, PageHeader, Button } from '../../components/ui'
import { format } from 'date-fns'
import clsx from 'clsx'

const STATUS_OPTIONS = ['pending', 'confirmed', 'fulfilled', 'cancelled']
const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'fulfilled', 'cancelled']
const SOURCE_FILTERS = ['all', 'ai_extracted', 'manual']

function exportCSV(orders) {
  const rows = [
    ['Order ID', 'Customer', 'Phone', 'Items', 'Total (₹)', 'Address', 'Status', 'Source', 'Date'],
    ...orders.map(o => [
      o.id,
      o.customer_name,
      o.customer_phone,
      o.items.map(i => `${i.name} x${i.qty}`).join(' | '),
      o.total_amount,
      o.delivery_address,
      o.status,
      o.source,
      format(new Date(o.created_at), 'dd MMM yyyy HH:mm'),
    ])
  ]
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function OrderRow({ order, onStatusChange }) {
  const [editing, setEditing] = useState(false)
  const [status, setStatus] = useState(order.status)

  const saveStatus = () => {
    onStatusChange(order.id, status)
    setEditing(false)
  }

  const totalItems = order.items.reduce((s, i) => s + i.qty, 0)

  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-base">
      <td className="px-4 py-3.5">
        <span className="text-sm font-700 text-brand-600">{order.id}</span>
      </td>
      <td className="px-4 py-3.5">
        <div>
          <p className="text-sm font-600 text-neutral-800">{order.customer_name}</p>
          <p className="text-xs text-neutral-400">{order.customer_phone}</p>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="max-w-48">
          {order.items.map((item, i) => (
            <p key={i} className="text-xs text-neutral-600 truncate">
              {item.name} ×{item.qty}
            </p>
          ))}
          <p className="text-xs text-neutral-400 mt-0.5">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-sm font-800 text-neutral-900">₹{order.total_amount.toLocaleString()}</span>
      </td>
      <td className="px-4 py-3.5">
        <p className="text-xs text-neutral-600 max-w-40 truncate" title={order.delivery_address}>
          {order.delivery_address}
        </p>
      </td>
      <td className="px-4 py-3.5">
        {editing ? (
          <div className="flex items-center gap-1">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="text-xs border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-400"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <button onClick={saveStatus} className="p-1 text-success-600 hover:bg-success-50 rounded"><Check className="w-3.5 h-3.5" /></button>
            <button onClick={() => { setStatus(order.status); setEditing(false) }} className="p-1 text-neutral-400 hover:bg-neutral-100 rounded"><X className="w-3.5 h-3.5" /></button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <StatusBadge status={status} />
            <button onClick={() => setEditing(true)} className="p-1 text-neutral-300 hover:text-neutral-500 transition-base">
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={order.source} />
      </td>
      <td className="px-4 py-3.5">
        <span className="text-xs text-neutral-400">{format(new Date(order.created_at), 'dd MMM, h:mm a')}</span>
      </td>
    </tr>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const matchSource = sourceFilter === 'all' || o.source === sourceFilter
    return matchSearch && matchStatus && matchSource
  })

  const handleStatusChange = (id, newStatus) => {
    setOrders(o => o.map(order => order.id === id ? { ...order, status: newStatus } : order))
  }

  const totalRevenue = filtered.reduce((s, o) => o.status !== 'cancelled' ? s + o.total_amount : s, 0)

  return (
    <div className="p-4 lg:p-6 page-enter">
      <PageHeader
        title="Orders"
        titleHi="ऑर्डर"
        description={`${filtered.length} orders • ₹${totalRevenue.toLocaleString()} total`}
        action={
          <Button onClick={() => exportCSV(filtered)} variant="secondary">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        }
      />

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Orders', value: orders.length, color: 'bg-neutral-100 text-neutral-700' },
          { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'bg-warning-100 text-warning-700' },
          { label: 'Confirmed', value: orders.filter(o => o.status === 'confirmed').length, color: 'bg-brand-100 text-brand-700' },
          { label: 'Fulfilled', value: orders.filter(o => o.status === 'fulfilled').length, color: 'bg-success-100 text-success-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-xl p-3 ${color} flex items-center justify-between`}>
            <span className="text-sm font-500">{label}</span>
            <span className="text-xl font-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400"
          />
        </div>
        <div className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {STATUS_FILTERS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={clsx('px-3 py-2 text-xs font-600 transition-base capitalize',
                statusFilter === s ? 'bg-brand-600 text-white' : 'text-neutral-600 hover:bg-neutral-50'
              )}>
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
        <div className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {SOURCE_FILTERS.map(s => (
            <button key={s} onClick={() => setSourceFilter(s)}
              className={clsx('px-3 py-2 text-xs font-600 transition-base',
                sourceFilter === s ? 'bg-brand-600 text-white' : 'text-neutral-600 hover:bg-neutral-50'
              )}>
              {s === 'all' ? 'All Sources' : s === 'ai_extracted' ? '🤖 AI' : '✏️ Manual'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders yet"
          description="Once a customer places an order via WhatsApp, it'll automatically appear here. No orders match your current filters."
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  {['Order ID', 'Customer', 'Items', 'Total', 'Address', 'Status', 'Source', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-700 text-neutral-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              Showing {filtered.length} orders
            </p>
            <p className="text-sm font-700 text-neutral-800">
              Total Revenue: <span className="text-brand-600">₹{totalRevenue.toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
