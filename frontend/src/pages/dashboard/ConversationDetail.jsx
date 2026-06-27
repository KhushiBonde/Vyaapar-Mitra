import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bot, User, AlertTriangle, CheckCircle, Send, ShoppingBag, Phone, Clock, Zap, X } from 'lucide-react'
import { mockConversations, mockMessages, mockOrders } from '../../mock/data'
import { StatusBadge, LangBadge, ConfidenceBar, Button } from '../../components/ui'
import { format } from 'date-fns'
import clsx from 'clsx'

function ChatBubble({ msg }) {
  const isOutbound = msg.direction === 'outbound'
  const isAI = msg.sender_type === 'ai'
  const isHuman = msg.sender_type === 'human_owner'

  const bubbleClass = isOutbound
    ? (isAI ? 'bubble-ai' : 'bubble-human')
    : 'bubble-customer'

  return (
    <div className={clsx('flex flex-col gap-1', isOutbound ? 'items-end' : 'items-start')}>
      {/* Sender tag */}
      <div className={clsx('flex items-center gap-1.5', isOutbound ? 'flex-row-reverse' : 'flex-row')}>
        {isOutbound && isAI && (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Bot className="w-3 h-3 text-brand-500" />
            <span className="text-brand-500 font-600">Vyaapar Mitra</span>
          </div>
        )}
        {isOutbound && isHuman && (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <User className="w-3 h-3 text-accent-500" />
            <span className="text-accent-500 font-600">You</span>
          </div>
        )}
        {!isOutbound && <span className="text-xs text-neutral-400">Customer</span>}
      </div>

      {/* Bubble */}
      <div className={clsx('px-4 py-2.5 text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed', bubbleClass)}>
        {msg.content}
      </div>

      {/* Meta */}
      <div className={clsx('flex items-center gap-2', isOutbound ? 'flex-row-reverse' : 'flex-row')}>
        <span className="text-xs text-neutral-400">{format(new Date(msg.sent_at), 'h:mm a')}</span>
        {isOutbound && isAI && msg.confidence && (
          <span className={clsx('text-xs font-600', msg.confidence >= 0.7 ? 'text-success-600' : msg.confidence >= 0.5 ? 'text-warning-600' : 'text-danger-600')}>
            {Math.round(msg.confidence * 100)}% confidence
          </span>
        )}
        {msg.detected_intent && !isOutbound && (
          <span className="badge badge-neutral text-xs">{msg.detected_intent.replace(/_/g, ' ')}</span>
        )}
      </div>
    </div>
  )
}

function OrderSideCard({ conv }) {
  const order = mockOrders.find(o => o.customer_phone === conv?.customer_phone)
  if (!order) return null

  return (
    <div className="card p-4 border-brand-200 bg-brand-50/50">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingBag className="w-4 h-4 text-brand-600" />
        <h4 className="text-sm font-700 text-brand-800">AI Extracted Order</h4>
        <StatusBadge status="ai_extracted" />
      </div>
      <div className="space-y-1.5 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-neutral-700">{item.name} ×{item.qty}</span>
            <span className="font-600 text-neutral-900">₹{(item.qty * item.unit_price).toLocaleString()}</span>
          </div>
        ))}
        <div className="pt-1.5 border-t border-brand-200 flex justify-between">
          <span className="text-sm font-700 text-neutral-800">Total</span>
          <span className="text-sm font-800 text-brand-700">₹{order.total_amount.toLocaleString()}</span>
        </div>
      </div>
      {order.delivery_address && (
        <p className="text-xs text-neutral-500 bg-white rounded-lg px-2 py-1.5 border border-neutral-200">
          📍 {order.delivery_address}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="flex-1">Confirm Order</Button>
        <Button size="sm" variant="secondary">Edit</Button>
      </div>
    </div>
  )
}

