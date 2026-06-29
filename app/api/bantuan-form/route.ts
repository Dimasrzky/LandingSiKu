import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function buildEmailHtml(data: { nama: string; email: string; pertanyaan: string }): string {
  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:#1A3557;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">SiKu</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;text-transform:uppercase;letter-spacing:1px;">Sistem Keuangan Sekolah</div>
            <div style="margin-top:20px;display:inline-block;background:#2A5499;color:#fff;font-size:13px;font-weight:600;padding:6px 18px;border-radius:20px;">
              💬 Pertanyaan Baru dari Halaman FAQ
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
              Ada pertanyaan baru yang dikirimkan melalui halaman FAQ SiKu. Segera tindak lanjuti.
            </p>

            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Data Pengirim</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;margin-bottom:24px;">
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6B7280;width:35%;border-bottom:1px solid #F3F4F6;">Nama</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #F3F4F6;">${data.nama}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-size:13px;color:#6B7280;width:35%;">Email</td>
                <td style="padding:10px 16px;font-size:13px;color:#111827;font-weight:600;">${data.email}</td>
              </tr>
            </table>

            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;margin-bottom:8px;">Pertanyaan</div>
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:16px;font-size:14px;color:#374151;line-height:1.75;margin-bottom:28px;">
              ${data.pertanyaan}
            </div>

            <div style="text-align:center;">
              <a href="mailto:${data.email}?subject=Re: Pertanyaan Anda tentang SiKu"
                style="display:inline-block;background:#059669;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">
                Balas Email ke ${data.nama}
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#F9FAFB;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              Email ini dikirim otomatis dari halaman FAQ SiKu &bull;
              <a href="https://pakaisiku.id" style="color:#059669;text-decoration:none;">pakaisiku.id</a>
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
    const data = await request.json() as { nama?: string; email?: string; pertanyaan?: string }

    if (!data.nama?.trim() || !data.email?.trim() || !data.pertanyaan?.trim()) {
      return NextResponse.json({ success: false, message: 'Semua field wajib diisi.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"SiKu FAQ" <${process.env.SMTP_USER}>`,
      to: 'equanusa@gmail.com',
      subject: `[Pertanyaan FAQ] ${data.nama}`,
      html: buildEmailHtml({
        nama: data.nama.trim(),
        email: data.email.trim(),
        pertanyaan: data.pertanyaan.trim(),
      }),
      replyTo: data.email.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Bantuan form error:', error)
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
