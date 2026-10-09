"use client";
import { useState } from 'react';

export default function Page(){
  const [planType, setPlanType] = useState<'pro'|'starter'>('pro');
  const [form, setForm] = useState({artist:'', song:'', phone:'', plan:''});
  const [done, setDone] = useState(false);

  const PRO = [
    {id:'pro-single', name:'Single', desc:'1-2 Songs', price:100, link:'https://paystack.com/pay/de1st-pro-single'},
    {id:'pro-mixtape', name:'Mixtape / EP', desc:'3-6 Songs', price:250, pop:true, link:'https://paystack.com/pay/de1st-pro-mixtape'},
    {id:'pro-album', name:'Album', desc:'7+ Songs', price:300, link:'https://paystack.com/pay/de1st-pro-album'},
  ];
  const STARTER = [
    {id:'starter-single', name:'Single', desc:'1-2 Songs', price:70, was:100},
    {id:'starter-mixtape', name:'Mixtape / EP', desc:'3-6 Songs', price:175, was:250},
    {id:'starter-album', name:'Album', desc:'7+ Songs', price:210, was:300},
  ];

  const handleUpload = async (e:any) => {
    e.preventDefault();
    // SECURE: save with ownerId check later
    const res = await fetch('/api/upload', {method:'POST', body: JSON.stringify(form), headers:{'Content-Type':'application/json'}});
    if(res.ok){ setDone(true); setForm({artist:'',song:'',phone:'',plan:''}); }
  };

  const list = planType==='pro'? PRO : STARTER;

  return (
    <main style={{color:'#fff'}}>
      <div style={{maxWidth:1300, margin:'0 auto', padding:'20px 16px'}}>
        <div style={{fontWeight:900, letterSpacing:2, color:'#00e5ff'}}>DE 1ST DISTRO 🇿🇦</div>
      </div>

      {/* HERO */}
      <section style={{margin:'0 16px', borderRadius:32, overflow:'hidden', backgroundImage:'url(/hero.jpg)', backgroundSize:'cover', backgroundPosition:'center', border:'1px solid #123'}}>
        <div style={{background:'linear-gradient(to bottom, rgba(0,0,0,0.2), #020a14)', padding:'80px 20px', textAlign:'center'}}>
          <h1 style={{fontSize:'clamp(40px,9vw,90px)', fontWeight:900, lineHeight:0.9}}>UPLOAD<br/>UNLIMITED<br/><span style={{color:'#00e5ff'}}>MUSIC</span></h1>
          <p style={{opacity:0.8, marginTop:20}}>Spotify, Apple, TikTok +150 stores • 0% Commission Available</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{maxWidth:1100, margin:'60px auto', padding:'0 16px'}}>
        <div style={{display:'flex', justifyContent:'center', gap:8, background:'#0a1930', width:'fit-content', margin:'0 auto', padding:6, borderRadius:999, border:'1px solid #1a2a4a'}}>
          <button onClick={()=>setPlanType('pro')} style={{padding:'10px 24px', borderRadius:999, background:planType==='pro'?'#00e5ff':'transparent', color:planType==='pro'?'#000':'#fff', fontWeight:800, border:'none'}}>PRO 0% COMM</button>
          <button onClick={()=>setPlanType('starter')} style={{padding:'10px 24px', borderRadius:999, background:planType==='starter'?'#fff':'transparent', color:planType==='starter'?'#000':'#fff', fontWeight:800, border:'none'}}>STARTER -30% +10%</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginTop:32}}>
          {list.map((p:any)=>(
            <div key={p.id} style={{background:'#0e1e36', border:p.pop?'2px solid #00e5ff':'1px solid #1e335c', borderRadius:24, padding:28}}>
              {p.pop && <div style={{background:'#00e5ff', color:'#000', fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:999, display:'inline-block', marginBottom:12}}>MOST POPULAR</div>}
              <h3 style={{fontSize:24, fontWeight:900, margin:0}}>{p.name}</h3>
              <div style={{fontSize:12, opacity:0.6}}>{p.desc}</div>
              <div style={{display:'flex', gap:10, alignItems:'baseline', margin:'20px 0'}}>
                <div style={{fontSize:44, fontWeight:900}}>R{p.price}</div>
                {p.was && <><span style={{textDecoration:'line-through', opacity:0.5}}>R{p.was}</span><span style={{background:'#6d28d9', padding:'2px 8px', borderRadius:999, fontSize:10}}>-30%</span></>}
              </div>
              <div style={{fontSize:12, opacity:0.7, marginBottom:20}}>
                {planType==='pro' ? '✓ 0% Commission • Keep 100% • ℗ DE 1ST DISTRO' : '✓ 10% Commission • Cheaper upfront • Same stores'}
              </div>
              <a href={p.link || '#upload'} onClick={()=>setForm({...form, plan:`${p.name} - R${p.price} (${planType})`})} style={{display:'block', textAlign:'center', background:'#00e5ff', color:'#000', padding:'14px', borderRadius:12, fontWeight:900, textDecoration:'none'}}>CHOOSE {p.name.toUpperCase()}</a>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD FORM - PRIVATE, NO WHATSAPP */}
      <section id="upload" style={{maxWidth:600, margin:'0 auto', padding:'0 16px 60px'}}>
        <div style={{background:'#0a1930', border:'1px solid #1a2a4a', borderRadius:24, padding:28}}>
          <h2 style={{fontWeight:900}}>Upload Music (Private - Admin Only)</h2>
          <p style={{fontSize:12, opacity:0.6}}>This does NOT go to WhatsApp. Only you see it in /admin</p>
          <form onSubmit={handleUpload} style={{display:'grid', gap:12, marginTop:20}}>
            <input required placeholder="Artist Name" value={form.artist} onChange={e=>setForm({...form, artist:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #333', background:'#020a14', color:'#fff'}}/>
            <input required placeholder="Song / Mixtape Title" value={form.song} onChange={e=>setForm({...form, song:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #333', background:'#020a14', color:'#fff'}}/>
            <input required placeholder="WhatsApp Number" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #333', background:'#020a14', color:'#fff'}}/>
            <input placeholder="Selected Plan" value={form.plan} onChange={e=>setForm({...form, plan:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #333', background:'#020a14', color:'#fff'}}/>
            <button type="submit" style={{background:'#00e5ff', color:'#000', fontWeight:900, padding:14, borderRadius:12, border:'none'}}>SUBMIT UPLOAD (Private)</button>
            {done && <div style={{background:'#10b981', padding:12, borderRadius:10, textAlign:'center'}}>✅ Upload saved to Admin Dashboard. No WhatsApp sent.</div>}
          </form>
        </div>
      </section>

      {/* ARCHITECTURE POSTER */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'0 16px 80px'}}>
        <img src="/architecture.jpg" alt="De1st Architecture" style={{width:'100%', borderRadius:24, border:'1px solid #1a2a4a'}}/>
      </section>
    </main>
  )
      }
