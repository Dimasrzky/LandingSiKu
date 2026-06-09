import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

interface NominatimResponse {
  address?: {
    city?: string
    town?: string
    village?: string
    county?: string
    state?: string
    country?: string
  }
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`,
      { headers: { 'User-Agent': 'SiKu-LandingPage/1.0' } }
    )
    const data: NominatimResponse = await res.json()
    const { city, town, village, county, state, country } = data.address ?? {}
    const wilayah = city ?? town ?? village ?? county ?? '-'
    return `${wilayah}, ${state ?? '-'}, ${country ?? '-'}`
  } catch {
    return '-'
  }
}

async function appendLokasiToSheets(
  lat: number,
  lng: number,
  lokasi: string,
  userAgent: string
) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS ?? '', 'base64').toString('utf-8')
  )
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const timestamp = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: 'Lokasi!A:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamp, lokasi, lat, lng, userAgent]],
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { lat, lng } = await request.json()

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ data: null, error: 'lat dan lng harus berupa angka' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') ?? '-'
    const lokasi = await reverseGeocode(lat, lng)

    await appendLokasiToSheets(lat, lng, lokasi, userAgent)

    return NextResponse.json({ data: { lat, lng, lokasi }, error: null }, { status: 200 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Lokasi error:', error)
    return NextResponse.json({ data: null, error: msg }, { status: 500 })
  }
}
