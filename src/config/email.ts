import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Gagal mengirim email: ${error.message}`);
  }

  return data;
};
