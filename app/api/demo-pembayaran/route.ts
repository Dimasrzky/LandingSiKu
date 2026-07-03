import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const IPAYMU_ENDPOINT = 'https://my.ipaymu.com/api/v2/payment'

function buildTimestamp(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return `${get('year')}${get('month')}${get('day')}${get('hour')}${get('minute')}${get('second')}`
}

function buildSignature(method: string, va: string, apiKey: string, jsonBody: string): string {
  const bodyHash = crypto.createHash('sha256').update(jsonBody).digest('hex').toLowerCase()
  const stringToSign = `${method.toUpperCase()}:${va}:${bodyHash}:${apiKey}`
  return crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const va = process.env.IPAYMU_VA
    const apiKey = process.env.IPAYMU_API_KEY
    if (!va || !apiKey) {
      return NextResponse.json({ data: null, error: 'Kredensial iPaymu belum dikonfigurasi' }, { status: 500 })
    }

    const origin = request.nextUrl.origin
    const body = {
      product: ['Demo Tagihan SPP - SiKu'],
      qty: ['1'],
      price: ['10000'],
      returnUrl: `${origin}/demo-pembayaran?status=success`,
      cancelUrl: `${origin}/demo-pembayaran?status=cancel`,
      notifyUrl: `${origin}/api/demo-pembayaran/notify`,
      referenceId: `DEMO-${Date.now()}`,
    }

    const jsonBody = JSON.stringify(body)
    const timestamp = buildTimestamp()
    const signature = buildSignature('POST', va, apiKey, jsonBody)

    const ipaymuRes = await fetch(IPAYMU_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'va': va,
        'signature': signature,
        'timestamp': timestamp,
      },
      body: jsonBody,
    })

    const result = await ipaymuRes.json()

    if (result.Status === 200 && result.Data?.Url) {
      return NextResponse.json({ data: { url: result.Data.Url }, error: null }, { status: 200 })
    }

    console.error('iPaymu error:', result)
    return NextResponse.json(
      { data: null, error: result.Message || 'Gagal membuat transaksi iPaymu' },
      { status: 400 }
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Demo pembayaran error:', error)
    return NextResponse.json({ data: null, error: msg }, { status: 500 })
  }
}
