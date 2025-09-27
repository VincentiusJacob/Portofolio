import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("RESEND_API_KEY di server:", process.env.RESEND_API_KEY);
  try {
    const { name, email, subject, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["icencodes@gmail.com"],
      subject: `Pesan dari Portfolio: ${subject}`,
      html: `
        <h1>Pesan Baru dari Formulir Kontak Portfolio</h1>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email Pengirim:</strong> ${email}</p>
        <hr>
        <h2>Pesan:</h2>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
