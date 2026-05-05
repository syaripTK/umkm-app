export const verificationEmailTemplate = (name: string, token: string) => {
  const verifyUrl = `${process.env.CLIENT_URL}/api/auth/verify/${token}`;

  return {
    subject: "✅ Verifikasi Email Akun UMKM Kamu",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 0">
                <table width="560" cellpadding="0" cellspacing="0"
                  style="background:#fff;border-radius:12px;overflow:hidden;
                         box-shadow:0 2px 8px rgba(0,0,0,0.08)">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#16a34a;padding:32px;text-align:center">
                      <h1 style="color:#fff;margin:0;font-size:24px">🛍️ UMKM App</h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 32px">
                      <h2 style="color:#111;margin:0 0 12px">Halo, ${name}! 👋</h2>
                      <p style="color:#555;line-height:1.6;margin:0 0 24px">
                        Terima kasih sudah mendaftar di UMKM App. 
                        Klik tombol di bawah untuk memverifikasi email kamu.
                      </p>

                      <!-- Button -->
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding:8px 0 32px">
                            <a href="${verifyUrl}"
                              style="background:#16a34a;color:#fff;padding:14px 32px;
                                     border-radius:8px;text-decoration:none;font-size:16px;
                                     font-weight:bold;display:inline-block">
                              Verifikasi Email Saya
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="color:#888;font-size:13px;margin:0 0 8px">
                        Atau copy link berikut ke browser kamu:
                      </p>
                      <p style="color:#16a34a;font-size:13px;word-break:break-all;margin:0 0 24px">
                        ${verifyUrl}
                      </p>

                      <hr style="border:none;border-top:1px solid #eee;margin:0 0 24px">

                      <p style="color:#aaa;font-size:12px;margin:0">
                        ⏰ Link ini berlaku selama <strong>24 jam</strong>.<br>
                        Jika kamu tidak merasa mendaftar, abaikan email ini.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f9f9f9;padding:20px 32px;text-align:center">
                      <p style="color:#bbb;font-size:12px;margin:0">
                        © 2026 UMKM App. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
};

export const verificationSuccessHTML = (name: string) => `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Terverifikasi</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      font-family: 'Segoe UI', Arial, sans-serif;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 24px;
      padding: 56px 48px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    }
    .icon-wrap {
      width: 96px;
      height: 96px;
      background: linear-gradient(135deg, #16a34a, #22c55e);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      animation: pop 0.5s ease;
    }
    @keyframes pop {
      0%   { transform: scale(0); opacity: 0; }
      70%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    .checkmark {
      width: 48px;
      height: 48px;
      stroke: white;
      stroke-width: 3;
      fill: none;
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: draw 0.6s ease 0.3s forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
    .badge {
      display: inline-block;
      background: #f0fdf4;
      color: #16a34a;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 100px;
      border: 1px solid #bbf7d0;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 28px;
      color: #111827;
      margin-bottom: 12px;
      font-weight: 700;
    }
    p {
      color: #6b7280;
      font-size: 15px;
      line-height: 1.7;
      margin-bottom: 36px;
    }
    p span {
      color: #16a34a;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #16a34a, #22c55e);
      color: white;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      transition: opacity 0.2s, transform 0.2s;
      box-shadow: 0 4px 20px rgba(22,163,74,0.35);
    }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .divider {
      height: 1px;
      background: #f3f4f6;
      margin: 36px 0;
    }
    .footer {
      font-size: 12px;
      color: #d1d5db;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrap">
      <svg class="checkmark" viewBox="0 0 52 52">
        <polyline points="14,27 22,35 38,17"/>
      </svg>
    </div>

    <div class="badge">✓ Verifikasi Berhasil</div>
    <h1>Email Terkonfirmasi!</h1>
    <p>
      Hei <span>${name}</span>, akun kamu di UMKM App 
      sudah aktif dan siap digunakan. Selamat berbelanja!
    </p>

    <a href="${process.env.CLIENT_URL}/login" class="btn">
      Masuk Sekarang →
    </a>

    <div class="divider"></div>
    <p class="footer">© 2026 UMKM App · Dibuat dengan ❤️ untuk UMKM Indonesia</p>
  </div>
</body>
</html>
`;

export const verificationErrorHTML = (message: string) => `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Gagal</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      font-family: 'Segoe UI', Arial, sans-serif;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 24px;
      padding: 56px 48px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    }
    .icon-wrap {
      width: 96px;
      height: 96px;
      background: linear-gradient(135deg, #dc2626, #ef4444);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      animation: pop 0.5s ease;
    }
    @keyframes pop {
      0%   { transform: scale(0); opacity: 0; }
      70%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    .xmark {
      width: 48px;
      height: 48px;
      stroke: white;
      stroke-width: 3;
      fill: none;
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: draw 0.6s ease 0.3s forwards;
    }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .badge {
      display: inline-block;
      background: #fef2f2;
      color: #dc2626;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 100px;
      border: 1px solid #fecaca;
      margin-bottom: 20px;
    }
    h1 { font-size: 28px; color: #111827; margin-bottom: 12px; font-weight: 700; }
    p { color: #6b7280; font-size: 15px; line-height: 1.7; margin-bottom: 36px; }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #dc2626, #ef4444);
      color: white;
      text-decoration: none;
      padding: 14px 40px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(220,38,38,0.35);
    }
    .divider { height: 1px; background: #f3f4f6; margin: 36px 0; }
    .footer { font-size: 12px; color: #d1d5db; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrap">
      <svg class="xmark" viewBox="0 0 52 52">
        <line x1="16" y1="16" x2="36" y2="36"/>
        <line x1="36" y1="16" x2="16" y2="36"/>
      </svg>
    </div>

    <div class="badge">✗ Verifikasi Gagal</div>
    <h1>Link Tidak Valid</h1>
    <p>${message}. Silakan daftar ulang atau hubungi support kami.</p>

    <a href="${process.env.CLIENT_URL}/register" class="btn">
      Daftar Ulang →
    </a>

    <div class="divider"></div>
    <p class="footer">© 2026 UMKM App · Dibuat dengan ❤️ untuk UMKM Indonesia</p>
  </div>
</body>
</html>
`;
