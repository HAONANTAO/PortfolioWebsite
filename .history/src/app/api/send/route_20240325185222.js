import { NextResponse } from "next/server";
import { Resend } from "resend";
import dotdenv from "dotenv";
// 读取内容从环境变量
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const fromEmail = process.env.FROM_EMAIL;
export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  // console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting me!</p>
          <p>New message submitted Below:</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
