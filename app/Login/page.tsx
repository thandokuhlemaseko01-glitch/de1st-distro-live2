"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage(){
  const { data: session } = useSession()
  
  if(session){
    return (
      <div style={{padding:40, background:'black', color:'white', minHeight:'100vh', textAlign:'center'}}>
        <h1>Welcome {session.user?.name}</h1>
        <p>{session.user?.email}</p>
        <button onClick={()=>signOut()} style={{marginTop:20, padding:'12px 24px', background:'white', color:'black', borderRadius:8}}>Logout</button>
        <br/><br/>
        <a href="/" style={{color:'yellow'}}>Go to Home</a>
      </div>
    )
  }

  return (
    <div style={{padding:40, background:'black', color:'white', minHeight:'100vh', textAlign:'center'}}>
      <h1 style={{fontSize:32, fontWeight:'bold'}}>DE 1ST DISTRO - LOGIN</h1>
      <p style={{marginTop:10, opacity:0.7}}>Login to upload to Spotify, Apple, TikTok +150 stores</p>
      
      <div style={{maxWidth:320, margin:'30px auto', display:'flex', flexDirection:'column', gap:12}}>
        <button onClick={()=>signIn('google')} style={{padding:'14px', background:'white', color:'black', borderRadius:8, fontWeight:'bold'}}>
          Continue with Google
        </button>
        <button onClick={()=>signIn('facebook')} style={{padding:'14px', background:'#1877F2', color:'white', borderRadius:8, fontWeight:'bold'}}>
          Continue with Facebook
        </button>
        <button onClick={()=>signIn('twitter')} style={{padding:'14px', background:'black', border:'1px solid white', color:'white', borderRadius:8, fontWeight:'bold'}}>
          Continue with X
        </button>
      </div>
    </div>
  )
}
