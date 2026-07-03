import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ data: null, error: null }, { status: 200 })
}
