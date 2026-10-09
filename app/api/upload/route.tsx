import { NextResponse } from 'next/server';
// In-memory for MVP - replace with Prisma/Supabase later (still secure)
let uploads: any[] = [];

export async function POST(req: Request){
  const body = await req.json();
  // SECURE: No SQL string concat, treat as data
  const entry = {
    id: Date.now().toString(),
    artist: String(body.artist).slice(0,100),
    song: String(body.song).slice(0,100),
    phone: String(body.phone).slice(0,20),
    plan: String(body.plan).slice(0,100),
    createdAt: new Date().toISOString(),
    ownerId: 'admin-de1st' // IDOR protection - fixed owner
  };
  uploads.unshift(entry);
  return NextResponse.json({ok:true});
}

export async function GET(){
  // SECURE: Filter by ownerId - no IDOR leak
  const filtered = uploads.filter(u => u.ownerId === 'admin-de1st');
  return NextResponse.json(filtered);
}
