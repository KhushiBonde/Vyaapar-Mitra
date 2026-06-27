import { useState } from 'react'
import {
  Store, Smartphone, Clock, HelpCircle, Bell, Shield,
  Plus, Trash2, Check, Edit2, Save, X, ChevronRight
} from 'lucide-react'
import { mockBusiness, mockFaqs, mockBusinessHours } from '../../mock/data'
import { Button, Input, PageHeader } from '../../components/ui'
import clsx from 'clsx'

const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Business Profile', labelHi: 'बिज़नेस प्रोफाइल', icon: Store },
  { id: 'ai', label: 'AI Behavior', labelHi: 'AI सेटिंग्स', icon: Smartphone },
  { id: 'hours', label: 'Business Hours', labelHi: 'काम के घंटे', icon: Clock },
  { id: 'faq', label: 'FAQ Manager', labelHi: 'सवाल-जवाब', icon: HelpCircle },
  { id: 'notifications', label: 'Notifications', labelHi: 'नोटिफिकेशन', icon: Bell },
  { id: 'account', label: 'Account', labelHi: 'अकाउंट', icon: Shield },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function ProfileSection() {
  const [form, setForm] = useState({ ...mockBusiness })
  const [saved, setSaved] = useState(false)
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Owner Name" labelHi="मालिक का नाम" value={form.owner_name} onChange={set('owner_name')} />
        <Input label="Business Name" labelHi="दुकान का नाम" value={form.business_name} onChange={set('business_name')} />
        <Input label="Email" type="email" value={form.email} onChange={set('email')} />
        <Input label="Personal Phone" value={form.phone} onChange={set('phone')} />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-500 text-neutral-700">Business Type <span className="text-xs text-neutral-400">बिज़नेस का प्रकार</span></label>
        <div className="flex gap-2">
          {['retail', 'restaurant', 'service'].map(t => (
            <button key={t} onClick={() => setForm(p => ({ ...p, business_type: t }))}
              className={clsx('px-4 py-2 rounded-xl text-sm font-600 border transition-base capitalize',
                form.business_type === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
              )}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-500 text-neutral-700">WhatsApp Business Number</label>
        <div className="flex gap-2">
          <input value={form.whatsapp_number} onChange={set('whatsapp_number')}
            className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400"
            placeholder="+91 98765 43210" />
          <div className="flex items-center gap-2 px-3 py-2 bg-success-100 border border-success-200 rounded-xl">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            <span className="text-xs font-600 text-success-700">Connected</span>
          </div>
        </div>
      </div>
      <Button onClick={save}>
        {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
      </Button>
    </div>
  )
}

function AIBehaviorSection() {
  const [lang, setLang] = useState('hinglish')
  const [tone, setTone] = useState('friendly')
  const [threshold, setThreshold] = useState(60)
  const [saved, setSaved] = useState(false)

  return (
    <div className="space-y-6">
      <div className="p-4 bg-brand-50 border border-brand-100 rounded-xl">
        <p className="text-sm text-brand-700">
          💡 These settings control how Vyaapar Mitra responds to your customers. Changes take effect immediately.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-700 text-neutral-800">Default Reply Language <span className="text-xs font-400 text-neutral-400">/ डिफ़ॉल्ट भाषा</span></label>
        <p className="text-xs text-neutral-500">AI will always match the customer's language. This is the fallback if language is unclear.</p>
        <div className="flex gap-2 flex-wrap">
          {[{ id: 'hinglish', label: '🔀 Hinglish (Recommended)' }, { id: 'hindi', label: '🇮🇳 Hindi' }, { id: 'english', label: '🇬🇧 English' }].map(l => (
            <button key={l.id} onClick={() => setLang(l.id)}
              className={clsx('px-4 py-2 rounded-xl text-sm font-600 border transition-base',
                lang === l.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
              )}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-700 text-neutral-800">Reply Tone <span className="text-xs font-400 text-neutral-400">/ जवाब का तरीका</span></label>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'friendly', label: 'Friendly / दोस्ताना', desc: 'Warm, casual, uses emojis 😊 — best for retail & local shops' },
            { id: 'formal', label: 'Formal / औपचारिक', desc: 'Professional, no emojis — best for services & clinics' },
          ].map(t => (
            <button key={t.id} onClick={() => setTone(t.id)}
              className={clsx('p-4 rounded-xl border-2 text-left transition-all',
                tone === t.id ? 'border-brand-400 bg-brand-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
              )}>
              <p className="text-sm font-700 text-neutral-800">{t.label}</p>
              <p className="text-xs text-neutral-500 mt-1">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-700 text-neutral-800">
          AI Confidence Threshold <span className="text-xs font-400 text-neutral-400">/ AI आत्मविश्वास सीमा</span>
        </label>
        <p className="text-xs text-neutral-500">
          If AI confidence drops below this level, it will alert you instead of replying automatically.
        </p>
        <div className="flex items-center gap-4">
          <input type="range" min={30} max={90} step={5} value={threshold}
            onChange={e => setThreshold(Number(e.target.value))}
            className="flex-1 accent-brand-500" />
          <div className={clsx('w-14 text-center font-800 text-lg rounded-xl px-2 py-1',
            threshold <= 50 ? 'bg-danger-100 text-danger-600' : threshold <= 70 ? 'bg-warning-100 text-warning-600' : 'bg-success-100 text-success-600'
          )}>
            {threshold}%
          </div>
        </div>
        <p className="text-xs text-neutral-400">
          {threshold <= 40 ? '⚠️ Very low — AI will answer most things, may sometimes guess' :
           threshold <= 60 ? '✓ Balanced — AI handles common queries, alerts you for tricky ones' :
           '🔒 Conservative — AI will alert you more often, more manual work'}
        </p>
      </div>

      <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
        {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save AI Settings</>}
      </Button>
    </div>
  )
}

function HoursSection() {
  const [hours, setHours] = useState(mockBusinessHours)
  const toggle = (i) => setHours(h => h.map((d, idx) => idx === i ? { ...d, is_closed: !d.is_closed } : d))
  const update = (i, key, val) => setHours(h => h.map((d, idx) => idx === i ? { ...d, [key]: val } : d))

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-500">AI uses your working hours to answer questions like "Are you open now?"</p>
      <div className="space-y-2">
        {hours.map((h, i) => (
          <div key={h.day} className={clsx('flex items-center gap-3 px-4 py-3 rounded-xl border transition-base',
            h.is_closed ? 'bg-neutral-50 border-neutral-100' : 'bg-white border-neutral-200'
          )}>
            <button onClick={() => toggle(i)} className={clsx('w-10 h-5 rounded-full transition-all flex-shrink-0 relative',
              h.is_closed ? 'bg-neutral-200' : 'bg-brand-500'
            )}>
              <span className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
                h.is_closed ? 'left-0.5' : 'left-5'
              )} />
            </button>
            <span className={clsx('w-24 text-sm font-600', h.is_closed ? 'text-neutral-400' : 'text-neutral-700')}>
              {h.day}
            </span>
            {h.is_closed ? (
              <span className="text-sm text-neutral-400 italic">Closed / बंद</span>
            ) : (
              <div className="flex items-center gap-2">
                <input type="time" value={h.opens_at} onChange={e => update(i, 'opens_at', e.target.value)}
                  className="text-sm border border-neutral-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-400" />
                <span className="text-neutral-400">to</span>
                <input type="time" value={h.closes_at} onChange={e => update(i, 'closes_at', e.target.value)}
                  className="text-sm border border-neutral-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-400" />
              </div>
            )}
          </div>
        ))}
      </div>
      <Button><Save className="w-4 h-4" /> Save Hours</Button>
    </div>
  )
}

function FAQSection() {
  const [faqs, setFaqs] = useState(mockFaqs)
  const [editing, setEditing] = useState(null)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'other' })
  const [adding, setAdding] = useState(false)

  const remove = (id) => setFaqs(f => f.filter(x => x.id !== id))
  const save = (faq) => { setFaqs(f => f.map(x => x.id === faq.id ? faq : x)); setEditing(null) }
  const add = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs(f => [...f, { ...newFaq, id: `faq-${Date.now()}` }])
      setNewFaq({ question: '', answer: '', category: 'other' })
      setAdding(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {faqs.length} FAQs · AI uses these to answer customer queries automatically
        </p>
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      {adding && (
        <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 space-y-3">
          <h4 className="text-sm font-700 text-brand-800">New FAQ</h4>
          <Input label="Question" placeholder="e.g. Do you have home delivery?" value={newFaq.question}
            onChange={e => setNewFaq(p => ({ ...p, question: e.target.value }))} />
          <div className="space-y-1.5">
            <label className="text-sm font-500 text-neutral-700">Answer</label>
            <textarea rows={3} value={newFaq.answer} onChange={e => setNewFaq(p => ({ ...p, answer: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 resize-none"
              placeholder="Type your answer..." />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={add}>Save FAQ</Button>
            <Button size="sm" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {faqs.map(faq => (
          <div key={faq.id} className="card p-4">
            {editing?.id === faq.id ? (
              <div className="space-y-3">
                <input className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-brand-400"
                  value={editing.question} onChange={e => setEditing(p => ({ ...p, question: e.target.value }))} />
                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-brand-400 resize-none"
                  value={editing.answer} onChange={e => setEditing(p => ({ ...p, answer: e.target.value }))} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => save(editing)}><Check className="w-3.5 h-3.5" /> Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-700 text-neutral-800">Q: {faq.question}</p>
                  <p className="text-sm text-neutral-500 mt-1">A: {faq.answer}</p>
                  <span className="badge badge-neutral mt-2 text-xs">{faq.category}</span>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => setEditing(faq)} className="p-1.5 text-neutral-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-base">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(faq.id)} className="p-1.5 text-neutral-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-base">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    email_on_attention: true,
    email_on_order: false,
    daily_summary: true,
  })
  const toggle = (k) => setSettings(p => ({ ...p, [k]: !p[k] }))

  const items = [
    { key: 'email_on_attention', label: 'Email when AI needs help', desc: 'Get notified when a conversation needs your attention' },
    { key: 'email_on_order', label: 'Email on new order', desc: 'Get an email every time AI logs a new order' },
    { key: 'daily_summary', label: 'Daily summary email', desc: 'Receive a daily digest of conversations, orders, and metrics' },
  ]

  return (
    <div className="space-y-3">
      {items.map(({ key, label, desc }) => (
        <div key={key} className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl">
          <div>
            <p className="text-sm font-600 text-neutral-800">{label}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{desc}</p>
          </div>
          <button onClick={() => toggle(key)} className={clsx('w-11 h-6 rounded-full transition-all flex-shrink-0 relative ml-4',
            settings[key] ? 'bg-brand-500' : 'bg-neutral-200'
          )}>
            <span className={clsx('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all',
              settings[key] ? 'left-6' : 'left-1'
            )} />
          </button>
        </div>
      ))}
    </div>
  )
}

function AccountSection() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h4 className="text-sm font-700 text-neutral-800 mb-3">Change Password</h4>
        <div className="space-y-3">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Button size="sm">Update Password</Button>
        </div>
      </div>

      <div className="card p-5 border-danger-200 bg-danger-50/30">
        <h4 className="text-sm font-700 text-danger-700 mb-2">Danger Zone</h4>
        <p className="text-xs text-neutral-500 mb-3">These actions are permanent and cannot be undone.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" className="border-danger-200 text-danger-600 hover:bg-danger-50">
            Delete All Conversations
          </Button>
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}

const SECTION_CONTENT = {
  profile: <ProfileSection />,
  ai: <AIBehaviorSection />,
  hours: <HoursSection />,
  faq: <FAQSection />,
  notifications: <NotificationsSection />,
  account: <AccountSection />,
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const active = SETTINGS_SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="p-4 lg:p-6 page-enter">
      <PageHeader title="Settings" titleHi="सेटिंग्स" description="Manage your business and AI preferences" />

      <div className="flex gap-6">
        {/* Sidebar Nav */}
        <div className="w-56 flex-shrink-0 hidden md:block">
          <div className="space-y-0.5">
            {SETTINGS_SECTIONS.map(({ id, label, labelHi, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 transition-base text-left',
                  activeSection === id ? 'bg-brand-50 text-brand-700' : 'text-neutral-600 hover:bg-neutral-100'
                )}
              >
                <Icon className={clsx('w-4 h-4', activeSection === id ? 'text-brand-500' : 'text-neutral-400')} />
                <span className="flex-1">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile section picker */}
        <div className="md:hidden w-full mb-4">
          <select
            value={activeSection}
            onChange={e => setActiveSection(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-neutral-200 rounded-xl bg-white focus:outline-none"
          >
            {SETTINGS_SECTIONS.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 card p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-100">
            {active && <active.icon className="w-5 h-5 text-brand-600" />}
            <h2 className="font-display font-800 text-neutral-900">{active?.label}</h2>
            <span className="text-sm text-neutral-400">/ {active?.labelHi}</span>
          </div>
          {SECTION_CONTENT[activeSection]}
        </div>
      </div>
    </div>
  )
}
