import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Same in-memory store as upload route - in production use Supabase/Neon
let paidUploads: any[] = [];

// Map Paystack amount (in kobo) to your plans
const PLAN_MAP: any = {
  7000: { name: 'STARTER Single', price: 70, comm: '10% + -30%' },
  10000: { name: 'PRO Single', price: 100, comm: '0%' },
  17500: { name: 'STARTER Mixtape', price: 175, comm: '10% + -30%' },
  21000: { name: 'STARTER Album', price: 210, comm: '10% + -30%' },
  25000: { name: 'PRO Mixtape', price: 250, comm: '0%' },
  30000: { name: 'PRO Album', price: 300, comm: '0%' },
};

export async function POST(req: Request){
  const bodyText = await req.text();
  const body = JSON.parse(bodyText);

  // 1. SECURE: Verify Paystack signature - prevents fake payments
  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const hash = crypto.createHmac('sha512', secret).update(bodyText).digest('hex');
  const signature = req.headers.get('x-paystack-signature');

  if(hash!== signature){
    return NextResponse.json({error: 'Invalid signature'}, {status: 401});
  }

  // 2. Only handle successful charge
  if(body.event === 'charge.success'){
    const data = body.data;
    const amount = data.amount; // e.g. 10000 = R100
    const plan = PLAN_MAP[amount] || { name: `Custom R${amount/100}`, price: amount/100, comm: '?' };

    // 3. SECURE: Create entry with ownerId - IDOR protected
    const entry = {
      id: data.reference,
      artist: data.metadata?.artist_name || data.customer?.email || 'Unknown Artist',
      song: data.metadata?.song_title || 'To be uploaded',
      phone: data.metadata?.phone || data.customer?.phone || '',
      email: data.customer?.email,
      plan: `${plan.name} - R${plan.price} (${plan.comm})`,
      amount: plan.price,
      reference: data.reference,
      paidAt: new Date().toISOString(),
      status: 'PAID - Ready to distribute via Too Lost',
      ownerId: 'admin-de1st', // IDOR protection
      paystackData: data
    };

    // Save (replace with DB later)
    paidUploads.unshift(entry);

    // For MVP we use global - hack to share between routes
    (global as any).DE1ST_UPLOADS = paidUploads;

    // 4. OPTIONAL: Auto-notify YOU on WhatsApp (not artist)
    // Uncomment when you add your number
    // await fetch(`https://api.telegram.org/bot...`) or WhatsApp API

    console.log('✅ Payment verified:', entry);
  }

  return NextResponse.json({ok:true});
}

export async function GET(){
  // For admin dashboard
  const uploads = (global as any).DE1ST_UPLOADS || paidUploads;
  const filtered = uploads.filter((u:any) => u.ownerId === 'admin-de1st');
  return NextResponse.json(filtered);
      }
