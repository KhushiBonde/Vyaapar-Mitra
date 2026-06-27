import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, MessageSquare, ShoppingBag,
  BarChart3, Settings, LogOut, Menu, X,
  Zap, Bell, ChevronDown, Store
} from 'lucide-react'
import { mockStats } from '../mock/data'
import clsx from 'clsx'

const navItems = [
  { to: '/dashboard',                   label: 'Dashboard',    labelHi: 'होम',           icon: LayoutDashboard, end: true },
  { to: '/dashboard/conversations',     label: 'Conversations',labelHi: 'बातचीत',       icon: MessageSquare },
  { to: '/dashboard/orders',            label: 'Orders',       labelHi: 'ऑर्डर',        icon: ShoppingBag },
  { to: '/dashboard/analytics',         label: 'Analytics',    labelHi: 'एनालिटिक्स',  icon: BarChart3 },
  { to: '/dashboard/settings',          label: 'Settings',     labelHi: 'सेटिंग्स',     icon: Settings },
]

/* Nav icon accent colors per item */
const navAccent = ['#52a596','#e05a54','#f8c832','#4a90c4','#8a7560']

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pendingCount = mockStats.pending_attention

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{ display:'flex', height:'100vh', background:'#fdf8f0', overflow:'hidden' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(30,45,61,0.45)', zIndex:40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={clsx('sidebar-transition', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}
        style={{
          position: 'fixed', top:0, bottom:0, left:0, zIndex:50, width:256,
          background:'#faf4e8',
          borderRight:'1px solid #e8d9bc',
          display:'flex', flexDirection:'column',
          boxShadow:'2px 0 16px rgba(30,45,61,0.06)',
        }}>

        {/* Sage left stripe accent */}
        <div style={{ position:'absolute', top:0, left:0, bottom:0, width:4, background:'linear-gradient(180deg,#52a596,#2e7a6c,#52a596)', borderRadius:'0 2px 2px 0' }} />

        {/* Logo area */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'18px 16px 18px 20px', borderBottom:'1px solid #e8d9bc' }}>
          <div style={{
            width:40, height:40, borderRadius:4, flexShrink:0,
            background:'linear-gradient(135deg,#52a596,#2e7a6c)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'3px 4px 12px rgba(46,122,108,0.25)',
            transform:'rotate(-2deg)',
          }}>
            <Zap size={20} color="#fdf8f0" />
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'"Playfair Display", Georgia, serif', fontWeight:800, fontSize:16, color:'#1e2d3d', lineHeight:1.1 }}>Vyaapar Mitra</div>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:10, color:'#52a596', fontWeight:600, marginTop:1 }}>Smart Business Assistant</p>
          </div>
          <button
            style={{ color:'#b8a88a', background:'none', border:'none', cursor:'pointer', display:'none' }}
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Business info card */}
        <div style={{ margin:'12px 12px 4px', padding:'10px 12px', background:'#f2e8d5', borderRadius:4, border:'1px solid #e8d9bc' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:4, background:'linear-gradient(135deg,#52a596,#2e7a6c)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Store size={16} color="#fdf8f0" />
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:700, color:'#1e2d3d', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.business_name}</p>
              <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#8a7560', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.whatsapp_number}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex:1, padding:'8px 8px', overflowY:'auto', display:'flex', flexDirection:'column', gap:2 }}>
          {navItems.map(({ to, label, labelHi, icon: Icon, end }, idx) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display:'flex', alignItems:'center', gap:10,
                padding:'10px 12px', borderRadius:4,
                fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:600,
                textDecoration:'none',
                background: isActive ? '#d6ede6' : 'transparent',
                color: isActive ? '#226358' : '#6b5c48',
                borderLeft: isActive ? `3px solid ${navAccent[idx]}` : '3px solid transparent',
                transition:'all 0.2s ease',
              })}
              onMouseEnter={e => { if (!e.currentTarget.style.background.includes('d6ede6')) e.currentTarget.style.background='#f2e8d5' }}
              onMouseLeave={e => { if (!e.currentTarget.style.background.includes('d6ede6')) e.currentTarget.style.background='transparent' }}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} style={{ flexShrink:0, color: isActive ? navAccent[idx] : '#b8a88a' }} />
                  <span style={{ flex:1 }}>{label}</span>
                  <span style={{ fontSize:10, color:'#b8a88a', fontWeight:400 }}>{labelHi}</span>
                  {label === 'Conversations' && pendingCount > 0 && (
                    <span style={{
                      marginLeft:4, background:'#e05a54', color:'#fff',
                      fontSize:11, fontWeight:700, borderRadius:'50%',
                      width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center',
                    }}>{pendingCount}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding:'8px', borderTop:'1px solid #e8d9bc' }}>
          <button
            onClick={handleLogout}
            style={{
              width:'100%', display:'flex', alignItems:'center', gap:10,
              padding:'10px 12px', borderRadius:4, border:'none', cursor:'pointer',
              fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:600,
              color:'#6b5c48', background:'transparent',
              transition:'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#fce4e3'; e.currentTarget.style.color='#b03330' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6b5c48' }}
          >
            <LogOut size={18} style={{ color:'#b8a88a' }} />
            <span>Logout / लॉगआउट</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0, marginLeft:256 }}>
        {/* Top header */}
        <header style={{
          background:'#faf4e8',
          borderBottom:'1px solid #e8d9bc',
          padding:'0 24px', height:58,
          display:'flex', alignItems:'center', gap:16, flexShrink:0,
          boxShadow:'0 2px 8px rgba(30,45,61,0.05)',
        }}>
          <button
            className="lg:hidden"
            style={{ padding:8, borderRadius:4, color:'#8a7560', background:'none', border:'none', cursor:'pointer' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div style={{ flex:1 }} />

          {/* WhatsApp status */}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'5px 12px', background:'#d0f0e3', borderRadius:999,
            border:'1px solid #a5dfc5',
          }}>
            <span style={{ position:'relative', display:'flex', width:8, height:8 }}>
              <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#3aaa7e', animation:'ping 1.5s ease-out infinite', opacity:0.6 }} />
              <span style={{ position:'relative', width:8, height:8, borderRadius:'50%', background:'#3aaa7e', display:'block' }} />
            </span>
            <span style={{ fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:700, color:'#1a6648' }}>WhatsApp Connected</span>
          </div>

          {/* Notification bell */}
          <button style={{
            position:'relative', padding:8, borderRadius:4,
            color:'#8a7560', background:'none', border:'none', cursor:'pointer',
          }}>
            <Bell size={20} />
            {pendingCount > 0 && (
              <span style={{ position:'absolute', top:6, right:6, width:8, height:8, background:'#e05a54', borderRadius:'50%', border:'2px solid #faf4e8' }} />
            )}
          </button>

          {/* Avatar */}
          <button style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'4px 8px 4px 4px', borderRadius:4,
            background:'none', border:'none', cursor:'pointer',
          }}>
            <div style={{
              width:32, height:32, borderRadius:4,
              background:'linear-gradient(135deg,#52a596,#2e7a6c)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Inter, sans-serif', fontWeight:800, fontSize:13, color:'#fdf8f0',
              boxShadow:'2px 3px 8px rgba(46,122,108,0.25)',
              transform:'rotate(-1.5deg)',
            }}>
              {user?.owner_name?.charAt(0) ?? 'R'}
            </div>
            <span style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:600, color:'#4e4233' }}>{user?.owner_name?.split(' ')[0]}</span>
            <ChevronDown size={15} style={{ color:'#b8a88a' }} />
          </button>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 1024px) {
          aside { display: block !important; }
          .main-shift { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
