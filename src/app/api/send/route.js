import { NextResponse } from "next/server";
import { Resend } from "resend";
import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

// 初始化 Resend 实例
const resend = new Resend(process.env.RESEND_API_KEY);

// 获取环境变量中的邮箱地址
const fromEmail = process.env.FROM_EMAIL;
const MY_EMAIL = process.env.MY_EMAIL;

// 处理 POST 请求
export async function POST(req, res) {
  const { email, subject, message } = await req.json(); // 获取请求中的数据

  try {
    // 发送邮件
    const data = await resend.emails.send({
      from: fromEmail, // 发件人邮箱
      to: [MY_EMAIL], // 收件人邮箱：用户邮箱和你自己的邮箱
      subject: subject, // 邮件主题
      react: (
        <>
          <h1>{subject}</h1> {/* 邮件主题 */}
          <hr />
          <p>
            The Portfolio Website email send:
            <strong>From:</strong>
            {/* 发件人邮箱 */}
            {email}
          </p>
          <p>
            <strong>New message submitted below:</strong>
          </p>
          <p>{message}</p> {/* 用户提交的消息 */}
        </>
      ),
    });

    // 如果邮件发送成功，返回成功的数据
    return NextResponse.json(data);
  } catch (error) {
    // 如果发生错误，返回错误信息
    return NextResponse.json({ error: error.message });
  }
}
