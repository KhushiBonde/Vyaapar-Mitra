import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Store, UtensilsCrossed, Wrench, Plus, Trash2, Check, ChevronRight, ChevronLeft, Clock } from 'lucide-react'
import { Button, Input } from '../components/ui'
import clsx from 'clsx'

const STEPS = [
  { id: 1, title: 'Business Type', titleHi: 'बिज़नेस का प्रकार', desc: 'What kind of business do you run?' },
  { id: 2, title: 'WhatsApp Setup', titleHi: 'WhatsApp सेटअप', desc: 'Connect your WhatsApp Business number' },
  { id: 3, title: 'Working Hours', titleHi: 'काम के घंटे', desc: 'When are you open for customers?' },
  { id: 4, title: 'Your FAQs', titleHi: 'सामान्य सवाल', desc: 'Add common questions your customers ask' },
]

const BUSINESS_TYPES = [
  { id: 'retail', label: 'Retail Shop', labelHi: 'दुकान', desc: 'Clothes, Electronics, Grocery...', icon: Store, color: 'border-brand-300 bg-brand-50' },
  { id: 'restaurant', label: 'Restaurant / Food', labelHi: 'खाना', desc: 'Restaurant, Tiffin, Cloud Kitchen...', icon: UtensilsCrossed, color: 'border-accent-300 bg-accent-50' },
  { id: 'service', label: 'Service Business', labelHi: 'सेवा', desc: 'Salon, Repair, Tutor, Doctor...', icon: Wrench, color: 'border-warning-500 bg-warning-100' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const SAMPLE_FAQS = {
  retail: [
    { q: 'What are your working hours?', a: 'We are open Monday to Saturday, 10 AM to 8 PM.' },
    { q: 'Do you have Cash on Delivery?', a: 'Yes! COD available for local deliveries.' },
    { q: 'What is your return policy?', a: 'Returns accepted within 7 days with original tags.' },
  ],
  restaurant: [
    { q: 'What are your timings?', a: 'We serve from 11 AM to 11 PM, all days.' },
    { q: 'Do you do home delivery?', a: 'Yes! Delivery within 5 km. Min order ₹150.' },
    { q: 'Is there a veg/non-veg menu?', a: 'We have both. Full menu shared on request.' },
  ],
  service: [
    { q: 'How do I book an appointment?', a: 'Just message us and we\'ll confirm a time slot.' },
    { q: 'What are your charges?', a: 'Charges depend on the service. Please ask for a quote.' },
    { q: 'Do you offer home visits?', a: 'Yes, home service available in select areas.' },
  ],
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [bizType, setBizType] = useState('')
  const [waNumber, setWaNumber] = useState('')
  const [waConnected, setWaConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [hours, setHours] = useState(
    DAYS.map((day, i) => ({ day, opens_at: '10:00', closes_at: '20:00', is_closed: i === 6 }))
  )
  const [faqs, setFaqs] = useState([])
  const [newFaq, setNewFaq] = useState({ q: '', a: '' })

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  const mockConnect = () => {
    setConnecting(true)
    setTimeout(() => { setConnecting(false); setWaConnected(true) }, 2000)
  }

  const toggleDay = (i) => setHours(h => h.map((d, idx) => idx === i ? { ...d, is_closed: !d.is_closed } : d))
  const updateHour = (i, key, val) => setHours(h => h.map((d, idx) => idx === i ? { ...d, [key]: val } : d))

  const addFaq = () => {
    if (newFaq.q && newFaq.a) {
      setFaqs(f => [...f, { ...newFaq, id: Date.now() }])
      setNewFaq({ q: '', a: '' })
    }
  }

  const removeFaq = (id) => setFaqs(f => f.filter(x => x.id !== id))

  const loadSamples = () => {
    if (bizType && SAMPLE_FAQS[bizType]) {
      setFaqs(SAMPLE_FAQS[bizType].map((s, i) => ({ q: s.q, a: s.a, id: i + 1 })))
    }
  }

  const canNext = () => {
    if (step === 1) return !!bizType
    if (step === 2) return true
    return true
  }

  const next = () => { if (step < 4) setStep(s => s + 1) }
  const back = () => { if (step > 1) setStep(s => s - 1) }
  const finish = () => navigate('/dashboard')

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-800 text-neutral-900 text-2xl">Vyaapar Mitra</span>
          </div>
          <h1 className="text-2xl font-display font-800 text-neutral-900">Let's set up your AI assistant</h1>
          <p className="text-neutral-500 text-sm mt-1">अपना AI assistant setup करें — सिर्फ 4 आसान steps</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={clsx(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-700 transition-all',
                  step > s.id ? 'bg-brand-600 text-white' :
                  step === s.id ? 'bg-brand-600 text-white ring-4 ring-brand-100' :
                  'bg-white text-neutral-400 border border-neutral-200'
                )}>
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className="text-xs font-500 text-neutral-500 mt-1.5 hidden sm:block">{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={clsx('flex-1 h-0.5 mx-2 transition-all', step > s.id ? 'bg-brand-500' : 'bg-neutral-200')} />
              )}
            </div>
          ))}
        </div>

        {/* Step Card */}
        <div className="card p-8">
          <div className="mb-6">
            <h2 className="text-xl font-display font-800 text-neutral-900">{STEPS[step-1].title} / {STEPS[step-1].titleHi}</h2>
            <p className="text-sm text-neutral-500 mt-1">{STEPS[step-1].desc}</p>
          </div>

          {/* Step 1: Business Type */}
          {step === 1 && (
            <div className="grid gap-3">
              {BUSINESS_TYPES.map(({ id, label, labelHi, desc, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setBizType(id)}
                  className={clsx(
                    'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
                    bizType === id ? color + ' shadow-sm' : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    bizType === id ? 'bg-white shadow-sm' : 'bg-neutral-100'
                  )}>
                    <Icon className={clsx('w-6 h-6', bizType === id ? 'text-brand-600' : 'text-neutral-500')} />
                  </div>
                  <div>
                    <p className="font-700 text-neutral-800">{label} <span className="text-neutral-400 font-400 text-sm">/ {labelHi}</span></p>
                    <p className="text-sm text-neutral-500">{desc}</p>
                  </div>
                  {bizType === id && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: WhatsApp Setup */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm font-600 text-green-800">WhatsApp Business API Setup</p>
                  <p className="text-xs text-green-700 mt-1">Enter your WhatsApp Business number below. In production, you'll verify it via Meta Business Manager.</p>
                </div>
              </div>
              <Input
                label="WhatsApp Business Number"
                labelHi="नंबर"
                type="tel"
                id="onboarding-wa-number"
                placeholder="+91 98765 43210"
                value={waNumber}
                onChange={e => setWaNumber(e.target.value)}
              />
              {!waConnected ? (
                <Button
                  onClick={mockConnect}
                  variant="brand_outline"
                  className="w-full"
                  disabled={!waNumber || connecting}
                >
                  {connecting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-brand-400 border-t-brand-700 rounded-full animate-spin" />
                      Connecting to WhatsApp...
                    </span>
                  ) : '🔗 Connect WhatsApp (Demo)'}
                </Button>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-success-100 border border-success-500/30 rounded-xl">
                  <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-success-700">WhatsApp Connected!</p>
                    <p className="text-xs text-success-600">{waNumber} is now linked to Vyaapar Mitra</p>
                  </div>
                </div>
              )}
              <p className="text-xs text-neutral-400 text-center">
                Skip this step for now — you can connect WhatsApp later from Settings
              </p>
            </div>
          )}

          {/* Step 3: Working Hours */}
          {step === 3 && (
            <div className="space-y-2">
              {hours.map((h, i) => (
                <div key={h.day} className={clsx(
                  'flex items-center gap-3 px-3 py-3 rounded-xl transition-base',
                  h.is_closed ? 'bg-neutral-50' : 'bg-white border border-neutral-100'
                )}>
                  <button
                    onClick={() => toggleDay(i)}
                    className={clsx(
                      'w-10 h-5 rounded-full transition-all flex-shrink-0 relative',
                      h.is_closed ? 'bg-neutral-200' : 'bg-brand-500'
                    )}
                  >
                    <span className={clsx(
                      'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
                      h.is_closed ? 'left-0.5' : 'left-5'
                    )} />
                  </button>
                  <span className={clsx('w-24 text-sm font-600', h.is_closed ? 'text-neutral-400' : 'text-neutral-700')}>
                    {h.day.slice(0, 3)}
                  </span>
                  {h.is_closed ? (
                    <span className="text-sm text-neutral-400 italic">Closed / बंद</span>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" value={h.opens_at} onChange={e => updateHour(i, 'opens_at', e.target.value)}
                        className="text-sm border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-400" />
                      <span className="text-neutral-400 text-sm">to</span>
                      <input type="time" value={h.closes_at} onChange={e => updateHour(i, 'closes_at', e.target.value)}
                        className="text-sm border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none focus:border-brand-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 4: FAQs */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">Add questions your customers frequently ask</p>
                {bizType && (
                  <Button variant="secondary" size="sm" onClick={loadSamples}>
                    Load Sample FAQs
                  </Button>
                )}
              </div>

              {faqs.length > 0 && (
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {faqs.map(faq => (
                    <div key={faq.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-600 text-neutral-800 truncate">Q: {faq.q}</p>
                          <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">A: {faq.a}</p>
                        </div>
                        <button onClick={() => removeFaq(faq.id)} className="text-neutral-400 hover:text-danger-500 flex-shrink-0 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 p-4 bg-brand-50 rounded-xl border border-brand-100">
                <Input
                  label="Question"
                  labelHi="सवाल"
                  id="faq-question"
                  placeholder="e.g. Do you have home delivery?"
                  value={newFaq.q}
                  onChange={e => setNewFaq(p => ({ ...p, q: e.target.value }))}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-500 text-neutral-700">Answer <span className="text-xs text-neutral-400">जवाब</span></label>
                  <textarea
                    placeholder="e.g. Yes! We deliver within 5 km. Minimum order ₹200."
                    value={newFaq.a}
                    onChange={e => setNewFaq(p => ({ ...p, a: e.target.value }))}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 resize-none"
                    rows={3}
                  />
                </div>
                <Button variant="brand_outline" onClick={addFaq} className="w-full" disabled={!newFaq.q || !newFaq.a}>
                  <Plus className="w-4 h-4" /> Add FAQ
                </Button>
              </div>

              <p className="text-xs text-neutral-400 text-center">
                You can always add more FAQs later from Settings. At least 3 FAQs helps the AI answer better.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
            <Button variant="ghost" onClick={back} disabled={step === 1}>
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex items-center gap-2">
              {step === 4 && (
                <Button variant="secondary" onClick={finish}>Skip for now</Button>
              )}
              {step < 4 ? (
                <Button onClick={next} disabled={!canNext()}>
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={finish}>
                  <Check className="w-4 h-4" /> Finish Setup!
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-5">Step {step} of {STEPS.length}</p>
      </div>
    </div>
  )
}
