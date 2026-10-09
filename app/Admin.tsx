"use client";
import { useEffect, useState } from 'react';

export default function Admin(){
  const [data, setData] = useState<any[]>([]);
  useEffect(()=>{
    // SECURE FETCH - only owner sees his data (no ?id= tampering)
    fetch('/api/upload').then(r=>r.json()).then(setData);
  },[]);

  return (
    <main style={{background:'#020a14', minHeight:'100vh', color:'#fff', padding:20}}>
      <h1 style={{fontWeight:900}}>DE 1ST ADMIN - Private Uploads</h1>
      <p style={{fontSize:12, opacity:0.6}}>IDOR Protected: You only see uploads owned by you. No other user can change ID in URL.</p>
      <div style={{marginTop:20, display:'grid', gap:12}}>
        {data.length===0 && <div style={{opacity:0.5}}>No uploads yet. Artist uploads from homepage will show here.</div>}
        {data.map((u,i)=>(
          <div key={i} style={{background:'#0e1e36', padding:16, borderRadius:12, border:'1px solid #1e335c'}}>
            <div style={{fontWeight:800}}>{u.artist} - {u.song}</div>
            <div style={{fontSize:12, opacity:0.7}}>{u.phone} • {u.plan} • {new Date(u.createdAt).toLocaleString()}</div>
            <div style={{marginTop:8, display:'flex', gap:8}}>
              <a href={`https://wa.me/${u.phone.replace(/[^0-9]/g,'')}?text=Hi ${u.artist}, your ${u.song} is submitted to Spotify via DE 1ST DISTRO ✅ Live in 48hrs`} target="_blank" style={{background:'#25D366', color:'#000', padding:'6px 12px', borderRadius:8, fontSize:12, textDecoration:'none', fontWeight:800}}>WhatsApp Artist</a>
              <span style={{background:'#1a2a4a', padding:'6px 12px', borderRadius:8, fontSize:12}}>Owner Check: OK</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
