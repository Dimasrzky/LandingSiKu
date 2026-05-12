import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

async function appendToSheets(data: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
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
    range: 'Sheet1!A:M',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        timestamp,
        data.nama,
        data.email,
        data.jabatan,
        data.sekolah,
        data.jenjang,
        data.jumlah        || '-',
        data.provinsi,
        data.kota,
        data.jadwalTanggal || '-',
        data.jadwalWaktu   || '-',
        data.sumber        || '-',
        data.tantangan     || '-',
      ]],
    },
  })
}

function buildEmailHtml(data: Record<string, string>): string {
  const field = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-size:13px;color:#6B7280;width:40%;border-bottom:1px solid #F3F4F6;">${label}</td>
          <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #F3F4F6;">${value}</td>
        </tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1A3557;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">SiKu</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Sistem Keuangan Sekolah</div>
            <div style="margin-top:20px;display:inline-block;background:#059669;color:#fff;font-size:13px;font-weight:600;padding:6px 18px;border-radius:20px;">
              🔔 Pendaftar Baru
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
              Ada sekolah baru yang tertarik dengan SiKu dan mengisi formulir demo.
              Segera hubungi dalam <strong>1×24 jam</strong>.
            </p>

            <!-- Data Kontak -->
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Data Kontak</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:24px;">
              ${field('Nama Lengkap', data.nama)}
              ${field('Email', data.email)}
              ${field('Jabatan', data.jabatan)}
            </table>

            <!-- Data Sekolah -->
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Data Sekolah</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:24px;">
              ${field('Nama Sekolah / Yayasan', data.sekolah)}
              ${field('Jenjang', data.jenjang)}
              ${field('Jumlah Siswa', data.jumlah)}
              ${field('Provinsi', data.provinsi)}
              ${field('Kota / Kabupaten', data.kota)}
            </table>

            <!-- Preferensi Demo -->
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Preferensi Demo</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:24px;">
              ${field('Tanggal', data.jadwalTanggal)}
              ${field('Waktu', data.jadwalWaktu)}
              ${field('Sumber Informasi', data.sumber)}
            </table>

            ${data.tantangan ? `
            <!-- Tantangan -->
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Tantangan yang Ingin Diselesaikan</div>
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:16px;font-size:13px;color:#374151;line-height:1.7;margin-bottom:24px;">
              ${data.tantangan}
            </div>` : ''}

            <!-- CTA -->
            <div style="text-align:center;margin-top:8px;">
              <a href="mailto:${data.email}?subject=Selamat datang di SiKu — Demo Gratis untuk ${encodeURIComponent(data.sekolah)}"
                style="display:inline-block;background:#059669;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">
                Balas Email ke ${data.nama}
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              Email ini dikirim otomatis dari form pendaftaran SiKu &bull; <a href="https://siku.id" style="color:#059669;text-decoration:none;">siku.id</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await Promise.all([
      transporter.sendMail({
        from: `"SiKu Form" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO || 'info@siku.id',
        subject: `[Lead Baru] ${data.nama} — ${data.sekolah}`,
        html: buildEmailHtml(data),
        replyTo: data.email,
      }),
      appendToSheets(data),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ success: false, message: 'Gagal mengirim pendaftaran' }, { status: 500 })
  }
}
