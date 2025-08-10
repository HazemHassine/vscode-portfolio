import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Name must be at least 2 characters." }), { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), { status: 400 });
    }
    if (!message || message.length < 10) {
      return new Response(JSON.stringify({ error: "Message must be at least 10 characters." }), { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "hazemhassine.edu@gmail.com",
      subject: `New Contact from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email." }), { status: 500 });
  }
}
