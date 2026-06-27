import { Link } from 'react-router-dom'
import { Zap, MessageSquare, ShoppingBag, BarChart3, ArrowRight, Star, Shield, Clock, CheckCircle } from 'lucide-react'
import { TornDivider } from '../components/ui'

/* ── Decorative scattered dots/elements ── */
function Scatter() {
  return (
    <>
      {/* Polka dots */}
      {[
        { top:'12%', left:'4%',  size:10, color:'#aed9cc', opacity:0.5 },
        { top:'22%', left:'91%', size: 7, color:'#f4a5a1', opacity:0.45 },
        { top:'55%', left:'6%',  size:14, color:'#f8c832', opacity:0.3 },
        { top:'70%', left:'93%', size: 8, color:'#aed9cc', opacity:0.4 },
        { top:'85%', left:'8%',  size: 6, color:'#f4a5a1', opacity:0.35 },
        { top:'38%', left:'88%', size:11, color:'#f8c832', opacity:0.25 },
      ].map((d, i) => (
        <div key={i} style={{
          position:'fixed', top:d.top, left:d.left,
          width:d.size, height:d.size, borderRadius:'50%',
          background:d.color, opacity:d.opacity, pointerEvents:'none', zIndex:0,
        }} />
      ))}
      {/* Decorative leaves */}
      {[
        { top:'18%', left:'2%',  rotate: 20 },
        { top:'62%', left:'95%', rotate:-15 },
      ].map((l, i) => (
        <div key={i} style={{
          position:'fixed', top:l.top, left:l.left,
          fontSize:22, opacity:0.18, transform:`rotate(${l.rotate}deg)`,
          pointerEvents:'none', zIndex:0,
        }}>🌿</div>
      ))}
      {/* Hearts */}
      {[
        { top:'42%', left:'97%', rotate: 10 },
        { top:'78%', left:'1%',  rotate:-8 },
      ].map((h, i) => (
        <div key={i} style={{
          position:'fixed', top:h.top, left:h.left,
          fontSize:16, opacity:0.15, transform:`rotate(${h.rotate}deg)`,
          color:'#e05a54', pointerEvents:'none', zIndex:0,
        }}>♥</div>
      ))}
    </>
  )
}

const features = [
  { icon: MessageSquare, title: 'Auto-Reply in Seconds', titleHi: 'तुरंत जवाब', description: 'AI answers customer queries 24/7 in Hindi, Hinglish, and English — just like you would.', tilt: 1 },
  { icon: ShoppingBag,   title: 'Automatic Order Logging', titleHi: 'ऑटो ऑर्डर', description: 'Orders are extracted from chat and logged automatically. No more writing in a notebook.', tilt: -1 },
  { icon: BarChart3,     title: 'Smart Business Insights', titleHi: 'बिज़नेस इनसाइट्स', description: 'See your busiest hours, most asked questions, and revenue trends in one dashboard.', tilt: 0 },
  { icon: Shield,        title: 'Human Handover', titleHi: 'मानवीय नियंत्रण', description: 'When AI is unsure, it instantly alerts you so you can step in. Full control, always.', tilt: 1 },
  { icon: Clock,         title: '24 / 7 Availability', titleHi: 'हमेशा ऑनलाइन', description: 'Your virtual assistant never sleeps. Customers get instant answers even at midnight.', tilt: -1 },
  { icon: Zap,           title: '5-Minute Setup', titleHi: 'झटपट शुरुआत', description: 'No coding, no IT team. Enter your FAQs, connect WhatsApp and you are live.', tilt: 0 },
]

const testimonials = [
  { name: 'Anita Sharma',  business: 'Anita Boutique, Jaipur',            text: 'Pehle din mein 50+ messages ka jawab dena padta tha. Ab Vyaapar Mitra sab sambhal leta hai!', stars: 5 },
  { name: 'Suresh Patel',  business: 'Fresh Foods Delivery, Ahmedabad',   text: 'Orders automatically log ho jaate hain. Bahut time bachta hai mere ka.', stars: 5 },
  { name: 'Kavitha Reddy', business: 'KR Sarees, Hyderabad',              text: 'My customers message in Telugu-English mix and Vyaapar Mitra understands everything!', stars: 5 },
]

const stats = [
  { val: '10,000+', label: 'Businesses Onboarded' },
  { val: '92%',     label: 'Queries Auto-Resolved' },
  { val: '₹2 Cr+',  label: 'Orders Processed' },
  { val: '4.9 ★',   label: 'Average Rating' },
]

