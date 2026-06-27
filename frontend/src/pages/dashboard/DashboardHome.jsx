import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquare, ShoppingBag, Zap, Clock, TrendingUp,
  AlertTriangle, ChevronRight, Bot, User
} from 'lucide-react'
import { mockStats, mockConversations, mockOrders } from '../../mock/data'
import { StatCard, StatusBadge, LangBadge } from '../../components/ui'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

function PendingAlertCard({ conversations }) {
  const pending = conversations.filter(c => c.status === 'needs_attention')
  if (pending.length === 0) return null

  return (
    <div style={{
      background:'#faf4e8',
      border:'1.5px solid #f9c8c6',
      borderRadius:4, padding:'20px 20px', marginBottom:24,
      boxShadow:'3px 5px 18px rgba(224,90,84,0.1)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Blush torn-paper left accent */}
      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:5, background:'linear-gradient(180deg,#f4a5a1,#e05a54)' }} />
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16, paddingLeft:8 }}>
        <div style={{ position:'relative' }}>
          <div style={{ width:42, height:42, background:'linear-gradient(135deg,#f4a5a1,#e05a54)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 4px 10px rgba(224,90,84,0.3)' }}>
            <AlertTriangle size={20} color="#fdf8f0" />
          </div>
          <span style={{
            position:'absolute', top:-6, right:-6, width:20, height:20,
            background:'#cc3d37', color:'#fdf8f0',
            fontSize:11, fontWeight:800, borderRadius:'50%',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Inter, sans-serif',
          }}>{pending.length}</span>
        </div>
        <div>
          <h2 style={{ fontFamily:'"Playfair Display", serif', fontWeight:800, color:'#8a2620', fontSize:17, marginBottom:2 }}>
            Needs Your Attention / आपका ध्यान चाहिए
          </h2>
          <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#b03330' }}>
            {pending.length} conversation{pending.length > 1 ? 's' : ''} where AI wasn't confident — please respond manually
          </p>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8, paddingLeft:8 }}>
        {pending.map(conv => (
          <Link
            key={conv.id}
            to={`/dashboard/conversations/${conv.id}`}
            style={{
              display:'flex', alignItems:'center', gap:12, padding:'10px 14px',
              background:'rgba(253,248,240,0.8)', borderRadius:4,
              border:'1px solid #f9c8c6', textDecoration:'none',
              transition:'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#fdf8f0'; e.currentTarget.style.borderColor='#ec7e79'; e.currentTarget.style.boxShadow='2px 3px 10px rgba(224,90,84,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(253,248,240,0.8)'; e.currentTarget.style.borderColor='#f9c8c6'; e.currentTarget.style.boxShadow='none' }}
          >
            <div style={{ width:34, height:34, borderRadius:'50%', background:'#fce4e3', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:800, color:'#b03330', flexShrink:0 }}>
              {conv.customer_name[0]}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:700, color:'#1e2d3d' }}>{conv.customer_name}</span>
                <LangBadge lang={conv.detected_language} />
              </div>
              <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#8a7560', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:2 }}>{conv.last_message}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
              <span style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a' }}>
                {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
              </span>
              <ChevronRight size={15} style={{ color:'#f4a5a1' }} />
            </div>
          </Link>
        ))}
      </div>

      <Link to="/dashboard/conversations" style={{
        marginTop:12, display:'flex', alignItems:'center', justifyContent:'center', gap:4,
        fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:700, color:'#b03330',
        textDecoration:'none', padding:'8px 0',
      }}>
        View all conversations <ChevronRight size={15} />
      </Link>
    </div>
  )
}

