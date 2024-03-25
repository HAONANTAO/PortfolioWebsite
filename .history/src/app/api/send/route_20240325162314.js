// import { EmailTemplate } from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.From
export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Aaron <taoaaron5@gmail.com>",
      to: ["taoaaron5@gmail.com"],
      subject: "Hello world",
      react: (
        <>
          <p>email body</p>
        </>
      ),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
