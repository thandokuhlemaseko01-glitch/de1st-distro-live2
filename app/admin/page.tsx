'use client'
import { useState } from 'react'

export default function Admin(){
  const [artists, setArtists] = useState([
    { id: 1, name: 'Test Artist - Osizweni', email: 'test@mail.com', plan: 'UNLIMITED R350', streams: 542100, toolost: 'TL-001', status: 'PAID' },
  ])

  const update = (id: number, field: string, val: any) => {
    setArtists(a => a.map(x => x.id===id ? {...x, [field]: val} : x))
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-black text-cyan-300">ADMIN DASHBOARD - Control TooLost</h1>
      <p className="text-xs opacity-60">Edit streams manually from TooLost dashboard, see which plan artist chose</p>
      
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-xs bg-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-gray-800 text-cyan-300"><tr><th className="p-3 text-left">Artist / Email</th><th>Plan Chosen</th><th>Streams (Edit from TooLost)</th><th>TooLost ID</th><th>Paystack Status</th><th>Action</th></tr></thead>
          <tbody>
            {artists.map(a=>(
              <tr key={a.id} className="border-t border-gray-800">
                <td className="p-3"><input value={a.name} onChange={e=>update(a.id,'name',e.target.value)} className="bg-transparent border-b border-gray-700 w-full" /><br/><span className="opacity-50">{a.email}</span></td>
                <td className="p-3"><select value={a.plan} onChange={e=>update(a.id,'plan',e.target.value)} className="bg-black border border-cyan-800 rounded px-2 py-1"><option>SINGLE R100</option><option>EP R200</option><option>ALBUM R250</option><option>UNLIMITED R350</option></select></td>
                <td className="p-3"><input type="number" value={a.streams} onChange={e=>update(a.id,'streams',parseInt(e.target.value)||0)} className="bg-black border border-yellow-400 w-28 p-2 rounded text-yellow-300 font-bold" /></td>
                <td className="p-3"><input value={a.toolost} onChange={e=>update(a.id,'toolost',e.target.value)} className="bg-black border border-gray-700 w-20 p-1 rounded" /></td>
                <td className="p-3"><span className={`px-2 py-1 rounded text-[10px] font-bold ${a.status==='PAID'?'bg-green-400 text-black':'bg-yellow-300 text-black'}`}>{a.status}</span></td>
                <td className="p-3"><button onClick={()=>alert('Saved to TooLost! Artist: '+a.name+' New streams: '+a.streams)} className="bg-cyan-400 text-black px-3 py-1 rounded-full font-bold">Save</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-gray-900 rounded-xl">
        <h3 className="font-bold text-yellow-300">How to connect real TooLost:</h3>
        <p className="text-xs opacity-70 mt-2">1. Get TooLost API key from toolost.com → Settings → API<br/>2. Add to Vercel Env: TOOLOST_API_KEY=your_key<br/>3. Replace fake data with fetch('/api/toolost/artists')</p>
      </div>
    </div>
  )
}