function RecentConversations({ conversations }) {
  const recent = conversations.slice(0, 5)
  return (
    <div style={{ background:'#faf4e8', borderRadius:4, border:'1px solid #e8d9bc', boxShadow:'2px 4px 14px rgba(30,45,61,0.07)', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid #e8d9bc' }}>
        <div>
          <h3 style={{ fontFamily:'"Playfair Display", serif', fontWeight:700, color:'#1e2d3d', fontSize:16 }}>Recent Conversations</h3>
          <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', marginTop:2 }}>हाल की बातचीत</p>
        </div>
        <Link to="/dashboard/conversations" style={{
          fontFamily:'Inter, sans-serif', fontSize:13, color:'#2e7a6c', fontWeight:700,
          display:'flex', alignItems:'center', gap:4, textDecoration:'none',
        }}>View all <ChevronRight size={15} /></Link>
      </div>
      <div>
        {recent.map(conv => (
          <Link
            key={conv.id}
            to={`/dashboard/conversations/${conv.id}`}
            style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 20px',
              borderBottom:'1px solid #f2e8d5', textDecoration:'none',
              transition:'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#f2e8d5'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >
            <div style={{
              width:36, height:36, borderRadius:'50%', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:800,
              background: conv.status === 'needs_attention' ? '#fce4e3' : '#d6ede6',
              color: conv.status === 'needs_attention' ? '#b03330' : '#226358',
            }}>{conv.customer_name[0]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:700, color:'#1e2d3d' }}>{conv.customer_name}</span>
                <StatusBadge status={conv.status} />
              </div>
              <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#8a7560', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:2 }}>{conv.last_message}</p>
            </div>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', flexShrink:0 }}>
              {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function RecentOrders({ orders }) {
  const recent = orders.slice(0, 4)
  return (
    <div style={{ background:'#faf4e8', borderRadius:4, border:'1px solid #e8d9bc', boxShadow:'2px 4px 14px rgba(30,45,61,0.07)', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid #e8d9bc' }}>
        <div>
          <h3 style={{ fontFamily:'"Playfair Display", serif', fontWeight:700, color:'#1e2d3d', fontSize:16 }}>Recent Orders</h3>
          <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', marginTop:2 }}>हाल के ऑर्डर</p>
        </div>
        <Link to="/dashboard/orders" style={{
          fontFamily:'Inter, sans-serif', fontSize:13, color:'#2e7a6c', fontWeight:700,
          display:'flex', alignItems:'center', gap:4, textDecoration:'none',
        }}>View all <ChevronRight size={15} /></Link>
      </div>
      <div>
        {recent.map(order => (
          <div key={order.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 20px', borderBottom:'1px solid #f2e8d5' }}>
            <div style={{ width:36, height:36, borderRadius:4, background:'#fef0c7', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid #f8c832' }}>
              <ShoppingBag size={16} style={{ color:'#7a4f10' }} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:700, color:'#1e2d3d' }}>{order.customer_name}</span>
                <StatusBadge status={order.source} />
              </div>
              <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#8a7560', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:2 }}>
                {order.items.map(i => i.name).join(', ')}
              </p>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <p style={{ fontFamily:'"Playfair Display", serif', fontSize:15, fontWeight:700, color:'#1e2d3d' }}>₹{order.total_amount.toLocaleString()}</p>
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeeklyChart() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const data = [14,19,8,24,18,31,22]
  const max  = Math.max(...data)
  const barColors = ['#aed9cc','#52a596','#d6ede6','#3d9080','#7bbfb0','#2e7a6c','#52a596']

  return (
    <div style={{ background:'#faf4e8', borderRadius:4, border:'1px solid #e8d9bc', padding:'20px', boxShadow:'2px 4px 14px rgba(30,45,61,0.07)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div>
          <h3 style={{ fontFamily:'"Playfair Display", serif', fontWeight:700, color:'#1e2d3d', fontSize:16 }}>This Week</h3>
          <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', marginTop:2 }}>इस हफ्ते के मैसेज</p>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:4,
          fontFamily:'Inter, sans-serif', fontSize:11, color:'#1a6648', fontWeight:700,
          background:'#d0f0e3', padding:'4px 10px', borderRadius:999, border:'1px solid #a5dfc5',
        }}>
          <TrendingUp size={13} /> +12% vs last week
        </div>
      </div>

      {/* Bar chart — paper strips */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:96 }}>
        {data.map((val,i) => (
          <div key={days[i]} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
            <div
              className="tooltip"
              data-tip={`${val} messages`}
              style={{
                width:'100%', borderRadius:'3px 3px 0 0',
                background:barColors[i],
                height:`${(val/max)*100}%`, minHeight:4,
                boxShadow:'1px 2px 6px rgba(30,45,61,0.1)',
                transition:'opacity 0.2s', cursor:'default',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}
            />
            <span style={{ fontFamily:'Inter, sans-serif', fontSize:10, color:'#b8a88a' }}>{days[i]}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #e8d9bc', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Inter, sans-serif', fontSize:13, color:'#6b5c48' }}>
          <Bot size={15} style={{ color:'#52a596' }} /> AI handled
          <span style={{ fontWeight:800, color:'#2e7a6c' }}>92%</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Inter, sans-serif', fontSize:13, color:'#6b5c48' }}>
          <User size={15} style={{ color:'#b8a88a' }} /> Manual
          <span style={{ fontWeight:800, color:'#6b5c48' }}>8%</span>
        </div>
      </div>
    </div>
  )
}

export default function DashboardHome() {
  const stats = mockStats

  return (
    <div style={{ padding:'24px', maxWidth:1100, margin:'0 auto' }} className="page-enter">
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:'"Playfair Display", serif', fontSize:22, fontWeight:800, color:'#1e2d3d' }}>
          Good evening, Rajesh 👋
        </h1>
        <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#8a7560', marginTop:4 }}>
          Here's what's happening at Krishna Fashions today
        </p>
      </div>

      {/* Pending attention alert */}
      <PendingAlertCard conversations={mockConversations} />

      {/* Stats grid — with alternating tilts */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:24 }}
        className="lg:grid-cols-4">
        <StatCard icon={MessageSquare} label="Conversations Today" value={stats.conversations_today}
          sub="आज की बातचीत" iconBg="bg-sage-100" iconColor="text-sage-700" trend={18} tilt={1} />
        <StatCard icon={ShoppingBag}  label="Orders This Week"    value={stats.orders_this_week}
          sub="इस हफ्ते के ऑर्डर" iconBg="bg-blush-100" iconColor="text-blush-600" trend={5} tilt={-1} />
        <StatCard icon={Clock}        label="Avg. Response"       value={`${stats.avg_response_time_seconds}s`}
          sub="औसत जवाब का समय" iconBg="bg-sage-100" iconColor="text-sage-700" trend={-20} tilt={1} />
        <StatCard icon={Zap}          label="AI Handled"          value={`${stats.ai_handled_percent}%`}
          sub="AI ने खुद handle किए" iconBg="bg-marigold-300" iconColor="text-navy-800" tilt={-1} />
      </div>

      {/* Main grid */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <RecentConversations conversations={mockConversations} />
          <RecentOrders orders={mockOrders} />
        </div>
        <div>
          <WeeklyChart />
        </div>
      </div>
    </div>
  )
}
