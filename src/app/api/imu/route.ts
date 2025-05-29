// src/app/api/imu/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialise Supabase — make sure these env vars exist in Vercel:
//   NEXT_PUBLIC_SUPABASE_URL = https://rjnrihmyqqwrxtbvcrck.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY = <your-service-role-key>
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // optional: validate shape here
    const { ax, ay, az, gx, gy, gz, mx, my, mz, counter } = body

    const { data, error } = await supabase
      .from('imu_samples')
      .insert({
        ax, ay, az,
        gx, gy, gz,
        mx, my, mz,
        counter
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data![0].id }, { status: 201 })
  } catch (e: any) {
    console.error('Unexpected error:', e)
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
