import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Input, Button } from '../../components/ui'

/* Scattered decorative elements for auth background */
function AuthBg() {
  return (
    <>
      {/* Sage teal torn-paper panel — top left */}
      <div style={{
        position:'fixed', top:0, left:0, width:'45%', height:'55%',
        background:'linear-gradient(160deg,#7bbfb0 0%,#52a596 100%)',
        clipPath:'polygon(0 0,90% 0,60% 70%,0 100%)',
        opacity:0.18, zIndex:0, pointerEvents:'none',
      }} />
      {/* Blush torn-paper panel — bottom right */}
      <div style={{
        position:'fixed', bottom:0, right:0, width:'40%', height:'50%',
        background:'linear-gradient(135deg,#f4a5a1,#ec7e79)',
        clipPath:'polygon(30% 0,100% 20%,100% 100%,0 100%)',
        opacity:0.15, zIndex:0, pointerEvents:'none',
      }} />
      {/* Decorative polka dots */}
      {[
        { top:'8%',  left:'5%',  size:14, color:'#aed9cc', opacity:0.45 },
        { top:'15%', left:'88%', size:9,  color:'#f4a5a1', opacity:0.4  },
        { top:'75%', left:'8%',  size:11, color:'#f8c832', opacity:0.35 },
        { top:'85%', left:'90%', size:7,  color:'#aed9cc', opacity:0.4  },
        { top:'50%', left:'3%',  size:6,  color:'#f4a5a1', opacity:0.3  },
        { top:'40%', left:'94%', size:10, color:'#f8c832', opacity:0.28 },
      ].map((d,i) => (
        <div key={i} style={{
          position:'fixed', top:d.top, left:d.left,
          width:d.size, height:d.size, borderRadius:'50%',
          background:d.color, opacity:d.opacity,
          zIndex:0, pointerEvents:'none',
        }} />
      ))}
      {/* Leaves */}
      <div style={{ position:'fixed', top:'20%', left:'2%', fontSize:22, opacity:0.18, transform:'rotate(20deg)', zIndex:0, pointerEvents:'none' }}>🌿</div>
      <div style={{ position:'fixed', bottom:'18%', right:'3%', fontSize:20, opacity:0.15, transform:'rotate(-15deg)', zIndex:0, pointerEvents:'none' }}>🌿</div>
      {/* Hearts */}
      <div style={{ position:'fixed', top:'60%', left:'92%', fontSize:16, opacity:0.15, color:'#e05a54', zIndex:0, pointerEvents:'none' }}>♥</div>
      <div style={{ position:'fixed', top:'80%', left:'4%', fontSize:14, opacity:0.15, color:'#e05a54', zIndex:0, pointerEvents:'none' }}>♥</div>
    </>
  )
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#fdf8f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 16px', position:'relative', overflow:'hidden' }}>
      <AuthBg />

      <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:12, textDecoration:'none', marginBottom:24 }}>
            <div style={{
              width:44, height:44, borderRadius:4,
              background:'linear-gradient(135deg,#52a596,#2e7a6c)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'4px 5px 16px rgba(46,122,108,0.3)',
              transform:'rotate(-2deg)',
            }}>
              <Zap size={22} color="#fdf8f0" />
            </div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontFamily:'"Playfair Display", Georgia, serif', fontWeight:800, fontSize:20, color:'#1e2d3d', lineHeight:1.1 }}>Vyaapar Mitra</div>
              <div style={{ fontFamily:'Inter, sans-serif', fontSize:10, color:'#52a596', fontWeight:600 }}>हर दुकान का डिजिटल साथी</div>
            </div>
          </Link>
          <h1 style={{ fontFamily:'"Playfair Display", serif', fontSize:26, fontWeight:800, color:'#1e2d3d' }}>Welcome back!</h1>
          <p style={{ fontFamily:'Inter, sans-serif', color:'#8a7560', marginTop:6, fontSize:14 }}>वापसी पर स्वागत है — login करें</p>
        </div>

        {/* Form card — torn top edge */}
        <div style={{
          background:'#faf4e8',
          borderRadius:4,
          boxShadow:'6px 8px 32px rgba(30,45,61,0.12)',
          border:'1px solid #e8d9bc',
          padding:'32px 28px 28px',
          position:'relative',
          marginTop:16,
        }}>
          {/* Torn top edge */}
          <div style={{ position:'absolute', top:-14, left:0, right:0, height:16, overflow:'hidden', pointerEvents:'none' }}>
            <svg viewBox="0 0 420 16" preserveAspectRatio="none" style={{ width:'100%', height:16 }}>
              <path d="M0,16 L0,10 C15,0 30,14 45,6 C60,0 75,12 90,5 C105,0 120,12 135,5 C150,0 165,14 180,6 C195,0 210,12 225,5 C240,0 255,12 270,5 C285,0 300,14 315,6 C330,0 345,12 360,5 C375,0 395,12 420,4 L420,16 Z" fill="#faf4e8" />
            </svg>
          </div>
          {/* Marigold tape decoration */}
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%) rotate(-1deg)', width:52, height:18, background:'rgba(248,200,50,0.3)', borderRadius:2, border:'1px solid rgba(248,200,50,0.35)' }} />

          {error && (
            <div style={{
              marginBottom:20, padding:'10px 14px',
              background:'#fce4e3', border:'1px solid #f9c8c6',
              borderRadius:4, fontFamily:'Inter, sans-serif', fontSize:13, color:'#b03330',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <Input
              label="Email Address" labelHi="ईमेल"
              type="email" id="login-email"
              placeholder="rajesh@yourshop.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />

            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label style={{ fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:600, color:'#4e4233', display:'flex', alignItems:'center', gap:6 }}>
                Password <span style={{ fontSize:11, color:'#b8a88a', fontWeight:400 }}>पासवर्ड</span>
              </label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  id="login-password"
                  placeholder="Enter your password"
                  style={{
                    width:'100%', padding:'10px 42px 10px 14px',
                    fontFamily:'Inter, sans-serif', fontSize:13,
                    background:'#fdf8f0', border:'1.5px solid #d4c5a9',
                    borderRadius:6, color:'#1e2d3d', outline:'none',
                  }}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor='#52a596'; e.target.style.boxShadow='0 0 0 3px rgba(82,165,150,0.12)' }}
                  onBlur={e => { e.target.style.borderColor='#d4c5a9'; e.target.style.boxShadow='none' }}
                  required
                />
                <button
                  type="button"
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'#b8a88a', background:'none', border:'none', cursor:'pointer', display:'flex' }}
                  onClick={() => setShowPass(v => !v)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button type="button" style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#2e7a6c', fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                padding:'13px 24px',
                fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:800,
                color:'#fdf8f0', background:'linear-gradient(135deg,#52a596,#2e7a6c)',
                border:'none', borderRadius:4, cursor:loading?'not-allowed':'pointer',
                boxShadow:'3px 5px 16px rgba(46,122,108,0.3)',
                opacity: loading ? 0.7 : 1,
                transition:'all 0.2s ease',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow='4px 7px 22px rgba(46,122,108,0.4)'; e.currentTarget.style.transform='translateY(-1px)' }}}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='3px 5px 16px rgba(46,122,108,0.3)'; e.currentTarget.style.transform='translateY(0)' }}
            >
              {loading ? (
                <>
                  <span style={{ width:16, height:16, border:'2px solid rgba(253,248,240,0.4)', borderTopColor:'#fdf8f0', borderRadius:'50%', animation:'spin 0.8s linear infinite', display:'inline-block' }} />
                  Logging in...
                </>
              ) : (
                <>Login <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ marginTop:20, paddingTop:20, borderTop:'1px solid #e8d9bc', textAlign:'center' }}>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#8a7560' }}>
              New here?{' '}
              <Link to="/auth/signup" style={{ color:'#2e7a6c', fontWeight:700, textDecoration:'none' }}>
                Create your free account
              </Link>
            </p>
          </div>

          {/* Demo shortcut */}
          <div style={{ marginTop:12, padding:'10px 14px', background:'#d6ede6', borderRadius:4, border:'1px solid #aed9cc', textAlign:'center' }}>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#226358', fontWeight:600 }}>
              👉 Demo: click Login with any email/password to see the dashboard
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
