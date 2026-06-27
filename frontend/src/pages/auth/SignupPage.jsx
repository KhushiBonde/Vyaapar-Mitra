import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap, ArrowRight } from 'lucide-react'
import { Input } from '../../components/ui'

/* Reuse same auth background as LoginPage */
function AuthBg() {
  return (
    <>
      <div style={{ position:'fixed', top:0, left:0, width:'45%', height:'55%', background:'linear-gradient(160deg,#7bbfb0 0%,#52a596 100%)', clipPath:'polygon(0 0,90% 0,60% 70%,0 100%)', opacity:0.18, zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:0, right:0, width:'40%', height:'50%', background:'linear-gradient(135deg,#f4a5a1,#ec7e79)', clipPath:'polygon(30% 0,100% 20%,100% 100%,0 100%)', opacity:0.15, zIndex:0, pointerEvents:'none' }} />
      {[
        { top:'8%',  left:'5%',  size:14, color:'#aed9cc', opacity:0.45 },
        { top:'15%', left:'88%', size:9,  color:'#f4a5a1', opacity:0.4  },
        { top:'75%', left:'8%',  size:11, color:'#f8c832', opacity:0.35 },
        { top:'85%', left:'90%', size:7,  color:'#aed9cc', opacity:0.4  },
      ].map((d,i) => (
        <div key={i} style={{ position:'fixed', top:d.top, left:d.left, width:d.size, height:d.size, borderRadius:'50%', background:d.color, opacity:d.opacity, zIndex:0, pointerEvents:'none' }} />
      ))}
      <div style={{ position:'fixed', top:'20%', left:'2%', fontSize:22, opacity:0.18, transform:'rotate(20deg)', zIndex:0, pointerEvents:'none' }}>🌿</div>
      <div style={{ position:'fixed', bottom:'18%', right:'3%', fontSize:20, opacity:0.15, transform:'rotate(-15deg)', zIndex:0, pointerEvents:'none' }}>🌿</div>
    </>
  )
}

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ owner_name:'', business_name:'', email:'', phone:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signup(form)
      navigate('/onboarding')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#fdf8f0', display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 16px', position:'relative', overflow:'hidden' }}>
      <AuthBg />

      <div style={{ width:'100%', maxWidth:440, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:12, textDecoration:'none', marginBottom:20 }}>
            <div style={{ width:44, height:44, borderRadius:4, background:'linear-gradient(135deg,#52a596,#2e7a6c)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'4px 5px 16px rgba(46,122,108,0.3)', transform:'rotate(-2deg)' }}>
              <Zap size={22} color="#fdf8f0" />
            </div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontFamily:'"Playfair Display", Georgia, serif', fontWeight:800, fontSize:20, color:'#1e2d3d', lineHeight:1.1 }}>Vyaapar Mitra</div>
              <div style={{ fontFamily:'Inter, sans-serif', fontSize:10, color:'#52a596', fontWeight:600 }}>हर दुकान का डिजिटल साथी</div>
            </div>
          </Link>
          <h1 style={{ fontFamily:'"Playfair Display", serif', fontSize:26, fontWeight:800, color:'#1e2d3d' }}>Create your account</h1>
          <p style={{ fontFamily:'Inter, sans-serif', color:'#8a7560', marginTop:6, fontSize:14 }}>अपना free account बनाएं — 5 मिनट में ready</p>
        </div>

        {/* Form card */}
        <div style={{ background:'#faf4e8', borderRadius:4, boxShadow:'6px 8px 32px rgba(30,45,61,0.12)', border:'1px solid #e8d9bc', padding:'32px 28px 28px', position:'relative', marginTop:16 }}>
          {/* Torn top edge */}
          <div style={{ position:'absolute', top:-14, left:0, right:0, height:16, overflow:'hidden', pointerEvents:'none' }}>
            <svg viewBox="0 0 440 16" preserveAspectRatio="none" style={{ width:'100%', height:16 }}>
              <path d="M0,16 L0,10 C18,0 36,14 54,6 C72,0 90,12 108,5 C126,0 144,12 162,5 C180,0 198,14 216,6 C234,0 252,12 270,5 C288,0 306,12 324,5 C342,0 360,14 378,6 C396,0 414,12 440,4 L440,16 Z" fill="#faf4e8" />
            </svg>
          </div>
          {/* Tape */}
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%) rotate(-1deg)', width:52, height:18, background:'rgba(248,200,50,0.3)', borderRadius:2, border:'1px solid rgba(248,200,50,0.35)' }} />

          {error && (
            <div style={{ marginBottom:20, padding:'10px 14px', background:'#fce4e3', border:'1px solid #f9c8c6', borderRadius:4, fontFamily:'Inter, sans-serif', fontSize:13, color:'#b03330' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <Input label="Your Name"       labelHi="आपका नाम"  id="signup-name"     placeholder="Rajesh Kumar"        value={form.owner_name}     onChange={set('owner_name')}     required />
            <Input label="Business Name"   labelHi="दुकान का नाम" id="signup-biz"  placeholder="Krishna Fashions"   value={form.business_name}  onChange={set('business_name')}  required />
            <Input label="Email Address"   labelHi="ईमेल"      type="email" id="signup-email"  placeholder="rajesh@yourshop.com" value={form.email}         onChange={set('email')}          required />
            <Input label="WhatsApp Number" labelHi="WhatsApp नंबर" type="tel" id="signup-phone" placeholder="+91 98765 43210"  value={form.phone}         onChange={set('phone')}          required />
            <Input label="Password"        labelHi="पासवर्ड"   type="password" id="signup-password" placeholder="Minimum 8 characters" value={form.password} onChange={set('password')}    required />

            <button
              type="submit"
              disabled={loading}
              style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                padding:'13px 24px', marginTop:4,
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
                  Creating account...
                </>
              ) : (
                <>Create Free Account <ArrowRight size={16} /></>
              )}
            </button>

            <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', textAlign:'center' }}>
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <div style={{ marginTop:20, paddingTop:20, borderTop:'1px solid #e8d9bc', textAlign:'center' }}>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#8a7560' }}>
              Already have an account?{' '}
              <Link to="/auth/login" style={{ color:'#2e7a6c', fontWeight:700, textDecoration:'none' }}>Login</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
