import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Lazy-construct on each request so `next build` doesn't crash when
// RESEND_API_KEY is unset locally. The constructor throws on missing key.
const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
};

export async function POST(req) {
  const { email, subject, message } = await req.json();

  try {
    const data = await getResend().emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.MY_EMAIL],
      subject,
      react: (
        <>
          <h1>{subject}</h1>
          <hr />
          <p>
            The Portfolio Website email send:
            <strong>From:</strong>
            {email}
          </p>
          <p>
            <strong>New message submitted below:</strong>
          </p>
          <p>{message}</p>
        </>
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