/* ── Torn-paper SVG shape ── */
function TornShape({ style }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={style}>
      <path
        d="M0,0 L390,0 C395,0 400,5 400,10 L400,280 C398,290 390,295 382,290 C370,282 358,298 345,292 C330,285 318,300 305,294 C290,287 278,300 263,294 C245,287 232,298 218,292 C200,285 188,295 172,290 C155,284 140,295 125,290 C108,284 93,296 77,290 C60,284 45,295 28,290 C14,285 4,292 0,288 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', position: 'relative', overflow: 'hidden' }}>
      <Scatter />

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(253,248,240,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e8d9bc',
        boxShadow: '0 2px 12px rgba(30,45,61,0.06)',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 4,
              background: 'linear-gradient(135deg,#52a596,#2e7a6c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '3px 4px 12px rgba(46,122,108,0.3)',
              transform: 'rotate(-2deg)',
            }}>
              <Zap size={20} color="#fdf8f0" />
            </div>
            <div>
              <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800, fontSize: 18, color: '#1e2d3d', lineHeight: 1.1 }}>Vyaapar Mitra</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#52a596', fontWeight: 600, letterSpacing: '0.05em' }}>हर दुकान का डिजिटल साथी</div>
            </div>
          </div>
          {/* Nav actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/auth/login" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#4e4233',
              padding: '8px 18px', borderRadius: 6, textDecoration: 'none',
              border: '1.5px solid #d4c5a9', background: 'transparent',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f2e8d5'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >Login</Link>
            <Link to="/auth/signup" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: '#fdf8f0',
              background: 'linear-gradient(135deg,#52a596,#2e7a6c)',
              padding: '9px 22px', borderRadius: 6, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '3px 4px 16px rgba(46,122,108,0.35)',
            }}>Start Free <ArrowRight size={14} /></Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 66, position: 'relative', overflow: 'hidden' }}>
        {/* Teal torn-paper panel — left/top background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
          background: 'linear-gradient(160deg,#7bbfb0 0%,#52a596 60%,#3d9080 100%)',
          clipPath: 'polygon(0 0,85% 0,75% 60%,80% 100%,0 100%)',
          zIndex: 0,
        }} />

        {/* Blush torn-paper accent shape — overlapping */}
        <div style={{
          position: 'absolute', top: '8%', right: '2%', width: 320, height: 280,
          background: 'linear-gradient(135deg,#f4a5a1 0%,#ec7e79 100%)',
          clipPath: 'polygon(10% 0%,100% 5%,95% 85%,15% 100%,0% 50%)',
          opacity: 0.22, zIndex: 0, transform: 'rotate(4deg)',
        }} />

        {/* Scattered polka dots on hero */}
        {[
          { top:90, left:80, size:12, color:'#fdf8f0', opacity:0.3 },
          { top:60, left:180, size:7, color:'#fdf8f0', opacity:0.2 },
          { top:200, left:50, size:9, color:'#fce083', opacity:0.4 },
        ].map((d,i) => (
          <div key={i} style={{
            position:'absolute', top:d.top, left:d.left,
            width:d.size, height:d.size, borderRadius:'50%',
            background:d.color, opacity:d.opacity, zIndex:1,
          }} />
        ))}

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 24px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          {/* Left text */}
          <div>
            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(253,248,240,0.85)', color: '#226358',
              borderRadius: 999, padding: '6px 16px', marginBottom: 28,
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              border: '1.5px solid rgba(253,248,240,0.6)',
              boxShadow: '2px 4px 12px rgba(30,45,61,0.1)',
            }}>
              <span style={{ width:8, height:8, background:'#3aaa7e', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 0 3px rgba(58,170,126,0.25)' }} />
              WhatsApp AI for Indian Businesses
            </div>

            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(36px,5vw,62px)', fontWeight: 800,
              color: '#fdf8f0', lineHeight: 1.1, marginBottom: 14,
              textShadow: '2px 3px 12px rgba(30,45,61,0.2)',
            }}>Vyaapar Mitra</h1>

            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(16px,2vw,22px)', fontWeight: 600,
              color: '#fce083', marginBottom: 12, lineHeight: 1.4,
            }}>हर दुकान का अपना डिजिटल साथी।</p>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(253,248,240,0.85)',
              marginBottom: 36, lineHeight: 1.8, maxWidth: 420,
            }}>
              <em>Every shop's own digital companion.</em><br />
              Automatically answers WhatsApp queries, logs orders, and runs your business — in Hindi, Hinglish &amp; English.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <Link to="/auth/signup" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'#fdf8f0', color:'#226358',
                fontFamily:'Inter, sans-serif', fontWeight:800, fontSize:15,
                padding:'13px 28px', borderRadius:6, textDecoration:'none',
                boxShadow:'4px 6px 20px rgba(30,45,61,0.2)',
                transform:'rotate(-0.5deg)',
                transition:'transform 0.25s ease, box-shadow 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='rotate(0deg) translateY(-2px)'; e.currentTarget.style.boxShadow='6px 10px 28px rgba(30,45,61,0.28)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='rotate(-0.5deg)'; e.currentTarget.style.boxShadow='4px 6px 20px rgba(30,45,61,0.2)' }}
              >
                Start Free Today <ArrowRight size={16} />
              </Link>
              <Link to="/dashboard" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'rgba(253,248,240,0.15)', color:'#fdf8f0',
                fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:15,
                padding:'13px 28px', borderRadius:6, textDecoration:'none',
                border:'1.5px solid rgba(253,248,240,0.4)',
                backdropFilter:'blur(8px)',
              }}>View Demo</Link>
            </div>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'rgba(253,248,240,0.6)' }}>
              ✓ No credit card required &nbsp;·&nbsp; ✓ Free 14-day trial &nbsp;·&nbsp; ✓ Setup in 5 min
            </p>
          </div>

          {/* Right — hero image collage */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>
            {/* Parchment backing card */}
            <div style={{
              position:'absolute', width:'95%', height:'92%',
              background:'#f2e8d5',
              clipPath:'polygon(2% 1%,98% 0%,100% 97%,1% 100%)',
              boxShadow:'6px 8px 24px rgba(30,45,61,0.15)',
              transform:'rotate(3deg)',
              zIndex:0,
            }} />
            {/* Hero image */}
            <img
              src="/hero.png"
              alt="Vyaapar Mitra — digital shopping companion"
              className="float-anim"
              style={{
                width:'100%', maxWidth:480,
                borderRadius:4,
                boxShadow:'6px 10px 32px rgba(30,45,61,0.22), 2px 3px 8px rgba(30,45,61,0.1)',
                position:'relative', zIndex:1,
                transform:'rotate(1.5deg)',
              }}
            />
            {/* Floating badge 1 */}
            <div style={{
              position:'absolute', bottom:20, left:-10, zIndex:3,
              background:'#faf4e8', borderRadius:4, padding:'10px 16px',
              boxShadow:'4px 6px 20px rgba(30,45,61,0.14)',
              display:'flex', alignItems:'center', gap:10,
              border:'1px solid #e8d9bc',
              transform:'rotate(-2deg)',
            }}>
              <div style={{ width:36, height:36, background:'linear-gradient(135deg,#52a596,#2e7a6c)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <MessageSquare size={18} color="#fdf8f0" />
              </div>
              <div>
                <div style={{ fontFamily:'"Playfair Display", serif', fontSize:13, fontWeight:700, color:'#1e2d3d' }}>AI replied!</div>
                <div style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#8a7560' }}>3 seconds ago · Hinglish</div>
              </div>
            </div>
            {/* Floating badge 2 */}
            <div style={{
              position:'absolute', top:16, right:-8, zIndex:3,
              background:'#faf4e8', borderRadius:4, padding:'8px 14px',
              boxShadow:'4px 6px 20px rgba(30,45,61,0.12)',
              display:'flex', alignItems:'center', gap:8,
              border:'1px solid #d0f0e3',
              transform:'rotate(2.5deg)',
            }}>
              <span style={{ fontSize:18 }}>✅</span>
              <div>
                <div style={{ fontFamily:'"Playfair Display", serif', fontSize:12, fontWeight:700, color:'#1a6648' }}>Order Logged</div>
                <div style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#8a7560' }}>Auto-extracted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Torn bottom edge — cream */}
        <div style={{ position:'relative', height:60, marginTop:-2, overflow:'hidden' }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ position:'absolute', bottom:0, left:0, width:'100%', height:60, zIndex:3 }}>
            <path d="M0,60 C40,28 90,58 150,30 C200,8 255,52 310,26 C360,4 415,46 470,22 C520,2 575,44 630,20 C680,0 735,44 790,20 C840,2 895,44 950,20 C1000,2 1055,46 1110,22 C1160,4 1215,46 1270,20 C1320,0 1375,42 1410,18 L1440,12 L1440,60 L0,60 Z" fill="#fdf8f0" />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background:'#1e2d3d', padding:'36px 24px', position:'relative' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, textAlign:'center' }}>
          {stats.map(({val,label}) => (
            <div key={label}>
              <div style={{ fontFamily:'"Playfair Display", serif', fontSize:28, fontWeight:800, color:'#aed9cc', marginBottom:4 }}>{val}</div>
              <div style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#8a7560' }}>{label}</div>
            </div>
          ))}
        </div>
        {/* Torn top cream */}
        <div style={{ position:'absolute', bottom:-1, left:0, right:0, height:52, overflow:'hidden', pointerEvents:'none' }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width:'100%', height:52 }}>
            <path d="M0,52 L0,30 C30,50 70,22 120,40 C165,56 210,20 260,38 C305,54 350,18 400,36 C445,52 490,16 540,34 C585,50 630,14 680,32 C725,48 770,12 820,30 C865,46 910,10 960,28 C1005,44 1050,8 1100,26 C1145,42 1190,6 1240,24 C1285,40 1330,4 1380,22 L1440,10 L1440,52 Z" fill="#fdf8f0" />
          </svg>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding:'80px 24px', background:'#fdf8f0', position:'relative' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:38, fontWeight:800, color:'#1e2d3d', marginBottom:12 }}>
              Everything you need,<br/>nothing you don't
            </h2>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:16, color:'#8a7560' }}>Built for busy shop owners, not tech experts</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:28 }}>
            {features.map(({icon:Icon, title, titleHi, description, tilt}, i) => (
              <div key={title} style={{
                background:'#faf4e8',
                border:'1px solid #e8d9bc',
                borderRadius:4,
                padding:'28px 24px',
                boxShadow:'2px 4px 14px rgba(30,45,61,0.08)',
                transform: tilt === 1 ? 'rotate(1.1deg)' : tilt === -1 ? 'rotate(-1deg)' : 'rotate(0deg)',
                transition:'transform 0.3s ease, box-shadow 0.3s ease',
                position:'relative', overflow:'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='rotate(0deg) translateY(-4px)'; e.currentTarget.style.boxShadow='4px 8px 28px rgba(30,45,61,0.14)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = tilt===1?'rotate(1.1deg)':tilt===-1?'rotate(-1deg)':'rotate(0deg)'; e.currentTarget.style.boxShadow='2px 4px 14px rgba(30,45,61,0.08)' }}
              >
                {/* Decorative corner */}
                <div style={{ position:'absolute', top:-12, right:-12, width:48, height:48, borderRadius:'50%', background:'#e8d9bc', opacity:0.4 }} />
                <div style={{
                  width:52, height:52, borderRadius:'50%',
                  background: i%3===0 ? '#d6ede6' : i%3===1 ? '#fce4e3' : '#fef0c7',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
                  boxShadow:'2px 3px 10px rgba(30,45,61,0.08)',
                }}>
                  <Icon size={24} color={i%3===0?'#226358':i%3===1?'#b03330':'#7a4f10'} />
                </div>
                <h3 style={{ fontFamily:'"Playfair Display", serif', fontSize:18, fontWeight:700, color:'#1e2d3d', marginBottom:4 }}>{title}</h3>
                <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#52a596', fontWeight:600, marginBottom:10 }}>{titleHi}</p>
                <p style={{ fontFamily:'Inter, sans-serif', fontSize:14, color:'#6b5c48', lineHeight:1.7 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Torn edge into chat demo */}
      <div style={{ position:'relative', height:60, background:'#fdf8f0', overflow:'hidden' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ position:'absolute', bottom:0, width:'100%', height:60 }}>
          <path d="M0,60 L0,38 C50,60 100,22 155,44 C200,60 250,18 305,40 C350,58 400,16 455,38 C500,56 550,14 605,36 C650,54 700,12 755,34 C800,52 850,10 905,32 C950,50 1000,8 1055,30 C1100,48 1150,6 1205,28 C1250,46 1300,4 1355,26 L1440,10 L1440,60 Z" fill="#aed9cc" />
        </svg>
      </div>

      {/* ── Chat Demo ── */}
      <section style={{ padding:'80px 24px', background:'linear-gradient(160deg,#aed9cc 0%,#d6ede6 60%,#f0f7f4 100%)', position:'relative' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:34, fontWeight:800, color:'#1e2d3d', marginBottom:10 }}>
              Speaks YOUR Customer's Language
            </h2>
            <p style={{ fontFamily:'Inter, sans-serif', color:'#4e4233', fontSize:16 }}>
              AI understands and replies naturally in Hindi, Hinglish, and English
            </p>
          </div>
          {/* Chat card — torn notepad style */}
          <div style={{
            background:'#faf4e8',
            borderRadius:4,
            padding:'32px 28px',
            boxShadow:'6px 8px 32px rgba(30,45,61,0.12)',
            border:'1px solid #e8d9bc',
            position:'relative',
          }}>
            {/* Torn top edge */}
            <div style={{ position:'absolute', top:-14, left:0, right:0, height:16, overflow:'hidden' }}>
              <svg viewBox="0 0 800 16" preserveAspectRatio="none" style={{ width:'100%', height:16 }}>
                <path d="M0,16 L0,10 C20,0 40,14 60,6 C80,0 100,12 120,5 C140,0 160,12 180,6 C200,0 220,12 240,5 C260,0 280,14 300,6 C320,0 340,12 360,5 C380,0 400,14 420,6 C440,0 460,12 480,5 C500,0 520,14 540,6 C560,0 580,12 600,5 C620,0 640,14 660,6 C680,0 700,12 720,5 C740,0 760,12 780,6 L800,4 L800,16 Z" fill="#faf4e8" />
              </svg>
            </div>
            <div style={{ fontFamily:'Inter, sans-serif', fontSize:11, fontWeight:700, color:'#b8a88a', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:24 }}>
              📱 Sample WhatsApp Conversation
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { side:'left',  msg:'Bhai, ek blue kurta chahiye size M mein. Kitna parega?', tag:'👤 Customer (Hinglish)' },
                { side:'right', msg:'Namaste! 😊 Blue Cotton Kurta M size available hai.\n\n💰 Price: ₹450\n🚚 Delivery: Free (city ke andar)\n\nKya main aapka order confirm kar sakta hoon?', tag:'🤖 Vyaapar Mitra — Auto-replied in 3s' },
                { side:'left',  msg:'हाँ भेज दो। पता है — 15, गांधी नगर, लखनऊ', tag:'👤 Customer (Hindi)' },
                { side:'right', msg:'✅ Order Confirm!\n\nBlue Cotton Kurta M × 1 = ₹450\nDelivery: 15, Gandhi Nagar, Lucknow\n\n2 din mein milega. COD available hai! 🙏', tag:'🤖 Vyaapar Mitra — Order logged automatically' },
              ].map(({side,msg,tag},i) => (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:side==='right'?'flex-end':'flex-start' }}>
                  <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:'#b8a88a', marginBottom:4 }}>{tag}</p>
                  <div className={side==='right'?'bubble-ai':'bubble-customer'} style={{ whiteSpace:'pre-line' }}>{msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Torn bottom */}
        <div style={{ position:'absolute', bottom:-1, left:0, right:0, height:52, overflow:'hidden', pointerEvents:'none' }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width:'100%', height:52 }}>
            <path d="M0,52 L0,32 C35,50 75,18 125,38 C168,54 215,16 262,36 C308,54 352,12 400,32 C445,50 490,10 538,30 C582,48 628,8 678,28 C722,46 768,6 818,26 C862,44 908,4 958,24 C1002,42 1048,2 1098,22 C1142,40 1188,0 1238,20 C1282,38 1328,0 1378,18 L1440,6 L1440,52 Z" fill="#fdf8f0" />
          </svg>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding:'80px 24px', background:'#fdf8f0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:36, fontWeight:800, color:'#1e2d3d', textAlign:'center', marginBottom:52 }}>
            Loved by shop owners across India 🇮🇳
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:28 }}>
            {testimonials.map(({name,business,text,stars},i) => (
              <div key={name} style={{
                background:'#faf4e8', border:'1px solid #e8d9bc', borderRadius:4,
                padding:'28px 24px',
                boxShadow:'2px 4px 14px rgba(30,45,61,0.08)',
                transform:i===0?'rotate(1.2deg)':i===2?'rotate(-1deg)':'rotate(0deg)',
                transition:'transform 0.3s',
                position:'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='rotate(0deg) translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform=i===0?'rotate(1.2deg)':i===2?'rotate(-1deg)':'rotate(0deg)' }}
              >
                {/* Decorative tape strip */}
                <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%) rotate(-1deg)', width:48, height:18, background:'rgba(248,200,50,0.35)', borderRadius:2, border:'1px solid rgba(248,200,50,0.4)' }} />
                <div style={{ display:'flex', gap:2, marginBottom:14, marginTop:4 }}>
                  {Array.from({length:stars}).map((_,j) => <Star key={j} size={15} fill="#f8c832" color="#f8c832" />)}
                </div>
                <p style={{ fontFamily:'Inter, sans-serif', fontSize:14, color:'#4e4233', lineHeight:1.8, marginBottom:18, fontStyle:'italic' }}>"{text}"</p>
                <div>
                  <p style={{ fontFamily:'"Playfair Display", serif', fontSize:14, fontWeight:700, color:'#1e2d3d' }}>{name}</p>
                  <p style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#b8a88a' }}>{business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'80px 24px', background:'#fdf8f0', position:'relative', overflow:'hidden' }}>
        {/* Blush torn-paper background blob */}
        <div style={{
          position:'absolute', top:'-10%', right:'-5%', width:500, height:500,
          background:'linear-gradient(135deg,#fce4e3,#f9c8c6)',
          clipPath:'polygon(10% 5%, 90% 0%, 100% 80%, 85% 100%, 5% 95%, 0% 20%)',
          opacity:0.35, zIndex:0,
        }} />
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{
            background:'linear-gradient(135deg,#3d9080 0%,#2e7a6c 50%,#226358 100%)',
            borderRadius:4, padding:'56px 40px',
            boxShadow:'6px 10px 36px rgba(46,122,108,0.35)',
            clipPath:'polygon(0% 2%, 98% 0%, 100% 95%, 2% 100%)',
            position:'relative', overflow:'hidden',
          }}>
            {/* Decorative dots inside CTA */}
            {[{top:20,left:30,s:14},{top:60,right:40,s:10},{bottom:30,left:60,s:8}].map((d,i)=>(
              <div key={i} style={{ position:'absolute', ...d, width:d.s, height:d.s, borderRadius:'50%', background:'rgba(253,248,240,0.15)' }} />
            ))}
            <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:36, fontWeight:800, color:'#fdf8f0', marginBottom:10 }}>
              Vyaapar shuru karo —<br/>5 minute mein!
            </h2>
            <p style={{ fontFamily:'Inter, sans-serif', color:'rgba(253,248,240,0.75)', fontSize:16, marginBottom:32 }}>
              No technical knowledge required. Setup karna bahut aasaan hai.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap', marginBottom:36 }}>
              {['Set up your business','Connect WhatsApp','Add your FAQs','Go live! 🚀'].map((step,i) => (
                <div key={step} style={{
                  display:'flex', alignItems:'center', gap:8,
                  background:'rgba(253,248,240,0.12)', borderRadius:4,
                  padding:'8px 16px', border:'1px solid rgba(253,248,240,0.2)',
                }}>
                  <span style={{ width:22, height:22, background:'rgba(253,248,240,0.25)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:700, color:'#fdf8f0' }}>{i+1}</span>
                  <span style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#fdf8f0', fontWeight:500 }}>{step}</span>
                </div>
              ))}
            </div>
            <Link to="/auth/signup" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'#fdf8f0', color:'#226358',
              fontFamily:'Inter, sans-serif', fontWeight:800, fontSize:17,
              padding:'15px 36px', borderRadius:4, textDecoration:'none',
              boxShadow:'4px 6px 20px rgba(30,45,61,0.25)',
              transform:'rotate(-0.5deg)',
              transition:'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='rotate(0deg) translateY(-2px)'; e.currentTarget.style.boxShadow='6px 10px 28px rgba(30,45,61,0.32)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='rotate(-0.5deg)'; e.currentTarget.style.boxShadow='4px 6px 20px rgba(30,45,61,0.25)' }}
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop:'1px solid #e8d9bc', padding:'36px 24px', textAlign:'center', background:'#fdf8f0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:10 }}>
          <div style={{ width:34, height:34, borderRadius:4, background:'linear-gradient(135deg,#52a596,#2e7a6c)', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(-2deg)' }}>
            <Zap size={17} color="#fdf8f0" />
          </div>
          <div>
            <span style={{ fontFamily:'"Playfair Display", serif', fontWeight:800, fontSize:16, color:'#1e2d3d' }}>Vyaapar Mitra</span>
            <span style={{ fontFamily:'Inter, sans-serif', fontSize:12, color:'#52a596', marginLeft:8 }}>— हर दुकान का अपना डिजिटल साथी</span>
          </div>
        </div>
        <p style={{ fontFamily:'Inter, sans-serif', fontSize:13, color:'#b8a88a' }}>© 2024 Vyaapar Mitra. Built with ❤️ for Indian small businesses.</p>
      </footer>
    </div>
  )
}