export default function ConversationDetail() {
  const { id } = useParams()
  const conv = mockConversations.find(c => c.id === id)
  const messages = mockMessages[id] || []
  const [humanMode, setHumanMode] = useState(conv?.status === 'needs_attention')
  const [reply, setReply] = useState('')
  const [localMessages, setLocalMessages] = useState(messages)
  const [resolved, setResolved] = useState(conv?.status === 'resolved')

  if (!conv) return (
    <div className="p-6 text-center text-neutral-500">Conversation not found.</div>
  )

  const sendReply = () => {
    if (!reply.trim()) return
    const newMsg = {
      id: `new-${Date.now()}`,
      direction: 'outbound',
      sender_type: 'human_owner',
      content: reply,
      sent_at: new Date().toISOString(),
      detected_intent: null,
      confidence: null,
    }
    setLocalMessages(m => [...m, newMsg])
    setReply('')
  }

  return (
    <div className="flex h-[calc(100vh-56px)] page-enter">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <Link to="/dashboard/conversations" className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-base">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className={clsx(
            'w-9 h-9 rounded-full flex items-center justify-center text-sm font-800 flex-shrink-0',
            conv.status === 'needs_attention' ? 'bg-danger-100 text-danger-600' : 'bg-brand-100 text-brand-600'
          )}>
            {conv.customer_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-700 text-neutral-900">{conv.customer_name}</span>
              <StatusBadge status={conv.status} />
              <LangBadge lang={conv.detected_language} />
            </div>
            <p className="text-xs text-neutral-400">{conv.customer_phone} • {messages.length} messages</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {conv.status === 'needs_attention' && !humanMode && (
              <Button variant="danger" size="sm" onClick={() => setHumanMode(true)}>
                <User className="w-4 h-4" /> Take Over
              </Button>
            )}
            {humanMode && (
              <div className="flex items-center gap-1.5 bg-accent-50 border border-accent-200 rounded-lg px-2.5 py-1.5">
                <User className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-700 text-accent-700">Human Mode</span>
                <button onClick={() => setHumanMode(false)} className="ml-1 text-accent-400 hover:text-accent-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {!resolved && (
              <Button variant="secondary" size="sm" onClick={() => setResolved(true)}>
                <CheckCircle className="w-4 h-4 text-success-500" /> Resolve
              </Button>
            )}
            {resolved && (
              <span className="badge badge-success">✓ Resolved</span>
            )}
          </div>
        </div>

        {/* AI Paused Banner */}
        {humanMode && (
          <div className="bg-accent-50 border-b border-accent-200 px-4 py-2.5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent-600 flex-shrink-0" />
            <span className="text-sm text-accent-700 font-500">
              <strong>AI is paused.</strong> You're now responding manually. Click × to re-enable AI.
            </span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-neutral-50">
          {localMessages.map(msg => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
          {localMessages.length === 0 && (
            <div className="text-center text-neutral-400 text-sm py-10">
              No messages yet in this conversation.
            </div>
          )}
        </div>

        {/* Reply Box */}
        {humanMode && (
          <div className="bg-white border-t border-neutral-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Type your reply to the customer..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 resize-none"
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply() } }}
                />
                <p className="text-xs text-neutral-400 mt-1">Press Enter to send, Shift+Enter for new line</p>
              </div>
              <Button onClick={sendReply} disabled={!reply.trim()} className="flex-shrink-0 mb-5">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {!humanMode && !resolved && (
          <div className="bg-white border-t border-neutral-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-center gap-2 py-2 text-sm text-neutral-400">
              <Bot className="w-4 h-4 text-brand-400" />
              <span>AI is handling this conversation automatically</span>
              <button onClick={() => setHumanMode(true)} className="text-brand-600 font-600 hover:underline ml-1">
                Take over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-72 flex-shrink-0 border-l border-neutral-200 bg-white overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-neutral-100">
          <h3 className="text-sm font-700 text-neutral-800 mb-3">Customer Info</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">{conv.customer_phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-600">{conv.message_count} messages total</span>
            </div>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="p-4 border-b border-neutral-100">
          <h3 className="text-sm font-700 text-neutral-800 mb-3">AI Confidence</h3>
          <ConfidenceBar score={conv.ai_confidence_score} />
          {conv.ai_confidence_score < 0.6 && (
            <p className="text-xs text-danger-600 mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Low confidence — manual reply recommended
            </p>
          )}
        </div>

        {/* Detected Intent */}
        <div className="p-4 border-b border-neutral-100">
          <h3 className="text-sm font-700 text-neutral-800 mb-2">Detected Intent</h3>
          <span className="badge badge-brand">{conv.intent?.replace(/_/g, ' ')}</span>
        </div>

        {/* Extracted Order */}
        <div className="p-4">
          <OrderSideCard conv={conv} />
          {!mockOrders.find(o => o.customer_phone === conv?.customer_phone) && (
            <div className="text-xs text-neutral-400 text-center py-4">
              <ShoppingBag className="w-8 h-8 text-neutral-200 mx-auto mb-2" />
              No order extracted yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
