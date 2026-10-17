'use client'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')

  const plans = [
    { id: 'single', name: 'SINGLE', price: 100, sub: '/single 0% commission', pop: false },
    { id: 'ep', name: 'EP', price: 200, sub: '/EP 0% commission', pop: false },
    { id: 'album', name: 'ALBUM', price: 250, sub: '/album 0% commission', pop: false },
    { id: 'unlimited', name: 'UNLIMITED', price: 350, sub: '/year 0% commission unlimited uploads', pop: true },
  ]

  const pay = (plan: any) => {
    // @ts-ignore
    if(typeof PaystackPop === 'undefined'){ alert('Add Paystack keys in .env'); return }
    // @ts-ignore
    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email || 'artist@de1stdistro.co.za',
      amount: plan.price * 100,
      currency: 'ZAR',
      ref: 'DE1ST-'+Date.now(),
      metadata: { custom_fields: [{ display_name: "Plan", variable_name: "plan", value: plan.id }] },
      callback: (res: any) => {
        fetch('/api/paystack-verify', { method: 'POST', body: JSON.stringify({ ref: res.reference, plan: plan.id, email }) })
        alert('Payment successful! Plan: '+plan.name+' - You will be redirected')
        window.location.href = '/dashboard'
      },
      onClose: () => alert('Payment cancelled')
    })
    handler.openIframe()
  }

  return (
    <div className="min-h-screen bg-[#040a0f] text-white">
      {/* HERO WITH YOUR IMAGE */}
      <div className="relative w-full h-[85vh] bg-black overflow-hidden">
        <img src="/posters/hero.jpg" alt="De 1st Distro" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040a0f] via-black/20 to-transparent" />
        <div className="absolute top-0 w-full flex justify-between p-4 md:p-6">
          <h1 className="font-black text-cyan-300 text-xl">DE 1ST DISTRO 🇿🇦</h1>
          <a href="/admin" className="text-xs border border-cyan-400 px-4 py-2 rounded-full">ADMIN</a>
        </div>
        <div className="absolute bottom-0 w-full p-6 text-center">
          <div className="inline-flex gap-2 text-[10px] bg-black/60 px-3 py-1 rounded-full border border-cyan-500/30">UPLOAD UNLIMITED MUSIC TO EVERY MAJOR PLATFORM • ANY SONG • ANY GENRE</div>
        </div>
      </div>

      {/* PLANS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-black text-cyan-300">MAIN PLANS</h2>
        <p className="text-center text-sm opacity-60 mt-2">Choose the plan that fits your release. All plans 0% commission.</p>
        
        <div className="bg-[#ffcc00] text-black text-center font-black py-2 rounded-full mt-6 text-sm">
          ALL PLANS 30% OFF + 10% COMMISSION SPECIAL
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {plans.map(p => (
            <div key={p.id} className={`p-5 rounded-2xl border ${p.pop ? 'bg-cyan-950/30 border-yellow-300' : 'bg-gray-900/40 border-cyan-900/50'}`}>
              {p.pop && <span className="bg-yellow-300 text-black text-[10px] px-2 py-1 rounded-full font-bold">POPULAR</span>}
              <h3 className="font-bold text-cyan-300 mt-2">{p.name}</h3>
              <p className="text-3xl font-black">R{p.price}<span className="text-xs font-normal opacity-70">{p.sub}</span></p>
              <input placeholder="Your email for receipt" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-4 bg-black border border-gray-700 rounded-full px-4 py-2 text-xs" />
              <button onClick={()=>pay(p)} className={`w-full mt-3 py-3 rounded-full font-bold text-sm ${p.pop ? 'bg-yellow-300 text-black' : 'border border-cyan-400 text-cyan-300'}`}>🔒 Pay with Paystack</button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10 opacity-70 text-xs">
          <span>Spotify</span><span>Apple Music</span><span>TikTok</span><span>YouTube</span><span>Deezer</span><span>Tidal</span><span>+100s more</span>
        </div>
      </div>
      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  )
}
