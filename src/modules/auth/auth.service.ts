import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import transporter from "../../config/mailer";
import { verificationEmailTemplate } from "../../utils/email.template";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  /**
   * Cari di database apakah terdapat user dengan email yang sama,
   * jika ada, maka lempar error
   */
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email sudah terdaftar");

  // Hash password agar berubah menjadi random string
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  // Buat token verifikasi
  const token = Math.random().toString(36).substring(2);
  await prisma.emailVerification.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
    },
  });

  // kirim email verifikasi dengan token ini
  const { subject, html } = verificationEmailTemplate(name, token);
  await transporter.sendMail({
    from: `"UMKM App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });

  return { message: "Registrasi berhasil, cek email untuk verifikasi", token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Email atau password salah");
  if (!user.isVerified) throw new Error("Email belum diverifikasi");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Email atau password salah");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const verifyEmail = async (token: string) => {
  const record = await prisma.emailVerification.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!record) throw new Error("Token tidak valid");
  if (record.expiresAt < new Date()) throw new Error("Token sudah kadaluarsa");

  await prisma.user.update({
    where: { id: record.userId },
    data: { isVerified: true },
  });

  await prisma.emailVerification.delete({ where: { token } });

  return { name: record.user.name };
};

