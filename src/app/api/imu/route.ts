// src/app/api/imu/route.ts
import { NextResponse } from 'next/server'
import { createClient }   from '@supabase/supabase-js'

// Initialize Supabase with your VERCEL env-vars
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const sample = await req.json()

  // Insert into your imu_samples table
  const { data, error } = await supabase
    .from('imu_samples')
    .insert([ sample ])

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ status: 'ok', inserted: data }, { status: 200 })
}
