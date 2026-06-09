import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

async function getSheets() {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS ?? '', 'base64').toString('utf-8')
  )
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function timestamp() {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sheets = await getSheets()
    const ts = timestamp()

    if (body.type === 'utm') {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'UTM!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[ts, body.utmSource, body.utmMedium, body.utmCampaign, body.referrer, body.url]],
        },
      })
    } else if (body.type === 'cta') {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'CTA Clicks!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[ts, body.button, body.destination, body.utmSource]],
        },
      })
    } else {
      return NextResponse.json({ data: null, error: 'type tidak dikenali' }, { status: 400 })
    }

    return NextResponse.json({ data: null, error: null }, { status: 200 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Tracking error:', error)
    return NextResponse.json({ data: null, error: msg }, { status: 500 })
  }
}
